import React, { FunctionComponent, useContext, useRef } from 'react';
import clsx from 'clsx';
import { BrowserItem } from 'components/browser';
import { AppContext } from 'contexts/AppContext';
import { useDimension } from 'hooks';

const ITEM_SIZE = 175;

export const Browser: FunctionComponent = () => {
  const { rootAlbum, parentAlbum, visibleData, selectedItem, isFiltering, filteredPictures } = useContext(AppContext);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { clientWidth, clientHeight } = useDimension(wrapperRef?.current);
  const cols = Math.round(clientWidth / ITEM_SIZE);

  const classes = {
    root: 'w-full flex-grow',
    wrapper: 'w-full overflow-y-scroll',
    container: clsx('p-[16px] grid gap-[12px]', {
      'grid-cols-1': cols <= 1,
      'grid-cols-2': cols === 2,
      'grid-cols-3': cols === 3,
      'grid-cols-4': cols === 4,
      'grid-cols-5': cols === 5,
      'grid-cols-6': cols === 6,
      'grid-cols-7': cols === 7,
      'grid-cols-8': cols === 8,
      'grid-cols-9': cols >= 9,
    }),
  };

  return (
    <div ref={wrapperRef} className={classes.root}>
      {clientHeight > 0 && (
        <div className={classes.wrapper} style={{ height: clientHeight, maxHeight: clientHeight }}>
          <div className={classes.container}>
            {isFiltering &&
              (filteredPictures.length === 0
                ? 'No matching'
                : filteredPictures.map((item) => (
                    <BrowserItem
                      key={item.id}
                      item={item}
                      selected={selectedItem && 'createdAt' in selectedItem && selectedItem.id === item.id}
                    />
                  )))}
            {!isFiltering && (parentAlbum || rootAlbum) && <BrowserItem item={parentAlbum} isUp />}
            {!isFiltering &&
              visibleData.albums.map((item) => (
                <BrowserItem
                  key={item.id}
                  item={item}
                  selected={selectedItem && !('createdAt' in selectedItem) && selectedItem.id === item.id}
                />
              ))}
            {!isFiltering &&
              visibleData.pictures.map((item) => (
                <BrowserItem
                  key={item.id}
                  item={item}
                  selected={selectedItem && 'createdAt' in selectedItem && selectedItem.id === item.id}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
