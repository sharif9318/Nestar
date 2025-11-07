import { Schema } from 'mongoose';
import { CsStatus, CsType, CsCategory, InquiryStatus } from '../libs/enums/cs.enum';

const CsSchema = new Schema(
	{
		csStatus: {
			type: String,
			enum: CsStatus,
			default: CsStatus.ACTIVE,
		},

		csType: {
			type: String,
			enum: CsType,
			required: true,
		},

		csCategory: {
			type: String,
			enum: CsCategory,
			default: CsCategory.OTHER,
		},

		csTitle: {
			type: String,
			required: true,
		},

		csContent: {
			type: String,
			required: true,
		},

		csEvent: {
			type: Boolean,
			default: false,
		},

		// For Inquiry type
		inquiryStatus: {
			type: String,
			enum: InquiryStatus,
		},

		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		},

		// For inquiry responses
		csAnswer: {
			type: String,
		},

		answeredAt: {
			type: Date,
		},
	},
	{ timestamps: true, collection: 'cs' },
);

CsSchema.index({ csType: 1, csStatus: 1, createdAt: -1 });
CsSchema.index({ memberId: 1, csType: 1 });
CsSchema.index({ csCategory: 1, csType: 1 });

export default CsSchema;
