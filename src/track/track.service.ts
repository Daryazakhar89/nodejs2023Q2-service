import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto, Track, UpdateTrackDto } from './track.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TrackService {
  private tracks = [];

  async getAllTracks(): Promise<Track[]> {
    return this.tracks;
  }

  async getTrackByID(id: string): Promise<Track> {
    const track = this.tracks.find((user) => user.id === id);

    if (!track)
      throw new NotFoundException({
        message: 'Track with this id is not found',
      });

    return await track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = {
      id: randomUUID(),
      ...createTrackDto,
    };

    this.tracks.push(newTrack);
    return newTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) throw new NotFoundException();

    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;

    return track;
  }

  async deleteTrack(id: string): Promise<void> {
    const index: number = this.tracks.findIndex((track) => track.id === id);

    if (index < 0)
      throw new NotFoundException({
        message: 'Track with this id is not found',
      });

    this.tracks.splice(index, 1);
  }
}
