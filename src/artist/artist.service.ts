import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist, CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistService {
  private artists = [];

  async getAllArtists(): Promise<Artist[]> {
    return this.artists;
  }

  async getArtistByID(id: string): Promise<Artist> {
    const artist = this.artists.find((user) => user.id === id);

    if (!artist)
      throw new NotFoundException({
        message: 'Artist with this id is not found',
      });

    return await artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = {
      id: randomUUID(),
      ...createArtistDto,
    };

    this.artists.push(newArtist);
    return newArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) throw new NotFoundException();

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return artist;
  }

  async deleteArtist(id: string): Promise<void> {
    const index: number = this.artists.findIndex((artist) => artist.id === id);

    if (index < 0)
      throw new NotFoundException({
        message: 'Artist with this id is not found',
      });

    this.artists.splice(index, 1);
  }
}
