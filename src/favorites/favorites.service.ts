import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Favorites, FavoritesResponse } from './favorites.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Track } from 'src/track/track.entity';
import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  private async addFavorites() {
    const favorites = this.favoritesRepository.create({
      id: randomUUID(),
      albums: [],
      artists: [],
      tracks: [],
    });

    return await this.favoritesRepository.save(favorites);
  }

  private checkFavoritesExists() {
    return this.favoritesRepository.exist({ take: 1 });
  }

  async getFavorites() {
    const isFavoritesNotExist = !(await this.checkFavoritesExists());

    if (isFavoritesNotExist) {
      await this.addFavorites();
    }

    return (await this.favoritesRepository.find({ take: 1 }))[0];
  }

  async findAll(): Promise<FavoritesResponse> {
    const favorites = await this.getFavorites();

    const favoritesResult: FavoritesResponse = {
      artists: await this.artistRepository.findBy([
        { id: In(favorites.artists) },
      ]),
      albums: await this.albumRepository.findBy([{ id: In(favorites.albums) }]),
      tracks: await this.trackRepository.findBy([{ id: In(favorites.tracks) }]),
    };

    return favoritesResult;
  }

  async addTrackToFavorites(id: string): Promise<string> {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new HttpException('Track with this id is not found', 422);
    }

    const favorites = await this.getFavorites();
    favorites.tracks.push(id);

    await this.favoritesRepository.save(favorites);

    return 'Track successfully added to favorites';
  }

  async deleteTrackFromFavorites(id: string): Promise<void> {
    const favorites = await this.getFavorites();

    if (!favorites.tracks.includes(id)) {
      throw new NotFoundException('Track with this id is not found');
    }

    favorites.tracks = favorites.tracks.filter((track) => track !== id);

    await this.favoritesRepository.save(favorites);
  }

  async addAlbumToFavorites(id: string): Promise<string> {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) {
      throw new HttpException('Album with this id is not found', 422);
    }

    const favorites = await this.getFavorites();
    favorites.albums.push(id);

    await this.favoritesRepository.save(favorites);

    return 'Album successfully added to favorites';
  }

  async deleteAlbumFromFavorites(id: string): Promise<void> {
    const favorites = await this.getFavorites();

    if (!favorites.albums.includes(id)) {
      throw new NotFoundException('Album with this id is not found');
    }

    favorites.albums = favorites.albums.filter((album) => album !== id);

    await this.favoritesRepository.save(favorites);
  }

  async addArtistToFavorites(id: string): Promise<string> {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new HttpException('Artist with this id is not found', 422);
    }

    const favorites = await this.getFavorites();
    favorites.artists.push(id);

    await this.favoritesRepository.save(favorites);

    return 'Artist successfully added to favorites';
  }

  async deleteArtistFromFavorites(id: string): Promise<void> {
    const favorites = await this.getFavorites();

    if (!favorites.artists.includes(id)) {
      throw new NotFoundException('Artist with this id is not found');
    }

    favorites.artists = favorites.artists.filter((artist) => artist !== id);

    await this.favoritesRepository.save(favorites);
  }
}
