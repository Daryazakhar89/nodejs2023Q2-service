import {
  NotFoundException,
  ForbiddenException,
  HttpException,
} from '@nestjs/common';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { randomUUID } from 'crypto';

import { Album, CreateAlbumDto, UpdateAlbumDto } from 'src/album/album.dto';
import {
  Artist,
  CreateArtistDto,
  UpdateArtistDto,
} from 'src/artist/artist.dto';
import { CreateTrackDto, Track, UpdateTrackDto } from 'src/track/track.dto';
import { CreateUserDto, UpdateUserDto, User } from 'src/user/user.dto';
import { Favorites } from 'src/favorites/favorites.dto';

export class DataBase {
  private db: {
    users: User[];
    albums: Album[];
    artists: Artist[];
    tracks: Track[];
    favorites: Favorites;
  };

  private static instance: DataBase;

  private constructor() {
    this.db = {
      users: [],
      albums: [],
      artists: [],
      tracks: [],
      favorites: {
        artists: [],
        albums: [],
        tracks: [],
      },
    };
  }

  static getInstance(): DataBase {
    if (DataBase.instance) {
      return DataBase.instance;
    }

    DataBase.instance = new DataBase();
    return DataBase.instance;
  }

  async getUsers(): Promise<User[]> {
    return this.db.users;
  }

  async getUserByID(id: string): Promise<User> {
    const user = this.db.users.find((user) => user.id === id);

    if (!user)
      throw new NotFoundException({
        message: 'User with this id is not found',
      });

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const date = Date.now();

    const newUser = plainToClass(User, {
      id: randomUUID(),
      ...createUserDto,
      version: 1,
      createdAt: date,
      updatedAt: date,
    });

    this.db.users.push(newUser);
    return instanceToPlain(newUser) as Promise<User>;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = this.db.users.find((user) => user.id === id);

    if (!user)
      throw new NotFoundException({
        message: 'User with this id is not found',
      });

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException({
        message: 'You old password is incorrect',
      });
    }

    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;
    return instanceToPlain(user) as Promise<User>;
  }

  async deleteUser(id: string): Promise<void> {
    const index: number = this.db.users.findIndex((user) => user.id === id);

    if (index < 0)
      throw new NotFoundException({
        message: 'User with this id is not found',
      });

    this.db.users.splice(index, 1);
  }

  async getTracks(): Promise<Track[]> {
    return this.db.tracks;
  }

  async getTrackByID(id: string): Promise<Track> {
    const track = this.db.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException({
        message: 'Track with this id is not found',
      });
    }

    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = {
      id: randomUUID(),
      ...createTrackDto,
    };

    this.db.tracks.push(track);

    return track;
  }

  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = this.db.tracks.find((track) => track.id === id);

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
    const index: number = this.db.tracks.findIndex((track) => track.id === id);

    if (index < 0) {
      throw new NotFoundException({
        message: 'Track with this id is not found',
      });
    }

    this.db.favorites.tracks = this.db.favorites.tracks.filter((track) => {
      return track.id !== id;
    });
    this.db.tracks.splice(index, 1);
  }

  async getAlbums(): Promise<Album[]> {
    return this.db.albums;
  }

  async getAlbumByID(id: string): Promise<Album> {
    const album = this.db.albums.find((album) => album.id === id);

    if (!album)
      throw new NotFoundException({
        message: 'Album with this id is not found',
      });

    return await album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = {
      id: randomUUID(),
      ...createAlbumDto,
    };

    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = this.db.albums.find((album) => album.id === id);

    if (!album)
      throw new NotFoundException({
        message: 'Album with this id is not found',
      });

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    return album;
  }

  async deleteAlbum(id: string): Promise<void> {
    const index: number = this.db.albums.findIndex((album) => album.id === id);

    if (index < 0)
      throw new NotFoundException({
        message: 'Album with this id is not found',
      });

    this.db.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    this.db.favorites.albums = this.db.favorites.albums.filter((album) => {
      return album.id !== id;
    });
    this.db.albums.splice(index, 1);
  }

  async getArtists(): Promise<Artist[]> {
    return this.db.artists;
  }

  async getArtistByID(id: string): Promise<Artist> {
    const artist = this.db.artists.find((artist) => artist.id === id);

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

    this.db.artists.push(newArtist);
    return newArtist;
  }

  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = this.db.artists.find((artist) => artist.id === id);

    if (!artist)
      throw new NotFoundException({
        message: 'Artist with this id is not found',
      });

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;

    return artist;
  }

  async deleteArtist(id: string): Promise<void> {
    const index: number = this.db.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index < 0) {
      throw new NotFoundException({
        message: 'Artist with this id is not found',
      });
    }

    this.db.artists.splice(index, 1);

    this.db.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    this.db.albums.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    this.db.favorites.artists = this.db.favorites.artists.filter((artist) => {
      return artist.id !== id;
    });
  }

  async getFavorites(): Promise<Favorites> {
    return this.db.favorites;
  }

  async addTrackToFavorites(id: string): Promise<string> {
    const track = this.db.tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException('Track with this id is not found', 422);
    }

    this.db.favorites.tracks.push(track);

    return 'Track successfully added to favorites';
  }

  async deleteTrackFromFavorites(id: string): Promise<void> {
    const index: number = this.db.favorites.tracks.findIndex(
      (track) => track.id === id,
    );

    if (index < 0) {
      throw new NotFoundException({
        message: 'Track with this id is not found',
      });
    }

    this.db.favorites.tracks.splice(index, 1);
  }

  async addAlbumToFavorites(id: string): Promise<string> {
    const album = this.db.albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException('Albom with this id is not found', 422);
    }

    this.db.favorites.albums.push(album);

    return 'Album successfully added to favorites';
  }

  async deleteAlbumFromFavorites(id: string): Promise<void> {
    const index: number = this.db.favorites.albums.findIndex(
      (album) => album.id === id,
    );

    if (index < 0) {
      throw new NotFoundException({
        message: 'Album with this id is not found',
      });
    }

    this.db.favorites.albums.splice(index, 1);
  }

  async addArtistToFavorites(id: string): Promise<string> {
    const artist = this.db.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException('Artist with this id is not found', 422);
    }

    this.db.favorites.artists.push(artist);

    return 'Artist successfully added to favorites';
  }

  async deleteArtistFromFavorites(id: string): Promise<void> {
    const index: number = this.db.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index < 0) {
      throw new NotFoundException({
        message: 'Artist with this id is not found',
      });
    }

    this.db.favorites.artists.splice(index, 1);
  }
}
