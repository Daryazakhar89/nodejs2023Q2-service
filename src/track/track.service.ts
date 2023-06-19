import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { Track } from './track.entity';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    private readonly favoritesService: FavoritesService,
  ) {}

  findAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException({
        message: 'Track with this id is not found',
      });
    }

    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = plainToClass(Track, {
      id: randomUUID(),
      ...createTrackDto,
    });

    const track = this.trackRepository.create(newTrack);
    await this.trackRepository.save(track);

    return instanceToPlain(track) as Track;
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException({
        message: 'Track with this id is not found',
      });
    }

    track.name = updateTrackDto.name;
    track.artistId = updateTrackDto.artistId;
    track.albumId = updateTrackDto.albumId;
    track.duration = updateTrackDto.duration;

    return track;
  }

  async deleteTrack(id: string): Promise<void> {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException({
        message: 'Track with this id is not found',
      });
    }
    await this.trackRepository.delete(id);

    const favorites = await this.favoritesService.getFavorites();
    if (favorites.tracks.includes(id)) {
      await this.favoritesService.deleteTrackFromFavorites(id);
    }
  }
}
