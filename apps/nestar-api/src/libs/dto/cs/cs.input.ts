import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { ObjectId } from 'mongoose';
import { CsType, CsCategory, InquiryStatus } from '../../enums/cs.enum';
import { Direction } from '../../enums/common.enum';

@InputType()
export class CsInput {
	@IsNotEmpty()
	@Field(() => CsType)
	csType: CsType;

	@IsOptional()
	@Field(() => CsCategory, { nullable: true })
	csCategory?: CsCategory;

	@IsNotEmpty()
	@Length(3, 200)
	@Field(() => String)
	csTitle: string;

	@IsNotEmpty()
	@Length(10, 2000)
	@Field(() => String)
	csContent: string;

	@IsOptional()
	@Field(() => Boolean, { nullable: true })
	csEvent?: boolean;

	memberId?: ObjectId;
}

@InputType()
class CSISearch {
	@IsOptional()
	@Field(() => CsType, { nullable: true })
	csType?: CsType;

	@IsOptional()
	@Field(() => CsCategory, { nullable: true })
	csCategory?: CsCategory;

	@IsOptional()
	@Field(() => InquiryStatus, { nullable: true })
	inquiryStatus?: InquiryStatus;

	@IsOptional()
	@Field(() => String, { nullable: true })
	text?: string;
}

@InputType()
export class CsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => CSISearch)
	search: CSISearch;
}

@InputType()
export class AllCsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsOptional()
	@Field(() => CSISearch, { nullable: true })
	search?: CSISearch;
}
