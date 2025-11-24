import { Module } from '@nestjs/common';
import { SmartVoteService } from './smart-vote.service';
import { SmartVoteController } from './smart-vote.controller';
import { DatabaseService } from 'src/db/db.service';
import { PasswordHashService } from './password-hash.service';

@Module({
  controllers: [SmartVoteController],
  providers: [SmartVoteService, DatabaseService, PasswordHashService],
})
export class SmartVoteModule {}
