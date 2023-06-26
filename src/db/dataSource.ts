import { DataSource } from 'typeorm';
import { databaseConfig } from './databaseConfig';

export default new DataSource({
  ...databaseConfig,
});
