import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Delete,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { Track } from './track.entity';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll(): Promise<Track[]> {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return await this.trackService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    const track = this.trackService.updateTrack(id, updateTrackDto);
    return await track;
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.trackService.deleteTrack(id);
  }
}
