import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album } from './album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '../track/track.entity';
import { Favorites } from '../favorites/favorites.entity';
import { FavoritesService } from '../favorites/favorites.service';
import { Artist } from '../artist/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    TypeOrmModule.forFeature([Artist]),
    TypeOrmModule.forFeature([Track]),
    TypeOrmModule.forFeature([Favorites]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, FavoritesService],
})
export class AlbumModule {}
