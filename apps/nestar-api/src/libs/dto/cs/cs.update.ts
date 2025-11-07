import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { ObjectId } from 'mongoose';
import { CsStatus, CsCategory, InquiryStatus } from '../../enums/cs.enum';

@InputType()
export class CsUpdate {
	@IsNotEmpty()
	@Field(() => String)
	_id: ObjectId;

	@IsOptional()
	@Field(() => CsStatus, { nullable: true })
	csStatus?: CsStatus;

	@IsOptional()
	@Field(() => CsCategory, { nullable: true })
	csCategory?: CsCategory;

	@IsOptional()
	@Length(3, 200)
	@Field(() => String, { nullable: true })
	csTitle?: string;

	@IsOptional()
	@Length(10, 2000)
	@Field(() => String, { nullable: true })
	csContent?: string;

	@IsOptional()
	@Field(() => Boolean, { nullable: true })
	csEvent?: boolean;

	@IsOptional()
	@Field(() => InquiryStatus, { nullable: true })
	inquiryStatus?: InquiryStatus;

	@IsOptional()
	@Length(10, 2000)
	@Field(() => String, { nullable: true })
	csAnswer?: string;
}
