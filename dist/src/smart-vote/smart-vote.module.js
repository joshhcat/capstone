"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartVoteModule = void 0;
const common_1 = require("@nestjs/common");
const smart_vote_service_1 = require("./smart-vote.service");
const smart_vote_controller_1 = require("./smart-vote.controller");
const db_service_1 = require("../db/db.service");
const password_hash_service_1 = require("./password-hash.service");
let SmartVoteModule = class SmartVoteModule {
};
exports.SmartVoteModule = SmartVoteModule;
exports.SmartVoteModule = SmartVoteModule = __decorate([
    (0, common_1.Module)({
        controllers: [smart_vote_controller_1.SmartVoteController],
        providers: [smart_vote_service_1.SmartVoteService, db_service_1.DatabaseService, password_hash_service_1.PasswordHashService],
    })
], SmartVoteModule);
//# sourceMappingURL=smart-vote.module.js.map