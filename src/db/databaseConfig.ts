import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import config from '../../config';

const { POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } = config;

const databaseConfig: TypeOrmModuleOptions & DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: +POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ['dist/**/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/**/**/migrations/*.js'],
  migrationsRun: true,
};
export { databaseConfig };
