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
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let DatabaseService = DatabaseService_1 = class DatabaseService {
    dataSource;
    logger = new common_1.Logger(DatabaseService_1.name);
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async callStoredProcedure(procedureName, params = [], queryRunner) {
        if (!procedureName || typeof procedureName !== 'string') {
            throw new Error('Invalid procedure name');
        }
        const query = `CALL ${procedureName}(${params.map(() => '?').join(', ')})`;
        try {
            const runner = queryRunner ?? this.dataSource;
            const result = await runner.query(query, params);
            if (Array.isArray(result) &&
                result.length > 0 &&
                Array.isArray(result[result.length - 1]) &&
                result[result.length - 1].length === 0) {
                result.pop();
            }
            return result;
        }
        catch (error) {
            this.logger.error(`Error executing stored procedure ${procedureName}`, error.stack);
            throw new Error(`Error executing stored procedure ${procedureName}: ${error.message}`);
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], DatabaseService);
//# sourceMappingURL=db.service.js.map