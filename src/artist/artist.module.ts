import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Track } from '../track/track.entity';
import { Album } from '../album/album.entity';
import { FavoritesService } from '../favorites/favorites.service';
import { Favorites } from '../favorites/favorites.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artist]),
    TypeOrmModule.forFeature([Track]),
    TypeOrmModule.forFeature([Album]),
    TypeOrmModule.forFeature([Favorites]),
  ],
  providers: [ArtistService, FavoritesService],
  controllers: [ArtistController],
})
export class ArtistModule {}
