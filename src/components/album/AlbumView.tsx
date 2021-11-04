import React, { FunctionComponent, HTMLAttributes, useRef } from 'react';
import { useDimension } from 'hooks';
import { Album } from 'models';

export interface AlbumViewProps extends HTMLAttributes<HTMLDivElement> {
  album: Album;
  children?: never;
}

export const AlbumView: FunctionComponent<AlbumViewProps> = ({ album }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { clientWidth } = useDimension(wrapperRef?.current);

  return (
    <div ref={wrapperRef}>
      {clientWidth > 0 && <div className="bg-blue-200" style={{ width: clientWidth, height: clientWidth }}></div>}
    </div>
  );
};
