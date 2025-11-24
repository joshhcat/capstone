import { OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
export declare class AppService implements OnApplicationBootstrap {
    private dataSource;
    constructor(dataSource: DataSource);
    onApplicationBootstrap(): void;
}
