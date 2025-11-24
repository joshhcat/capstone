import { SmartVoteService } from './smart-vote.service';
import { AdminDto, CandidatesDto, VotersDto, VotesDto, CandidacyDto, ElectionDto } from './dto/create-smart-vote.dto';
export declare class SmartVoteController {
    private readonly smartVoteService;
    constructor(smartVoteService: SmartVoteService);
    createCandidate(smartVoteCandidate: CandidatesDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    findAllCandidates(): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    findCandidateById(student_id: string, smartVoteCandidate: CandidatesDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    updateCandidate(updateSmartVoteCandidate: CandidatesDto): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any;
    } | undefined>;
    getCandidates(election_type: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    createAdmin(smartVoteAdmin: AdminDto): Promise<{
        success: boolean;
        message: string;
    }>;
    loginAdmin(smartVoteAdmin: AdminDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    getAllAdmin(): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    updateAdminById(smartVoteAdmin: AdminDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    deleteAdminById(admin_id: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    createVoter(smartVoteVoter: VotersDto): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any;
    }>;
    createVotes(smartVoteVotes: VotesDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    loginVoter(body: {
        student_id: string;
        password: string;
    }): Promise<{
        statusCode: number;
        success: true;
        message: string;
        data: any;
    } | {
        statusCode: number;
        success: false;
        message: string;
        data?: undefined;
    }>;
    updateCandidacy(id: number, smartVoteCandidacy: CandidacyDto): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any;
    } | undefined>;
    updateElection(id: number, smartVoteElection: ElectionDto): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any;
    }>;
}
