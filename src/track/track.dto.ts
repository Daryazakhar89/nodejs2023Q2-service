import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'track' })
export class Track {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  artistId: string | null;

  @Column()
  @Expose()
  albumId: string | null;

  @Column()
  @Expose()
  duration: number;
}

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
