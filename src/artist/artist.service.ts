import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { Artist } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { Track } from '../track/track.entity';
import { Album } from '../album/album.entity';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    private readonly favoritesService: FavoritesService,
  ) {}

  findAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException({
        message: 'Artist with this id is not found',
      });
    }

    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = plainToClass(Artist, {
      id: randomUUID(),
      ...createArtistDto,
    });

    const artist = this.artistRepository.create(newArtist);
    await this.artistRepository.save(artist);

    return instanceToPlain(artist) as Artist;
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist)
      throw new NotFoundException({
        message: 'Artist with this id is not found',
      });

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return instanceToPlain(artist) as Artist;
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException({
        message: 'Artist with this id is not found',
      });
    }

    await this.artistRepository.delete(id);

    const tracksToRemoveArtist = await this.trackRepository.findBy({
      artistId: id,
    });
    tracksToRemoveArtist.forEach((track) => {
      track.artistId = null;
      return track;
    });

    await this.trackRepository.save(tracksToRemoveArtist);

    const albumsToRemoveArtist = await this.albumRepository.findBy({
      artistId: id,
    });
    albumsToRemoveArtist.forEach((album) => {
      album.artistId = null;
      return album;
    });

    await this.albumRepository.save(albumsToRemoveArtist);

    const favorites = await this.favoritesService.getFavorites();
    if (favorites.artists.includes(id)) {
      await this.favoritesService.deleteArtistFromFavorites(id);
    }
  }
}
