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

export type ExplorerItem = Album | Picture;
export interface AppContextProps {
  rootAlbum?: Album;
  parentAlbum?: Album;
  data: DataInterface;
  visibleData: DataInterface;
  selectedItem?: ExplorerItem;
  filter: FilterInterface;
  isFiltering?: boolean;
  filteredPictures: Picture[];
  createAlbum: (name: string) => void;
  open: (album?: Album) => void;
  assignAlbum: (item: ExplorerItem, album?: Album) => void;
  share: (item: ExplorerItem, email: string) => void;
  unshare: (item: ExplorerItem, email: string) => void;
  setTag: (item: ExplorerItem, tag: string) => void;
  select: (item?: ExplorerItem) => void;
  updateFilter: (filter: FilterInterface) => void;
  resetFilter: () => void;
}

export const AppContext = createContext<AppContextProps>({
  data: { albums: [], pictures: [] },
  visibleData: { albums: [], pictures: [] },
  filter: {},
  filteredPictures: [],
  createAlbum: () => null,
  open: () => null,
  assignAlbum: () => null,
  share: () => null,
  unshare: () => null,
  setTag: () => null,
  select: () => null,
  updateFilter: () => null,
  resetFilter: () => null,
});
