import { Expose } from 'class-transformer';
import { Album } from 'src/album/album.dto';
import { Artist } from 'src/artist/artist.dto';
import { Track } from 'src/track/track.dto';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'favorites' })
export class Favorites {
  @Column()
  @Expose()
  artists: Artist[];

  @Column()
  @Expose()
  albums: Album[];

  @Column()
  @Expose()
  tracks: Track[];
}
