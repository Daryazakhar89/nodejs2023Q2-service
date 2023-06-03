import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist, CreateArtistDto, UpdateArtistDto } from './artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllArtists(): Promise<Artist[]> {
    return await this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtistByID(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Artist> {
    return await this.artistService.getArtistByID(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    return await this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = this.artistService.update(id, updateArtistDto);
    return await artist;
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.artistService.deleteArtist(id);
  }
}
