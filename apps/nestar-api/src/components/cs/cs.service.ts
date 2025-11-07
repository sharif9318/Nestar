import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Direction, Message } from '../../libs/enums/common.enum';
import { CsStatus, CsType, InquiryStatus } from '../../libs/enums/cs.enum';
import { CsInput, CsInquiry, AllCsInquiry } from '../../libs/dto/cs/cs.input';
import { Cs, CsList } from '../../libs/dto/cs/cs';
import { CsUpdate } from '../../libs/dto/cs/cs.update';
import { lookupMember } from '../../libs/config';
import { T } from '../../libs/types/common';
import { MemberService } from '../member/member.service';

@Injectable()
export class CsService {
	constructor(
		@InjectModel('Cs') private readonly csModel: Model<Cs>,
		private readonly memberService: MemberService,
	) {}

	public async createCs(memberId: ObjectId, input: CsInput): Promise<Cs> {
		input.memberId = memberId;

		// Set inquiry status for INQUIRY type
		if (input.csType === CsType.INQUIRY) {
			const newCs: any = { ...input, inquiryStatus: InquiryStatus.PENDING };
			try {
				const result = await this.csModel.create(newCs);
				return result;
			} catch (err) {
				console.log('Error, CsService.createCs:', err.message);
				throw new BadRequestException(Message.CREATE_FAILED);
			}
		}

		try {
			const result = await this.csModel.create(input);
			return result;
		} catch (err) {
			console.log('Error, CsService.createCs:', err.message);
			throw new BadRequestException(Message.CREATE_FAILED);
		}
	}

	public async getCs(csId: ObjectId): Promise<Cs> {
		const result = await this.csModel
			.findOne({
				_id: csId,
				csStatus: CsStatus.ACTIVE,
			})
			.exec();

		if (!result) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
		return result;
	}

	public async getCsList(memberId: ObjectId, input: CsInquiry): Promise<CsList> {
		const { csType, csCategory, inquiryStatus, text } = input.search;
		const match: T = { csStatus: CsStatus.ACTIVE };
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

		if (csType) match.csType = csType;
		if (csCategory) match.csCategory = csCategory;
		if (inquiryStatus) match.inquiryStatus = inquiryStatus;
		if (text)
			match.$or = [{ csTitle: { $regex: text, $options: 'i' } }, { csContent: { $regex: text, $options: 'i' } }];

		// For inquiries, show only user's own inquiries
		if (csType === CsType.INQUIRY) {
			match.memberId = memberId;
		}

		const result = await this.csModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							lookupMember,
							{ $unwind: '$memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();

		if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

		return result[0];
	}

	public async updateCs(memberId: ObjectId, input: CsUpdate): Promise<Cs> {
		const { _id, ...rest } = input;

		const result = await this.csModel
			.findOneAndUpdate(
				{
					_id: _id,
					memberId: memberId,
					csStatus: CsStatus.ACTIVE,
				},
				rest,
				{ new: true },
			)
			.exec();

		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
		return result;
	}

	public async removeCs(memberId: ObjectId, csId: ObjectId): Promise<Cs> {
		const result = await this.csModel
			.findOneAndUpdate(
				{
					_id: csId,
					memberId: memberId,
					csStatus: CsStatus.ACTIVE,
				},
				{ csStatus: CsStatus.DELETE },
				{ new: true },
			)
			.exec();

		if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
		return result;
	}

	/** ADMIN **/

	public async getAllCs(input: AllCsInquiry): Promise<CsList> {
		const { csType, csCategory, inquiryStatus, text } = input.search || {};
		const match: T = {};
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

		if (csType) match.csType = csType;
		if (csCategory) match.csCategory = csCategory;
		if (inquiryStatus) match.inquiryStatus = inquiryStatus;
		if (text)
			match.$or = [{ csTitle: { $regex: text, $options: 'i' } }, { csContent: { $regex: text, $options: 'i' } }];

		const result = await this.csModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							lookupMember,
							{ $unwind: '$memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();

		if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

		return result[0];
	}

	public async updateCsByAdmin(input: CsUpdate): Promise<Cs> {
		const { _id, ...rest } = input;

		// Set answeredAt when adding an answer
		if (rest.csAnswer) {
			rest['answeredAt'] = new Date();
			if (!rest.inquiryStatus) {
				rest.inquiryStatus = InquiryStatus.ANSWERED;
			}
		}

		const result = await this.csModel.findByIdAndUpdate(_id, rest, { new: true }).exec();

		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
		return result;
	}

	public async removeCsByAdmin(csId: ObjectId): Promise<Cs> {
		const result = await this.csModel.findByIdAndDelete(csId).exec();

		if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
		return result;
	}
}
