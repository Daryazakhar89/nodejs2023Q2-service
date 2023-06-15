import { Exclude, Expose } from 'class-transformer';
import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.entity';
import { Track } from 'src/track/track.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favorites' })
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  @Exclude({ toPlainOnly: true })
  id: string;

  @Column('simple-array', { default: [] })
  artists: string[];

  @Column('simple-array', { default: [] })
  albums: string[];

  @Column('simple-array', { default: [] })
  tracks: string[];
}

@Entity({ name: 'favoritesResponse' })
export class FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
