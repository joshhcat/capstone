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
  UpdatePasswordDto,
} from './dto/create-smart-vote.dto';
import { MailerService } from './mailer.services';

@Controller('smart-vote')
export class SmartVoteController {
  constructor(
    private readonly smartVoteService: SmartVoteService,
    private readonly mailerService: MailerService,
  ) {}

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

  //* Get Approved Candidates
  @Post('approved-candidates/:election_type')
  async getApprovedCandidates(@Param('election_type') election_type: string) {
    return this.smartVoteService.getApprovedCandidates(election_type);
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

  //* Update Admin Password
  @Post('update-admin-password')
  async updateAdminPassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.smartVoteService.updateAdminPassword(updatePasswordDto);
  }

  @Post('voters')
  createVoter(@Body() smartVoteVoter: VotersDto) {
    return this.smartVoteService.createVoter(smartVoteVoter);
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

  //* Get Candidacy Schedule

  @Post('get-candidacy-schedule/:candidacy_type')
  async getCandidacySchedule(@Param('candidacy_type') candidacy_type: string) {
    return this.smartVoteService.getCandidacySchedule(candidacy_type);
  }
  //* Update Candidacy Schedule
  @Post('update-candidacy')
  async updateCandidacy(@Body() smartVoteCandidacy: CandidacyDto) {
    return this.smartVoteService.updateCandidacy(smartVoteCandidacy);
  }

  //*Get Election Schedule
  @Post('get-election-schedule/:election_type')
  async getElectionSchedule(@Param('election_type') election_type: string) {
    return this.smartVoteService.getElectionSchedule(election_type);
  }

  //*Update Election Schedule
  @Post('update-election')
  async updateElection(@Body() smartVoteElection: ElectionDto) {
    return this.smartVoteService.updateElectionSchedule(smartVoteElection);
  }

  //* Votes
  @Post('insert-votes')
  createVotes(@Body() smartVoteVotes: VotesDto) {
    return this.smartVoteService.createVotes(smartVoteVotes);
  }

  //* Get Vote History
  @Post('vote-history')
  getVoteHistory(@Body() smartVoteVotes: VotesDto) {
    return this.smartVoteService.getVoteHistory(smartVoteVotes);
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

  @Post('send-email')
  async sendEmail(
    @Body()
    emailData: {
      to: string;
      subject: string;
      text: string;
      html: string;
    },
  ) {
    await this.mailerService.sendEmail(emailData);
    return { message: 'Email sent successfully' };
  }

  //* Get Voters by Department for email notifications
  @Post('get-voters-by-department/:election_type')
  async getVotersByDepartment(@Param('election_type') election_type: string) {
    return this.smartVoteService.getVotersByDepartment(election_type);
  }

  //* Get Election Results - vote counts per candidate
  @Post('get-election-results/:election_type')
  async getElectionResults(@Param('election_type') election_type: string) {
    return this.smartVoteService.getElectionResults(election_type);
  }

  //* Get Election Statistics - votes by department or year level
  @Post('get-election-statistics/:election_type')
  async getElectionStatistics(@Param('election_type') election_type: string) {
    return this.smartVoteService.getElectionStatistics(election_type);
  }

  //* Get Dashboard Stats - students, voters, admins counts
  @Post('get-dashboard-stats')
  async getDashboardStats(@Body() body: { department?: string }) {
    return this.smartVoteService.getDashboardStats(body.department);
  }
}
