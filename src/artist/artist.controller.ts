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
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { Artist } from './artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<Artist[]> {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return await this.artistService.findOne(id);
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
  async updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    const artist = this.artistService.updateArtist(id, updateArtistDto);
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
