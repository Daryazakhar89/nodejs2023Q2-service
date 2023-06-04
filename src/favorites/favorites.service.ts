import { Injectable } from '@nestjs/common';
import { DataBase } from 'src/db/DataBase';
import { Favorites } from './favorites.dto';

@Injectable()
export class FavoritesService {
  db: DataBase;

  constructor() {
    this.db = DataBase.getInstance();
  }

  getAllFavorites(): Promise<Favorites> {
    return this.db.getFavorites();
  }

  addTrackToFavorites(id: string): Promise<string> {
    return this.db.addTrackToFavorites(id);
  }

  deleteTrackFromFavorites(id: string): Promise<void> {
    return this.db.deleteTrackFromFavorites(id);
  }

  addAlbumToFavorites(id: string): Promise<string> {
    return this.db.addAlbumToFavorites(id);
  }

  deleteAlbumFromFavorites(id: string): Promise<void> {
    return this.db.deleteAlbumFromFavorites(id);
  }

  addArtistToFavorites(id: string): Promise<string> {
    return this.db.addArtistToFavorites(id);
  }

  deleteArtistFromFavorites(id: string): Promise<void> {
    return this.db.deleteArtistFromFavorites(id);
  }
}
