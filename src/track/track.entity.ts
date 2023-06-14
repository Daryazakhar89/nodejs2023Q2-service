import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from 'src/artist/artist.entity';
import { Album } from 'src/album/album.entity';

@Entity({ name: 'track' })
export class Track {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column()
  @Expose()
  name: string;

  @Column('uuid', { nullable: true })
  @ManyToOne(() => Artist, (artist) => artist.id, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artistId: string | null;

  @Column('uuid', { nullable: true })
  @ManyToOne(() => Album, (album) => album.id, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  albumId: string | null;

  @Column()
  @Expose()
  duration: number;
}
