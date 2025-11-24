import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SmartVoteService } from './smart-vote.service';
import {
  AdminDto,
  CandidatesDto,
  VotersDto,
  VotesDto,
  CandidacyDto,
  ElectionDto,
} from './dto/create-smart-vote.dto';

@Controller('smart-vote')
export class SmartVoteController {
  constructor(private readonly smartVoteService: SmartVoteService) {}

  //* insert candidate
  @Post('insert-candidates')
  createCandidate(@Body() smartVoteCandidate: CandidatesDto) {
    return this.smartVoteService.createCandidate(smartVoteCandidate);
  }

  //* Get All Candidates
  @Get('get/candidates')
  async findAllCandidates() {
    try {
      return await this.smartVoteService.findAllCandidates();
    } catch (error) {
      // Return an error response if service fails
      throw new HttpException(
        error.message || 'Failed to retrieve candidates.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //* Get Candidate By Student ID
  @Post('find-candidate/:student_id')
  async findCandidateById(
    @Param('student_id') student_id: string,
    @Body() smartVoteCandidate: CandidatesDto,
  ) {
    return this.smartVoteService.findCandidatesByID(
      student_id,
      smartVoteCandidate,
    );
  }

  //* Update candidate
  @Post('update-candidate')
  async updateCandidate(@Body() updateSmartVoteCandidate: CandidatesDto) {
    return this.smartVoteService.updateCandidate(updateSmartVoteCandidate);
  }

  //* Get Candidates by Election Type
  @Post('get-candidates/:election_type')
  async getCandidates(@Param('election_type') election_type: string) {
    return this.smartVoteService.getCandidates(election_type);
  }

  //* Create Admin
  @Post('create-admin')
  createAdmin(@Body() smartVoteAdmin: AdminDto) {
    return this.smartVoteService.createAdmin(smartVoteAdmin);
  }

  //* Login Admin
  @Post('admin-login')
  loginAdmin(@Body() smartVoteAdmin: AdminDto) {
    return this.smartVoteService.loginAdmin(smartVoteAdmin);
  }

  //* Get All Admin
  @Get('get-admins')
  async getAllAdmin() {
    try {
      return await this.smartVoteService.getAllAdmins();
    } catch (error) {
      // Return an error response if service fails
      throw new HttpException(
        error.message || 'Failed to retrieve admins.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //* Update admin by Admin ID
  @Post('update-admin')
  async updateAdminById(
    // @Param('admin_id') admin_id: string,
    @Body() smartVoteAdmin: AdminDto,
  ) {
    return this.smartVoteService.updateAdminByID(smartVoteAdmin);
  }
  //* Delete admin by Admin ID
  @Post('delete-admin/:admin_id')
  async deleteAdminById(
    @Param('admin_id') admin_id: string,
    // @Body() smartVoteAdmin: AdminDto,
  ) {
    return this.smartVoteService.deleteAdminByID(admin_id);
  }

  @Post('voters')
  createVoter(@Body() smartVoteVoter: VotersDto) {
    return this.smartVoteService.createVoter(smartVoteVoter);
  }

  @Post('votes')
  createVotes(@Body() smartVoteVotes: VotesDto) {
    return this.smartVoteService.createVotes(smartVoteVotes);
  }

  @Post('voters-login')
  async loginVoter(@Body() body: { student_id: string; password: string }) {
    const { student_id, password } = body;

    const loginResult = await this.smartVoteService.voterLogin(
      student_id,
      password,
    );

    console.log(password);
    console.log('Login Result:', loginResult);
    if (loginResult.success) {
      return {
        statusCode: 200,
        success: loginResult.success,
        message: loginResult.message,
        data: loginResult.data,
      };
    } else {
      return {
        statusCode: 401,
        success: loginResult.success,
        message: loginResult.message,
      };
    }
  }

  @Post('update-candidacy')
  async updateCandidacy(
    @Param('id') id: number,
    @Body() smartVoteCandidacy: CandidacyDto,
  ) {
    return this.smartVoteService.updateCandidacy(id, smartVoteCandidacy);
  }

  @Post('update-election')
  async updateElection(
    @Param('id') id: number,
    @Body() smartVoteElection: ElectionDto,
  ) {
    return this.smartVoteService.updateElection(id, smartVoteElection);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.smartVoteService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.smartVoteService.remove(+id);
  // }

  // @Get('get-routes')
  // getApiUrl(): object[] {
  //   return this.smartVoteService.getApiUrl();
  // }
}
