import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Favorites } from 'src/favorites/favorites.entity';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    TypeOrmModule.forFeature([Artist]),
    TypeOrmModule.forFeature([Track]),
    TypeOrmModule.forFeature([Favorites]),
  ],
  controllers: [TrackController],
  providers: [TrackService, FavoritesService],
})
export class TrackModule {}
