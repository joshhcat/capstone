"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectionDto = exports.CandidacyDto = exports.AdminDto = exports.VotesDto = exports.VotersDto = exports.CandidatesDto = void 0;
class CandidatesDto {
    student_id;
    firstname;
    lastname;
    email;
    department;
    position;
    party;
    about_yourself;
    purpose;
    election_type;
    status;
    remarks;
}
exports.CandidatesDto = CandidatesDto;
class VotersDto {
    student_id;
    firstname;
    lastname;
    department;
    email;
    password;
}
exports.VotersDto = VotersDto;
class VotesDto {
    voters_id;
    firstname;
    lastname;
    email;
    department;
    election_type;
    president;
    vice_president;
    voted_date;
}
exports.VotesDto = VotesDto;
class AdminDto {
    admin_id;
    password;
    fullname;
    email;
    departments;
    position;
    added_by;
}
exports.AdminDto = AdminDto;
class CandidacyDto {
    id;
    candidacy_type;
    open_date;
    close_date;
    status;
    opened_by;
}
exports.CandidacyDto = CandidacyDto;
class ElectionDto {
    id;
    election_type;
    open_date;
    close_date;
    status;
    opened_by;
}
exports.ElectionDto = ElectionDto;
//# sourceMappingURL=create-smart-vote.dto.js.map