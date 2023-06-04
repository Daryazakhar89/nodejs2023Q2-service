import { Injectable } from '@nestjs/common';
import { CreateTrackDto, Track, UpdateTrackDto } from './track.dto';
import { DataBase } from 'src/db/DataBase';

@Injectable()
export class TrackService {
  db: DataBase;

  constructor() {
    this.db = DataBase.getInstance();
  }

  getAllTracks(): Promise<Track[]> {
    return this.db.getTracks();
  }

  getTrackByID(id: string): Promise<Track> {
    return this.db.getTrackByID(id);
  }

  createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.db.createTrack(createTrackDto);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    return this.db.updateTrack(id, updateTrackDto);
  }

  deleteTrack(id: string): Promise<void> {
    return this.db.deleteTrack(id);
  }
}
