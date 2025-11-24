import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  AdminDto,
  CandidatesDto,
  VotersDto,
  VotesDto,
  CandidacyDto,
  ElectionDto,
} from './dto/create-smart-vote.dto';
import { DatabaseService } from 'src/db/db.service';
import { log } from 'console';
import { PasswordHashService } from './password-hash.service';
// import { UpdateSmartVoteDto } from './dto/update-smart-vote.dto';

@Injectable()
export class SmartVoteService {
  constructor(
    private readonly database: DatabaseService,
    private readonly passwordHashService: PasswordHashService,
  ) {}

  //ROUTES to be use in front end
  // get(key: string): string | undefined {
  //   return process.env[key];
  // }
  // getApiUrl(): object[] {
  //   return [
  //     { BASE_URL: process.env.BASE_URL ?? '' }, // Default to empty string if API_URL is undefined
  //     { NODE_MAILER_ROUTE: process.env.NODE_MAILER_ROUTE ?? '' }, // Default to empty string if FILE_PATH is undefined
  //     { FILE_PATH_ROUTE: process.env.FILE_PATH_ROUTE ?? '' }, // Default to empty string if FILE_PATH is undefined
  //     { WEBSITE_URL: process.env.WEBSITE_URL ?? '' }, // Default to empty string if FILE_PATH is undefined
  //   ];
  // }

  //*Insert Candidates with Student Existence Check
  async createCandidate(smartVoteCandidate: CandidatesDto) {
    try {
      const insertResult = await this.database.callStoredProcedure(
        'insertCandidate',
        [
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
        ],
      );

      return {
        success: true,
        message: 'Candidacy filed Successfully',
        data: insertResult,
      };
    } catch (error) {
      // Check if the err
      // or is related to the "Student ID already exists"
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

  //* Getting all Candidates
  async findAllCandidates() {
    try {
      // Call the stored procedure to get all candidates
      const [result] =
        await this.database.callStoredProcedure('getAllCandidates');

      if (!result || result.length === 0) {
        throw new Error('No candidates found');
      }

      return {
        success: true,
        message: 'Candidates retrieved successfully',
        data: result,
      };
    } catch (error) {
      console.error('Error retrieving candidates:', error);
      throw new Error('Failed to retrieve candidates. Please try again later.');
    }
  }

  //* Find Candidates by ID
  async findCandidatesByID(
    student_id: string,
    smartVoteCandidate: CandidatesDto,
  ) {
    try {
      // Assuming 'findCandidates' stored procedure takes a student_id
      const [result] = await this.database.callStoredProcedure(
        'findCandidates',
        [student_id],
      );

      // if (!result || result.length === 0) {
      //   throw new Error('No candidates found for the provided student ID.');
      // }

      return {
        success: true,
        message: 'Candidates retrieved successfully.',
        data: result,
      };
    } catch (error) {
      // Log the error and throw a more descriptive, custom error
      console.error('Error retrieving candidates:', error);
      throw new Error('Failed to retrieve candidates. Please try again later.');
    }
  }

  //* Get Candidates by Election Type
  async getCandidates(election_type: string) {
    try {
      // Assuming 'findCandidates' stored procedure takes a student_id
      const [result] = await this.database.callStoredProcedure(
        'getCandidates',
        [election_type],
      );
      return {
        success: true,
        message: 'Candidates retrieved successfully.',
        data: result,
      };
    } catch (error) {
      console.error('Error retrieving candidates:', error);
      throw new Error('Failed to retrieve candidates. Please try again later.');
    }
  }

  //* Update Candidate
  async updateCandidate(updateSmartVoteCandidate: CandidatesDto) {
    try {
      const result = await this.database.callStoredProcedure(
        'updateCandidate',
        [
          updateSmartVoteCandidate.student_id,
          updateSmartVoteCandidate.status,
          updateSmartVoteCandidate.remarks,
        ],
      );

      // Check if the result is null or undefined (no rows affected)
      if (result.affectedRows === 0) {
        return {
          success: false,
          message: 'Update candidate failed, no data found',
        };
      }

      return {
        success: true,
        message: 'Candidate updated successfully.',
        data: result, // You can return the result or just the ID depending on what your stored procedure returns
      };
    } catch (error) {
      // Log the error with more context for debugging
      console.error('Error updating candidate', error);
    }
  }

  //* Insert Voters
  async createVoter(smartVoteVoter: VotersDto) {
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

      // Hash the password using PasswordHashService
      const hashedPassword = await this.passwordHashService.hashPassword(
        smartVoteVoter.password,
      );

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
      } catch (error) {
        // Check if the err
        // or is related to the "Student ID already exists"
        // console.log(error.message);

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

        // throw new HttpException(
        //   'Failed to add voter. Please try again later.',
        //   HttpStatus.INTERNAL_SERVER_ERROR,
        // );
      }
    } catch (error) {
      console.error('Error finding student:', error);
      return {
        success: false,
        message: 'Error finding student',
      };
    }
  }

