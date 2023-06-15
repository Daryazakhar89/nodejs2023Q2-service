import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album } from './album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from 'src/track/track.entity';
import { Favorites } from 'src/favorites/favorites.entity';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Artist } from 'src/artist/artist.entity';

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
