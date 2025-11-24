"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartVoteController = void 0;
const common_1 = require("@nestjs/common");
const smart_vote_service_1 = require("./smart-vote.service");
const create_smart_vote_dto_1 = require("./dto/create-smart-vote.dto");
let SmartVoteController = class SmartVoteController {
    smartVoteService;
    constructor(smartVoteService) {
        this.smartVoteService = smartVoteService;
    }
    createCandidate(smartVoteCandidate) {
        return this.smartVoteService.createCandidate(smartVoteCandidate);
    }
    async findAllCandidates() {
        try {
            return await this.smartVoteService.findAllCandidates();
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve candidates.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findCandidateById(student_id, smartVoteCandidate) {
        return this.smartVoteService.findCandidatesByID(student_id, smartVoteCandidate);
    }
    async updateCandidate(updateSmartVoteCandidate) {
        return this.smartVoteService.updateCandidate(updateSmartVoteCandidate);
    }
    async getCandidates(election_type) {
        return this.smartVoteService.getCandidates(election_type);
    }
    createAdmin(smartVoteAdmin) {
        return this.smartVoteService.createAdmin(smartVoteAdmin);
    }
    loginAdmin(smartVoteAdmin) {
        return this.smartVoteService.loginAdmin(smartVoteAdmin);
    }
    async getAllAdmin() {
        try {
            return await this.smartVoteService.getAllAdmins();
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to retrieve admins.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAdminById(smartVoteAdmin) {
        return this.smartVoteService.updateAdminByID(smartVoteAdmin);
    }
    async deleteAdminById(admin_id) {
        return this.smartVoteService.deleteAdminByID(admin_id);
    }
    createVoter(smartVoteVoter) {
        return this.smartVoteService.createVoter(smartVoteVoter);
    }
    createVotes(smartVoteVotes) {
        return this.smartVoteService.createVotes(smartVoteVotes);
    }
    async loginVoter(body) {
        const { student_id, password } = body;
        const loginResult = await this.smartVoteService.voterLogin(student_id, password);
        console.log(password);
        console.log('Login Result:', loginResult);
        if (loginResult.success) {
            return {
                statusCode: 200,
                success: loginResult.success,
                message: loginResult.message,
                data: loginResult.data,
            };
        }
        else {
            return {
                statusCode: 401,
                success: loginResult.success,
                message: loginResult.message,
            };
        }
    }
    async updateCandidacy(id, smartVoteCandidacy) {
        return this.smartVoteService.updateCandidacy(id, smartVoteCandidacy);
    }
    async updateElection(id, smartVoteElection) {
        return this.smartVoteService.updateElection(id, smartVoteElection);
    }
};
exports.SmartVoteController = SmartVoteController;
__decorate([
    (0, common_1.Post)('insert-candidates'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_smart_vote_dto_1.CandidatesDto]),
    __metadata("design:returntype", void 0)
], SmartVoteController.prototype, "createCandidate", null);
__decorate([
    (0, common_1.Get)('get/candidates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SmartVoteController.prototype, "findAllCandidates", null);
__decorate([
    (0, common_1.Post)('find-candidate/:student_id'),
    __param(0, (0, common_1.Param)('student_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_smart_vote_dto_1.CandidatesDto]),
    __metadata("design:returntype", Promise)
], SmartVoteController.prototype, "findCandidateById", null);
__decorate([
    (0, common_1.Post)('update-candidate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_smart_vote_dto_1.CandidatesDto]),
    __metadata("design:returntype", Promise)
], SmartVoteController.prototype, "updateCandidate", null);
__decorate([
    (0, common_1.Post)('get-candidates/:election_type'),
    __param(0, (0, common_1.Param)('election_type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SmartVoteController.prototype, "getCandidates", null);
__decorate([
    (0, common_1.Post)('create-admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_smart_vote_dto_1.AdminDto]),
    __metadata("design:returntype", void 0)
], SmartVoteController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Post)('admin-login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_smart_vote_dto_1.AdminDto]),
    __metadata("design:returntype", void 0)
], SmartVoteController.prototype, "loginAdmin", null);
__decorate([
    (0, common_1.Get)('get-admins'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SmartVoteController.prototype, "getAllAdmin", null);
__decorate([
    (0, common_1.Post)('update-admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_smart_vote_dto_1.AdminDto]),
    __metadata("design:returntype", Promise)
], SmartVoteController.prototype, "updateAdminById", null);
__decorate([
    (0, common_1.Post)('delete-admin/:admin_id'),
    __param(0, (0, common_1.Param)('admin_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SmartVoteController.prototype, "deleteAdminById", null);
__decorate([
    (0, common_1.Post)('voters'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_smart_vote_dto_1.VotersDto]),
    __metadata("design:returntype", void 0)
], SmartVoteController.prototype, "createVoter", null);
__decorate([
    (0, common_1.Post)('votes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_smart_vote_dto_1.VotesDto]),
    __metadata("design:returntype", void 0)
], SmartVoteController.prototype, "createVotes", null);
__decorate([
    (0, common_1.Post)('voters-login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SmartVoteController.prototype, "loginVoter", null);
__decorate([
    (0, common_1.Post)('update-candidacy'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_smart_vote_dto_1.CandidacyDto]),
    __metadata("design:returntype", Promise)
], SmartVoteController.prototype, "updateCandidacy", null);
__decorate([
    (0, common_1.Post)('update-election'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_smart_vote_dto_1.ElectionDto]),
    __metadata("design:returntype", Promise)
], SmartVoteController.prototype, "updateElection", null);
exports.SmartVoteController = SmartVoteController = __decorate([
    (0, common_1.Controller)('smart-vote'),
    __metadata("design:paramtypes", [smart_vote_service_1.SmartVoteService])
], SmartVoteController);
//# sourceMappingURL=smart-vote.controller.js.map