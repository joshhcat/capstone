"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfigFactory = void 0;
const typeOrmConfigFactory = (configService) => ({
    type: 'mysql',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    synchronize: false,
    logging: false,
    extra: {
        connectionLimit: 30,
        connectTimeout: 30000,
        enableKeepAlive: true,
        keepAliveInitialDelay: 30000,
    },
});
exports.typeOrmConfigFactory = typeOrmConfigFactory;
exports.default = exports.typeOrmConfigFactory;
//# sourceMappingURL=typeorm.config.js.map