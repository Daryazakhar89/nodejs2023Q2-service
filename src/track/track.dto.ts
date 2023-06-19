import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @IsNotEmpty()
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

export class UpdateTrackDto extends CreateTrackDto {}
