export declare class PasswordHashService {
    hashPassword(password: string): Promise<string>;
    comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean>;
    testPassword(): Promise<void>;
}
