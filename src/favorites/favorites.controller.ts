import {
  Controller,
  Get,
  HttpCode,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorites } from './favorites.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAllFavorites(): Promise<Favorites> {
    return await this.favoritesService.getAllFavorites();
  }

  @Post('track/:id')
  async addTrackToFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    return await this.favoritesService.addTrackToFavorites(id);
  }

  @HttpCode(204)
  @Delete('track/:id')
  async deleteTrackFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.favoritesService.deleteTrackFromFavorites(id);
  }

  @Post('album/:id')
  async addAlbumToFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    return await this.favoritesService.addAlbumToFavorites(id);
  }

  @HttpCode(204)
  @Delete('album/:id')
  async deleteAlbumFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  async addArtistToFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    return await this.favoritesService.addArtistToFavorites(id);
  }

  @HttpCode(204)
  @Delete('artist/:id')
  async deleteArtistFromFavorites(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.favoritesService.deleteArtistFromFavorites(id);
  }
}
