import { Module } from '@nestjs/common';
import { CsResolver } from './cs.resolver';
import { CsService } from './cs.service';
import { MongooseModule } from '@nestjs/mongoose';
import CsSchema from '../../schemas/Cs.model';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Cs',
				schema: CsSchema,
			},
		]),
		AuthModule,
		MemberModule,
	],
	providers: [CsResolver, CsService],
	exports: [CsService],
})
export class CsModule {}
