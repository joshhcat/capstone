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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartVoteService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../db/db.service");
const password_hash_service_1 = require("./password-hash.service");
let SmartVoteService = class SmartVoteService {
    database;
    passwordHashService;
    constructor(database, passwordHashService) {
        this.database = database;
        this.passwordHashService = passwordHashService;
    }
    async createCandidate(smartVoteCandidate) {
        try {
            const insertResult = await this.database.callStoredProcedure('insertCandidate', [
                smartVoteCandidate.student_id,
                smartVoteCandidate.firstname,
                smartVoteCandidate.lastname,
                smartVoteCandidate.email,
                smartVoteCandidate.department,
                smartVoteCandidate.position,
                smartVoteCandidate.party,
                smartVoteCandidate.about_yourself,
                smartVoteCandidate.purpose,
                smartVoteCandidate.election_type,
            ]);
            return {
                success: true,
                message: 'Candidacy filed Successfully',
                data: insertResult,
            };
        }
        catch (error) {
            console.log(error.message);
            if (error.message.includes('Student ID already exists')) {
                return {
                    success: false,
                    message: 'This student ID already exists.',
                };
            }
            console.error('Error inserting candidate:', error);
            return {
                success: false,
                message: 'Error inserting candidate',
            };
        }
    }
    async findAllCandidates() {
        try {
            const [result] = await this.database.callStoredProcedure('getAllCandidates');
            if (!result || result.length === 0) {
                throw new Error('No candidates found');
            }
            return {
                success: true,
                message: 'Candidates retrieved successfully',
                data: result,
            };
        }
        catch (error) {
            console.error('Error retrieving candidates:', error);
            throw new Error('Failed to retrieve candidates. Please try again later.');
        }
    }
    async findCandidatesByID(student_id, smartVoteCandidate) {
        try {
            const [result] = await this.database.callStoredProcedure('findCandidates', [student_id]);
            return {
                success: true,
                message: 'Candidates retrieved successfully.',
                data: result,
            };
        }
        catch (error) {
            console.error('Error retrieving candidates:', error);
            throw new Error('Failed to retrieve candidates. Please try again later.');
        }
    }
    async getCandidates(election_type) {
        try {
            const [result] = await this.database.callStoredProcedure('getCandidates', [election_type]);
            return {
                success: true,
                message: 'Candidates retrieved successfully.',
                data: result,
            };
        }
        catch (error) {
            console.error('Error retrieving candidates:', error);
            throw new Error('Failed to retrieve candidates. Please try again later.');
        }
    }
    async updateCandidate(updateSmartVoteCandidate) {
        try {
            const result = await this.database.callStoredProcedure('updateCandidate', [
                updateSmartVoteCandidate.student_id,
                updateSmartVoteCandidate.status,
                updateSmartVoteCandidate.remarks,
            ]);
            if (result.affectedRows === 0) {
                return {
                    success: false,
                    message: 'Update candidate failed, no data found',
                };
            }
            return {
                success: true,
                message: 'Candidate updated successfully.',
                data: result,
            };
        }
        catch (error) {
            console.error('Error updating candidate', error);
        }
    }
    async createVoter(smartVoteVoter) {
        try {
            const result = await this.database.callStoredProcedure('findStudent', [
                smartVoteVoter.student_id,
                smartVoteVoter.firstname,
            ]);
            if (result[0].length === 0) {
                return {
                    success: false,
                    message: 'Student not found in the database',
                };
            }
            const hashedPassword = await this.passwordHashService.hashPassword(smartVoteVoter.password);
            try {
                const result = await this.database.callStoredProcedure('insertVoters', [
                    smartVoteVoter.student_id,
                    smartVoteVoter.firstname,
                    smartVoteVoter.lastname,
                    smartVoteVoter.department,
                    smartVoteVoter.email,
                    hashedPassword,
                ]);
                return {
                    success: true,
                    message: 'Voter Added Successfully',
                    data: result,
                };
            }
            catch (error) {
                if (error.message.includes('Student ID already exists')) {
                    return {
                        success: false,
                        message: 'This student ID already exists.',
                    };
                }
                console.error('Error inserting candidate:', error);
                return {
                    success: false,
                    message: 'Error inserting candidate',
                };
            }
        }
        catch (error) {
            console.error('Error finding student:', error);
            return {
                success: false,
                message: 'Error finding student',
            };
        }
    }
    async voterLogin(student_id, plainPassword) {
        try {
            const result = await this.database.callStoredProcedure('votersLogin', [
                student_id,
            ]);
            if (result[0].length === 0) {
                return {
                    success: false,
                    message: 'Voter not found',
                };
            }
            const storedPasswordHash = result[0][0].password;
            const responseData = result[0][0];
            const isPasswordValid = await this.passwordHashService.comparePasswords(plainPassword, storedPasswordHash);
            console.log(result[0][0]);
            console.log(isPasswordValid);
            if (isPasswordValid) {
                return {
                    success: true,
                    message: 'Login successful',
                    data: responseData,
                };
            }
            else {
                return {
                    success: false,
                    message: 'Invalid password',
                };
            }
        }
        catch (error) {
            console.error('Error during login:', error);
            return {
                success: false,
                message: 'An error occurred during login',
            };
        }
    }
    async loginAdmin(smartVoteAdmin) {
        try {
            const [result] = await this.database.callStoredProcedure('adminLogin', [
                smartVoteAdmin.admin_id,
                smartVoteAdmin.password,
            ]);
            if (result.length === 1) {
                return {
                    success: true,
                    message: 'Successfully login',
                    data: result,
                };
            }
            else {
                return {
                    success: false,
                    message: 'No data found',
                };
            }
        }
        catch (error) {
            console.error('Error during login:', error);
            return {
                success: false,
                message: 'An error occurred during login',
            };
        }
    }
    async createAdmin(smartVoteAdmin) {
        try {
            const result = await this.database.callStoredProcedure('createAdmin', [
                smartVoteAdmin.admin_id,
                smartVoteAdmin.password,
                smartVoteAdmin.fullname,
                smartVoteAdmin.email,
                smartVoteAdmin.departments.join(','),
                smartVoteAdmin.position,
                smartVoteAdmin.added_by,
            ]);
            return {
                success: true,
                message: 'Admin added Successfully',
            };
        }
        catch (error) {
            if (error.message.includes('Admin ID already exists')) {
                return {
                    success: false,
                    message: 'This Admin ID already exists.',
                };
            }
            console.error('Error inserting admin:', error);
            return {
                success: false,
                message: 'Error inserting admin',
            };
        }
    }
    async getAllAdmins() {
        try {
            const [result] = await this.database.callStoredProcedure('getAdmins');
            return {
                success: true,
                message: 'Candidates retrieved successfully',
                data: result,
            };
        }
        catch (error) {
            console.error('Error retrieving candidates:', error);
            throw new Error('Failed to retrieve candidates. Please try again later.');
        }
    }
    async updateAdminByID(updateAdminByID) {
        try {
            const result = await this.database.callStoredProcedure('updateAdmin', [
                updateAdminByID.admin_id,
                updateAdminByID.fullname,
                updateAdminByID.email,
                updateAdminByID.position,
                updateAdminByID.departments.join(','),
            ]);
            return {
                success: true,
                message: 'Admin updated successfully.',
                data: result,
            };
        }
        catch (error) {
            console.error('Error updating admin:', error);
            throw new Error('Failed to updated admin. Please try again later.');
        }
    }
    async deleteAdminByID(admin_id) {
        try {
            const result = await this.database.callStoredProcedure('deleteAdmin', [
                admin_id,
            ]);
            return {
                success: true,
                message: 'Admin deleted successfully.',
                data: result,
            };
        }
        catch (error) {
            console.error('Error deleting admin:', error);
            throw new Error('Failed to delete admin. Please try again later.');
        }
    }
    async createVotes(smartVoteVotes) {
        try {
            const result = await this.database.callStoredProcedure('insertVotes', [
                smartVoteVotes.voters_id,
                smartVoteVotes.firstname,
                smartVoteVotes.lastname,
                smartVoteVotes.email,
                smartVoteVotes.department,
                smartVoteVotes.election_type,
                smartVoteVotes.president,
                smartVoteVotes.vice_president,
                smartVoteVotes.voters_id,
            ]);
            return {
                success: true,
                message: 'Votes Inserted Successfully.',
                data: result,
            };
        }
        catch (error) {
            console.error('Error inserting Votes:', error);
            throw new common_1.HttpException('Failed to add votes. Please try again later.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateCandidacy(id, updateSmartVoteDto) {
        try {
            const result = await this.database.callStoredProcedure('updateCandidacy', [
                updateSmartVoteDto.id,
                updateSmartVoteDto.candidacy_type,
                updateSmartVoteDto.open_date,
                updateSmartVoteDto.close_date,
                updateSmartVoteDto.status,
                updateSmartVoteDto.opened_by,
            ]);
            if (result.affectedRows === 0) {
                return {
                    success: false,
                    message: 'Candidacy Schedule update failed, no data found',
                };
            }
            return {
                success: true,
                message: 'Candidacy schedule updated successfully.',
                data: result,
            };
        }
        catch (error) {
            console.error('Error updating candidacy schedule:', error);
        }
    }
    async updateElection(id, updateSmartVoteDto) {
        try {
            const result = await this.database.callStoredProcedure('updateElection', [
                updateSmartVoteDto.id,
                updateSmartVoteDto.election_type,
                updateSmartVoteDto.open_date,
                updateSmartVoteDto.close_date,
                updateSmartVoteDto.status,
                updateSmartVoteDto.opened_by,
            ]);
            if (result.affectedRows === 0) {
                return {
                    success: false,
                    message: 'Election Schedule update failed, no data found',
                };
            }
            return {
                success: true,
                message: 'Election schedule updated successfully.',
                data: result,
            };
        }
        catch (error) {
            console.error('Error updating election schedule:', error);
            throw new common_1.HttpException('Failed to update election schedule', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.SmartVoteService = SmartVoteService;
exports.SmartVoteService = SmartVoteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DatabaseService,
        password_hash_service_1.PasswordHashService])
], SmartVoteService);
//# sourceMappingURL=smart-vote.service.js.map