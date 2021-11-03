import { createContext } from 'react';
import { Album, Picture } from 'models';

export interface FilterInterface {
  albumName?: string;
  startDate?: Date;
  endDate?: Date;
  tag?: string;
  email?: string;
}

export interface DataInterface {
  albums: Album[];
  pictures: Picture[];
}

export interface AppContextProps {
  rootAlbum?: Album;
  parentAlbum?: Album;
  data: DataInterface;
  visibleData: DataInterface;
  filter: FilterInterface;
  isFiltering?: boolean;
  filteredPictures: Picture[];
  open: (album?: Album) => void;
  move: (picture: Picture | Album, album?: Album) => void;
  share: (item: Picture | Album, email: string) => void;
  updateFilter: (filter: FilterInterface) => void;
  resetFilter: () => void;
}

export const AppContext = createContext<AppContextProps>({
  data: { albums: [], pictures: [] },
  visibleData: { albums: [], pictures: [] },
  filter: {},
  filteredPictures: [],
  open: () => null,
  move: () => null,
  share: () => null,
  updateFilter: () => null,
  resetFilter: () => null,
});
