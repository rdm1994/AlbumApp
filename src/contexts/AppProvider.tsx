import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { AppContext, DataInterface, FilterInterface } from 'contexts/AppContext';
import differenceInDays from 'date-fns/differenceInDays';
import { Album, Picture } from 'models';

export interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FunctionComponent<AppProviderProps> = ({ children }) => {
  const [rootAlbum, setRootAlbum] = useState<Album | undefined>();
  const [parentAlbum, setParentAlbum] = useState<Album | undefined>();
  const [data, setData] = useState<DataInterface>({ albums: [], pictures: [] });
  const [visibleData, setVisibleData] = useState<DataInterface>({ albums: [], pictures: [] });
  const [filter, setFilter] = useState<FilterInterface>({});
  const [filteredPictures, setFilteredPictures] = useState<Picture[]>([]);

  const open = (album?: Album): void => {
    setRootAlbum(album);
  };

  const move = (item: Album | Picture, album?: Album): void => {
    setData((prev) => {
      const next = { ...prev };
      const isPicture = 'createdAt' in item;
      if (isPicture) {
        const match = next.pictures.findIndex((i) => i.id === item.id);
        if (match >= 0) {
          next.pictures[match].album = album;
        }
      } else {
        const match = next.albums.findIndex((i) => i.id === item.id);
        if (match >= 0) {
          next.albums[match].pId = album?.id;
        }
      }
      return next;
    });
  };

  const share = (item: Picture | Album, email: string): void => {
    if (item.sharedEmails.includes(email)) {
      return;
    }

    setData((prev) => {
      const next = { ...prev };
      const isPicture = 'createdAt' in item;
      if (isPicture) {
        const match = next.pictures.findIndex((i) => i.id === item.id);
        if (match >= 0) {
          next.pictures[match].sharedEmails.push(email);
        }
      } else {
        const match = next.albums.findIndex((i) => i.id === item.id);
        if (match >= 0) {
          next.albums[match].sharedEmails.push(email);
        }
      }
      return next;
    });
  };

  const updateFilter = (filter: FilterInterface): void => {
    setFilter((prev) => ({ ...prev, ...filter }));
  };

  const resetFilter = (): void => {
    setFilter({});
  };

  const isFiltering =
    Boolean(filter.albumName) ||
    Boolean(filter.startDate) ||
    Boolean(filter.endDate) ||
    Boolean(filter.email) ||
    Boolean(filter.tag);

  useEffect(() => {
    setParentAlbum(data.albums.find((item) => item.id === rootAlbum?.pId));
    setVisibleData({
      albums: data.albums.filter((item) => item.pId === rootAlbum?.id),
      pictures: data.pictures.filter((item) => item.album?.id === rootAlbum?.id),
    });
  }, [rootAlbum, data]);

  useEffect(() => {
    if (isFiltering) {
      let filtered = [...data.pictures];

      if (filter.albumName && filter.albumName.length) {
        const name = filter.albumName.toLowerCase();
        filtered = [...filtered].filter((item) => item.album && item.album.name.toLowerCase().includes(name));
      }

      if (filter.startDate) {
        const startDate = filter.startDate;
        filtered = [...filtered].filter((item) => differenceInDays(item.createdAt, startDate) >= 0);
      }

      if (filter.endDate) {
        const endDate = filter.endDate;
        filtered = [...filtered].filter((item) => differenceInDays(item.createdAt, endDate) <= 0);
      }

      if (filter.tag && filter.tag.length) {
        const tag = filter.tag.toLowerCase();
        filtered = [...filtered].filter((item) => item.tag && item.tag.toLowerCase().includes(tag));
      }

      if (filter.email && filter.email.length) {
        const email = filter.email.toLowerCase();
        filtered = [...filtered].filter((item) => item.sharedEmails.map((item) => item.toLowerCase()).includes(email));
      }

      setFilteredPictures(filtered);
    } else {
      setFilteredPictures([]);
    }
  }, [data, filter, isFiltering]);

  return (
    <AppContext.Provider
      value={{
        rootAlbum,
        parentAlbum,
        data,
        visibleData,
        filter,
        isFiltering,
        filteredPictures,
        open,
        move,
        share,
        updateFilter,
        resetFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
