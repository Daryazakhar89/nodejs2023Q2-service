import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null;
}

export class UpdateAlbumDto extends CreateAlbumDto {}
