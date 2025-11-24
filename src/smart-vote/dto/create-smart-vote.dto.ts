export class CandidatesDto {
  student_id: string;
  firstname: string;
  lastname: string;
  email: string;
  department: string;
  position: string;
  party: string;
  about_yourself: string;
  purpose: string;
  election_type: string;
  status: string;
  remarks: string;
}

export class VotersDto {
  student_id: string;
  firstname: string;
  lastname: string;
  department: string;
  email: string;
  password: string;
}
export class VotesDto {
  voters_id: string;
  firstname: string;
  lastname: string;
  email: string;
  department: string;
  election_type: string;
  president: string;
  vice_president: string;
  voted_date: string;
}
export class AdminDto {
  admin_id: string;
  password: string;
  fullname: string;
  email: string;
  departments: string[];
  position: string;
  added_by: string;
}

export class CandidacyDto {
  id: number;
  candidacy_type: string;
  open_date: string;
  close_date: string;
  status: string;
  opened_by: string;
}

export class ElectionDto {
  id: number;
  election_type: string;
  open_date: string;
  close_date: string;
  status: string;
  opened_by: string;
}
