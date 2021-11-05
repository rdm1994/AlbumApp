import React, { FunctionComponent, HTMLAttributes, useContext, useRef } from 'react';
import clsx from 'clsx';
import { AlbumIcon } from 'components/icons';
import { AppContext } from 'contexts/AppContext';
import { useDimension } from 'hooks';
import { Album } from 'models';

export interface AlbumViewProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  album: Album;
  children?: never;
}

export const AlbumView: FunctionComponent<AlbumViewProps> = ({ selected, album }) => {
  const { select } = useContext(AppContext);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { clientWidth } = useDimension(wrapperRef?.current);

  const classes = {
    wrapper: clsx('relative rounded cursor-pointer', {
      'bg-blue-200 ring ring-blue-300': selected,
      'hover:bg-blue-100': !selected,
    }),
    album:
      'absolute w-[80%] h-[60%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center',
    label: 'absolute text-[12px] bottom-[4px] left-1/2 transform -translate-x-1/2',
  };

  const handleSelect = () => {
    if (selected) {
      select();
    } else {
      select(album);
    }
  };

  return (
    <div ref={wrapperRef} onClick={handleSelect}>
      {clientWidth > 0 && (
        <div className={classes.wrapper} style={{ width: clientWidth, height: clientWidth }}>
          <div className={classes.album}>
            <AlbumIcon className="w-auto h-full" />
          </div>
          <div className={classes.label}>{album.name}</div>
        </div>
      )}
    </div>
  );
};
