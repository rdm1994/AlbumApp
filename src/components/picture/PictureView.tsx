import React, { FunctionComponent, HTMLAttributes, useContext, useRef } from 'react';
import clsx from 'clsx';
import { AppContext } from 'contexts/AppContext';
import { format } from 'date-fns';
import { useDimension } from 'hooks';
import { Picture } from 'models';

export interface PictureViewProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  picture: Picture;
  children?: never;
}

export const PictureView: FunctionComponent<PictureViewProps> = ({ selected, picture }) => {
  const { select } = useContext(AppContext);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { clientWidth } = useDimension(wrapperRef?.current);

  const classes = {
    wrapper: clsx('relative rounded cursor-pointer', {
      'bg-blue-200 ring ring-blue-300': selected,
      'hover:bg-blue-100': !selected,
    }),
    picture:
      'absolute w-[80%] h-[60%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center',
    label: 'absolute text-[12px] bottom-[4px] left-1/2 transform -translate-x-1/2',
  };

  const handleSelect = () => {
    if (selected) {
      select();
    } else {
      select(picture);
    }
  };

  return (
    <div ref={wrapperRef} onClick={handleSelect}>
      {clientWidth > 0 && (
        <div className={classes.wrapper} style={{ width: clientWidth, height: clientWidth }}>
          <div className={classes.picture}>
            <img
              className="w-auto h-full"
              src={`/img/${picture.src}`}
              alt={picture.name}
              title={format(picture.createdAt, "'Created at' dd/MM/yyyy")}
            />
          </div>
          <div className={classes.label}>{picture.name}</div>
        </div>
      )}
    </div>
  );
};