  //* Login function as voters
  async voterLogin(student_id: string, plainPassword: string) {
    try {
      // Get the stored password hash for the voter
      const result = await this.database.callStoredProcedure('votersLogin', [
        student_id,
      ]);

      if (result[0].length === 0) {
        return {
          success: false,
          message: 'Voter not found',
        };
      }

      // Assume `result[0][0].passwordHash` is the field where the hashed password is stored
      const storedPasswordHash = result[0][0].password;
      const responseData = result[0][0];
      // Compare the plain password with the stored hash
      const isPasswordValid = await this.passwordHashService.comparePasswords(
        plainPassword,
        storedPasswordHash,
      );

      console.log(result[0][0]);

      console.log(isPasswordValid);

      if (isPasswordValid) {
        return {
          success: true,
          message: 'Login successful',
          data: responseData,
        };
      } else {
        return {
          success: false,
          message: 'Invalid password',
        };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return {
        success: false,
        message: 'An error occurred during login',
      };
    }
  }

  //* Login Admin

  async loginAdmin(smartVoteAdmin: AdminDto) {
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
      } else {
        return {
          success: false,
          message: 'No data found',
        };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return {
        success: false,
        message: 'An error occurred during login',
      };
    }
  }

  //* Insert Admins
  async createAdmin(smartVoteAdmin: AdminDto) {
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
    } catch (error) {
      // Optionally log the error to a logging service

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

  //* Getting all Admins
  async getAllAdmins() {
    try {
      // Call the stored procedure to get all candidates
      const [result] = await this.database.callStoredProcedure('getAdmins');

      // if (!result || result.length === 0) {
      //   throw new Error('No candidates found');
      // }

      return {
        success: true,
        message: 'Candidates retrieved successfully',
        data: result,
      };
    } catch (error) {
      console.error('Error retrieving candidates:', error);
      throw new Error('Failed to retrieve candidates. Please try again later.');
    }
  }

  //* Update Admin by Admin ID
  async updateAdminByID(updateAdminByID: AdminDto) {
    try {
      // Assuming 'findCandidates' stored procedure takes a student_id
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
    } catch (error) {
      // Log the error and throw a more descriptive, custom error
      console.error('Error updating admin:', error);
      throw new Error('Failed to updated admin. Please try again later.');
    }
  }

  //* Delete Admin by Admin ID
  async deleteAdminByID(admin_id: string) {
    try {
      // Assuming 'findCandidates' stored procedure takes a student_id
      const result = await this.database.callStoredProcedure('deleteAdmin', [
        admin_id,
      ]);

      // if (!result || result.length === 0) {
      //   throw new Error('No candidates found for the provided student ID.');
      // }

      return {
        success: true,
        message: 'Admin deleted successfully.',
        data: result,
      };
    } catch (error) {
      // Log the error and throw a more descriptive, custom error
      console.error('Error deleting admin:', error);
      throw new Error('Failed to delete admin. Please try again later.');
    }
  }

  //* Insert Votes
  async createVotes(smartVoteVotes: VotesDto) {
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
    } catch (error) {
      // Optionally log the error to a logging service
      console.error('Error inserting Votes:', error);

      throw new HttpException(
        'Failed to add votes. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //Update Candidacy Schedule
  async updateCandidacy(id: number, updateSmartVoteDto: CandidacyDto) {
    try {
      const result = await this.database.callStoredProcedure(
        'updateCandidacy',
        [
          updateSmartVoteDto.id,
          updateSmartVoteDto.candidacy_type,
          updateSmartVoteDto.open_date,
          updateSmartVoteDto.close_date,
          updateSmartVoteDto.status,
          updateSmartVoteDto.opened_by,
        ],
      );

      // Check if the result is null or undefined (no rows affected)
      if (result.affectedRows === 0) {
        return {
          success: false,
          message: 'Candidacy Schedule update failed, no data found',
        };
      }

      return {
        success: true,
        message: 'Candidacy schedule updated successfully.',
        data: result, // You can return the result or just the ID depending on what your stored procedure returns
      };
    } catch (error) {
      // Log the error with more context for debugging
      console.error('Error updating candidacy schedule:', error);
    }
  }

  //Update Election Schedule
  async updateElection(id: number, updateSmartVoteDto: ElectionDto) {
    try {
      const result = await this.database.callStoredProcedure('updateElection', [
        updateSmartVoteDto.id,
        updateSmartVoteDto.election_type,
        updateSmartVoteDto.open_date,
        updateSmartVoteDto.close_date,
        updateSmartVoteDto.status,
        updateSmartVoteDto.opened_by,
      ]);

      // Check if the result is null or undefined (no rows affected)
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
    } catch (error) {
      console.error('Error updating election schedule:', error);
      throw new HttpException(
        'Failed to update election schedule',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} smartVote`;
  // }
}

//* stored procedure call examples in service file:

//? adminLogin
/**
 BEGIN
  -- Query to find the voter by student_id
    SELECT *
    FROM test_Test.admins
    WHERE admin_id = _admin_id AND `password`=_password;
END
 */

//? createAdmin
/*BEGIN

    -- Check if the admin_id already exists in the table
    IF EXISTS (SELECT 1 FROM test_Test.admins WHERE admin_id = _admin_id) THEN
        -- If the admin_id exists, exit the procedure and return an error or message
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Admin ID already exists';
    ELSE
        -- If admin_id does not exist, proceed with the insert
      INSERT INTO test_Test.admins (admin_id, `password`, fullname, email, departments, `position`, `role`, added_by, date_added) 
		VALUES (_admin_id, _password, _fullname, _email, _departments, _position, 'ADMIN', _added_by, NOW());
    END IF;

END */

//? deleteAdmin
/* BEGIN
DELETE FROM test_Test.admins WHERE admin_id = _admin_id;
END */

//? updateAdmin
/**
 BEGIN
UPDATE test_Test.admins 
SET fullname = _fullname,
	 email = _email,
	`position` = _position,
	 departments = _departments
	 WHERE admin_id = _admin_id;
END
 */

//? getAdmins
/**
 BEGIN
SELECT * FROM test_Test.admins;
END
 */

//?findStudent:
/* BEGIN
 SELECT * FROM test_Test.table0 WHERE student_id = _student_id AND firstname = _firstname;  
 END */

//?insertCandidate:
/* BEGIN
    -- Check if the student_id already exists in the table
    IF EXISTS (SELECT 1 FROM test_Test.table1 WHERE student_id = _student_id) THEN
        -- If the student_id exists, exit the procedure and return an error or message
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Student ID already exists';
    ELSE
        -- If student_id does not exist, proceed with the insert
        INSERT INTO test_Test.table1 (student_id, firstname, lastname, gender, course, `year`, email,
            `position`, election_type, party, `status`, filed_date) 
        VALUES (_student_id, _firstname, _lastname, _gender, 
            _course, _year, _email,
            _position, _election_type, _party, _status, _filed_date);
    END IF;
END*/

//? findCandidates
/*
BEGIN
SELECT * FROM test_Test.table1 WHERE student_id = _student_id;
END
*/

//? getCandidates
/*
BEGIN
SELECT * FROM test_Test.table1 WHERE election_type = _election_type AND YEAR(filed_date) = YEAR(NOW());
END
*/

//? updateCandidate
/*
BEGIN
SELECT * FROM test_Test.table1 WHERE election_type = _election_type AND YEAR(filed_date) = YEAR(NOW());
END
*/

//?insertVoters;
/*
BEGIN


DECLARE v_year CHAR(4);
    DECLARE v_max_seq INT;
    DECLARE v_new_seq INT;
    DECLARE v_voters_id VARCHAR(20);
    
    SET v_year = YEAR(CURDATE());

    -- Get max sequence number for current year, or 0 if none
    SELECT COALESCE(
        MAX(CAST(SUBSTRING_INDEX(voters_id, '-', -1) AS UNSIGNED)),
        0
    )
    INTO v_max_seq
    FROM test_Test.table3
    WHERE voters_id LIKE CONCAT('VOTER-', v_year, '-%');
    SET v_new_seq = v_max_seq + 1;
    SET v_voters_id = CONCAT('VOTER-', v_year, '-', LPAD(v_new_seq, 3, '0'));


    -- Check if the student_id already exists in the table
    IF EXISTS (SELECT 1 FROM test_Test.table3 WHERE student_id = _student_id) THEN
        -- If the student_id exists, exit the procedure and return an error or message
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Student ID already exists';
    ELSE
        -- If student_id does not exist, proceed with the insert
        INSERT INTO test_Test.table3 (student_id, voters_id, firstname, lastname, department, email, `password`, registered_at) 
        VALUES (_student_id, v_voters_id, _firstname, _lastname, _department, _email, _password,
         NOW());
    END IF;
END*/

//?updateCandidacy:
/*BEGIN
UPDATE test_Test.table2 
SET candidacy_type = _candidacy_type,
	 open_date = _open_date,
	 close_date = _close_date,
	 `status` = _status,
	 opened_by = _opened_by
	 WHERE id = _id;
	 
	  -- Optionally return the number of affected rows
  #SELECT ROW_COUNT() AS rows_affected;
END*/

//?updateElection:
/**
 * BEGIN
UPDATE test_Test.table4 
SET election_type = _election_type,
	 open_date = _open_date,
	 close_date = _close_date,
	 `status` = _status,
	 opened_by = _opened_by
	 WHERE id = _id;
	 
	  -- Optionally return the number of affected rows
  #SELECT ROW_COUNT() AS rows_affected;
END
 */

//?votersLogin
/*BEGIN
  -- Query to find the voter by student_id
    SELECT student_id, `password`
    FROM test_Test.table3
    WHERE student_id = _student_id;
END*/

//Database

//?StudentDb
/**
  CREATE TABLE `table0` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`student_id` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`firstname` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB

AUTO_INCREMENT=4
;
 */

//?CandidatesDb
/**
 CREATE TABLE `table1` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`student_id` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'latin1_swedish_ci',
	`firstname` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`lastname` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`gender` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`course` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`year` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`email` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`position` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`election_type` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`party` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`status` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`filed_date` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=10
;

 */

//?CandidacyDb
/**
 CREATE TABLE `table2` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`candidacy_type` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`open_date` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`close_date` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`status` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`opened_by` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=2
;

 */

//?ElectionDb
/**
 CREATE TABLE `table4` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`election_type` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`open_date` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`close_date` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`status` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`opened_by` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=3
;

 */

//?VotersDb
/**
 CREATE TABLE `table3` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`student_id` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`voters_id` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`firstname` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`lastname` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`department` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`email` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`password` VARCHAR(250) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`registered_at` DATE NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=15
;

 */

//? AdminDb
/*
CREATE TABLE `admins` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`admin_id` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`role` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`password` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`fullname` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`email` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`departments` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`position` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`added_by` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`date_added` DATE NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=25
;
*/
