import { DataSource, QueryRunner } from 'typeorm';
export declare class DatabaseService {
    private readonly dataSource;
    private readonly logger;
    constructor(dataSource: DataSource);
    callStoredProcedure(procedureName: string, params?: any[], queryRunner?: QueryRunner): Promise<any>;
}
