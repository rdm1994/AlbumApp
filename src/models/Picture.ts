import { Album } from './Album';

export interface Picture {
  id: string;
  name: string;
  src: string;
  tag?: string;
  album?: Album;
  sharedEmails: string[];
  createdAt: Date;
}
