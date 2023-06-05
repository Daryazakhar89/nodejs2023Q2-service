import { Injectable } from '@nestjs/common';
import { Album, CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { DataBase } from 'src/db/DataBase';

@Injectable()
export class AlbumService {
  private db: DataBase;

  constructor() {
    this.db = DataBase.getInstance();
  }

  getAllAlbums(): Promise<Album[]> {
    return this.db.getAlbums();
  }

  getAlbumByID(id: string): Promise<Album> {
    return this.db.getAlbumByID(id);
  }

  createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.db.createAlbum(createAlbumDto);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    return this.db.updateAlbum(id, updateAlbumDto);
  }

  deleteAlbum(id: string): Promise<void> {
    return this.db.deleteAlbum(id);
  }
}
