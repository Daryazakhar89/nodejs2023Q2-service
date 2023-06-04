import { Injectable } from '@nestjs/common';
import { Artist, CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { DataBase } from 'src/db/DataBase';

@Injectable()
export class ArtistService {
  private db: DataBase;

  constructor() {
    this.db = DataBase.getInstance();
  }

  getAllArtists(): Promise<Artist[]> {
    return this.db.getArtists();
  }

  getArtistByID(id: string): Promise<Artist> {
    return this.db.getArtistByID(id);
  }

  createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.db.createArtist(createArtistDto);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    return this.db.updateArtist(id, updateArtistDto);
  }

  deleteArtist(id: string): Promise<void> {
    return this.db.deleteArtist(id);
  }
}
