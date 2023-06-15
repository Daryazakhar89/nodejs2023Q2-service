import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { Album } from './album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { Track } from 'src/track/track.entity';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    private readonly favoritesService: FavoritesService,
  ) {}

  findAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new NotFoundException({
        message: 'Album with this id is not found',
      });
    }

    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = plainToClass(Album, {
      id: randomUUID(),
      ...createAlbumDto,
    });
    const album = this.albumRepository.create(newAlbum);
    await this.albumRepository.save(album);

    return instanceToPlain(album) as Album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album)
      throw new NotFoundException({
        message: 'Album with this id is not found',
      });

    album.name = updateAlbumDto.name;
    album.year = updateAlbumDto.year;
    album.artistId = updateAlbumDto.artistId;

    return instanceToPlain(album) as Album;
  }

  async deleteAlbum(id: string): Promise<void> {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new NotFoundException({
        message: 'Album with this id is not found',
      });
    }
    await this.albumRepository.delete(id);

    const tracksToRemoveAlbum = await this.trackRepository.findBy({
      albumId: album.id,
    });
    tracksToRemoveAlbum.forEach((track) => {
      track.albumId = null;
      return track;
    });

    await this.trackRepository.save(tracksToRemoveAlbum);

    const favorites = await this.favoritesService.getFavorites();
    if (favorites.albums.includes(id)) {
      await this.favoritesService.deleteAlbumFromFavorites(id);
    }
  }
}
