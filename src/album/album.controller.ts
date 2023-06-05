import {
  Body,
  Controller,
  Get,
  HttpCode,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album, CreateAlbumDto, UpdateAlbumDto } from './album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAllAlbums(): Promise<Album[]> {
    return await this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumByID(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Album> {
    return await this.albumService.getAlbumByID(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    const album = this.albumService.update(id, updateAlbumDto);
    return await album;
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.albumService.deleteAlbum(id);
  }
}
