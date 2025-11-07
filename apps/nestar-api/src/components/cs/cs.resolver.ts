import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CsService } from './cs.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CsInput, CsInquiry, AllCsInquiry } from '../../libs/dto/cs/cs.input';
import { ObjectId } from 'mongoose';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { CsUpdate } from '../../libs/dto/cs/cs.update';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';
import { Cs, CsList } from '../../libs/dto/cs/cs';
import { MemberType } from '../../libs/enums/member.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Resolver()
export class CsResolver {
	constructor(private readonly csService: CsService) {}

	@UseGuards(AuthGuard)
	@Mutation(() => Cs)
	public async createCs(@Args('input') input: CsInput, @AuthMember('_id') memberId: ObjectId): Promise<Cs> {
		console.log('Mutation: createCs');
		return await this.csService.createCs(memberId, input);
	}

	@UseGuards(WithoutGuard)
	@Query(() => Cs)
	public async getCs(@Args('csId') input: string, @AuthMember('_id') memberId: ObjectId): Promise<Cs> {
		console.log('Query: getCs');
		const csId = shapeIntoMongoObjectId(input);
		return await this.csService.getCs(csId);
	}

	@UseGuards(WithoutGuard)
	@Query(() => CsList)
	public async getCsList(@Args('input') input: CsInquiry, @AuthMember('_id') memberId: ObjectId): Promise<CsList> {
		console.log('Query: getCsList');
		return await this.csService.getCsList(memberId, input);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Cs)
	public async updateCs(@Args('input') input: CsUpdate, @AuthMember('_id') memberId: ObjectId): Promise<Cs> {
		console.log('Mutation: updateCs');
		input._id = shapeIntoMongoObjectId(input._id);
		return await this.csService.updateCs(memberId, input);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Cs)
	public async removeCs(@Args('csId') input: string, @AuthMember('_id') memberId: ObjectId): Promise<Cs> {
		console.log('Mutation: removeCs');
		const csId = shapeIntoMongoObjectId(input);
		return await this.csService.removeCs(memberId, csId);
	}

	/** ADMIN **/

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Query(() => CsList)
	public async getAllCs(@Args('input') input: AllCsInquiry): Promise<CsList> {
		console.log('Query: getAllCs');
		return await this.csService.getAllCs(input);
	}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation(() => Cs)
	public async updateCsByAdmin(@Args('input') input: CsUpdate): Promise<Cs> {
		console.log('Mutation: updateCsByAdmin');
		input._id = shapeIntoMongoObjectId(input._id);
		return await this.csService.updateCsByAdmin(input);
	}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation(() => Cs)
	public async removeCsByAdmin(@Args('csId') input: string): Promise<Cs> {
		console.log('Mutation: removeCsByAdmin');
		const csId = shapeIntoMongoObjectId(input);
		return await this.csService.removeCsByAdmin(csId);
	}
}
