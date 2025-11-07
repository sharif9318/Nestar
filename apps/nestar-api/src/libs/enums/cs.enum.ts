import { registerEnumType } from '@nestjs/graphql';

export enum CsStatus {
	ACTIVE = 'ACTIVE',
	DELETE = 'DELETE',
}
registerEnumType(CsStatus, {
	name: 'CsStatus',
});

export enum CsType {
	NOTICE = 'NOTICE',
	FAQ = 'FAQ',
	INQUIRY = 'INQUIRY',
}
registerEnumType(CsType, {
	name: 'CsType',
});

export enum CsCategory {
	PROPERTY = 'PROPERTY',
	PAYMENT = 'PAYMENT',
	BUYERS = 'BUYERS',
	AGENTS = 'AGENTS',
	MEMBERSHIP = 'MEMBERSHIP',
	COMMUNITY = 'COMMUNITY',
	OTHER = 'OTHER',
}
registerEnumType(CsCategory, {
	name: 'CsCategory',
});

export enum InquiryStatus {
	PENDING = 'PENDING',
	ANSWERED = 'ANSWERED',
	CLOSED = 'CLOSED',
}
registerEnumType(InquiryStatus, {
	name: 'InquiryStatus',
});
