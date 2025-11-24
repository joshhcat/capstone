"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHashService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
let PasswordHashService = class PasswordHashService {
    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
    async comparePasswords(plainPassword, hashedPassword) {
        if (!plainPassword || !hashedPassword) {
            throw new Error('Both plainPassword and hashedPassword are required');
        }
        return bcrypt.compare(plainPassword, hashedPassword);
    }
    async testPassword() {
        const plainPassword = 'test123';
        const storedHash = '$2b$10$cWRWTDaTUBm2.VLiu0FVn.jNrEpXsVRyj4yyS0hTkb7Lbi3f0lSy.';
        const isPasswordValid = await bcrypt.compare(plainPassword, storedHash);
        console.log('Is password valid?', isPasswordValid);
    }
};
exports.PasswordHashService = PasswordHashService;
exports.PasswordHashService = PasswordHashService = __decorate([
    (0, common_1.Injectable)()
], PasswordHashService);
//# sourceMappingURL=password-hash.service.js.map