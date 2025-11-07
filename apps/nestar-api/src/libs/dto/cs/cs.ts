import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { CsStatus, CsType, CsCategory, InquiryStatus } from '../../enums/cs.enum';
import { Member, TotalCounter } from '../member/member';

@ObjectType()
export class Cs {
	@Field(() => String)
	_id: ObjectId;

	@Field(() => CsStatus)
	csStatus: CsStatus;

	@Field(() => CsType)
	csType: CsType;

	@Field(() => CsCategory, { nullable: true })
	csCategory?: CsCategory;

	@Field(() => String)
	csTitle: string;

	@Field(() => String)
	csContent: string;

	@Field(() => Boolean, { nullable: true })
	csEvent?: boolean;

	@Field(() => InquiryStatus, { nullable: true })
	inquiryStatus?: InquiryStatus;

	@Field(() => String)
	memberId: ObjectId;

	@Field(() => String, { nullable: true })
	csAnswer?: string;

	@Field(() => Date, { nullable: true })
	answeredAt?: Date;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;

	/** from aggregation **/

	@Field(() => Member, { nullable: true })
	memberData?: Member;
}

@ObjectType()
export class CsList {
	@Field(() => [Cs])
	list: Cs[];

	@Field(() => [TotalCounter], { nullable: true })
	metaCounter: TotalCounter[];
}
