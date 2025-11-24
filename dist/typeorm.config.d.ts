import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
export declare const typeOrmConfigFactory: (configService: ConfigService) => DataSourceOptions;
export default typeOrmConfigFactory;
