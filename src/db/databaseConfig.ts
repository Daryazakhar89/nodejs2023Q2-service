import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import config from '../../config';
import { User } from '../user/user.entity';
import { Artist } from '../artist/artist.entity';
import { Favorites } from '../favorites/favorites.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

const {
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_HOST,
} = config;

const databaseConfig: TypeOrmModuleOptions & DataSourceOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: +POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [User, Favorites, Artist, Album, Track],
  synchronize: true,
  migrations: [__dirname + '/migrations/*.ts'],
};

export { databaseConfig };
