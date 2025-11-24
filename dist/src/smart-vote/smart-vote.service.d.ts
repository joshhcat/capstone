import { AdminDto, CandidatesDto, VotersDto, VotesDto, CandidacyDto, ElectionDto } from './dto/create-smart-vote.dto';
import { DatabaseService } from 'src/db/db.service';
import { PasswordHashService } from './password-hash.service';
export declare class SmartVoteService {
    private readonly database;
    private readonly passwordHashService;
    constructor(database: DatabaseService, passwordHashService: PasswordHashService);
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
    findCandidatesByID(student_id: string, smartVoteCandidate: CandidatesDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getCandidates(election_type: string): Promise<{
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
    createVoter(smartVoteVoter: VotersDto): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any;
    }>;
    voterLogin(student_id: string, plainPassword: string): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any;
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
    createAdmin(smartVoteAdmin: AdminDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllAdmins(): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    updateAdminByID(updateAdminByID: AdminDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    deleteAdminByID(admin_id: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    createVotes(smartVoteVotes: VotesDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    updateCandidacy(id: number, updateSmartVoteDto: CandidacyDto): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any;
    } | undefined>;
    updateElection(id: number, updateSmartVoteDto: ElectionDto): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any;
    }>;
}
