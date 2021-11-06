import React, { FunctionComponent, HTMLAttributes, useContext, useRef, useState } from 'react';
import clsx from 'clsx';
import { AlbumIcon, ShareIcon } from 'components/icons';
import { ShareModal } from 'components/share';
import { AppContext, ExplorerItem } from 'contexts/AppContext';
import { format } from 'date-fns';
import { useDimension } from 'hooks';

export interface BrowserItemProps extends HTMLAttributes<HTMLDivElement> {
  isUp?: boolean;
  selected?: boolean;
  item?: ExplorerItem;
  children?: never;
}

export const BrowserItem: FunctionComponent<BrowserItemProps> = ({ isUp, selected, item }) => {
  const { select, open } = useContext(AppContext);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { clientWidth } = useDimension(wrapperRef?.current);

  const [openShare, setOpenShare] = useState<boolean>(false);

  const classes = {
    wrapper: clsx('group relative rounded cursor-pointer', {
      'bg-blue-200 ring ring-blue-300': selected,
      'hover:bg-blue-100': !selected,
    }),
    item: 'absolute w-[80%] h-[60%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center',
    label: 'absolute text-[12px] bottom-[4px] left-1/2 transform -translate-x-1/2',
    share: clsx('z-10 absolute top-0 right-0 p-[8px]', {
      block: selected,
      'hidden group-hover:block': !selected,
    }),
  };

  const handleClick = () => {
    if (isUp) {
      if (!item || !('createdAt' in item)) {
        open(item);
      }
    } else if (selected) {
      select();
    } else {
      select(item);
    }
  };

  const handleDblClick = () => {
    if (!item || !('createdAt' in item)) {
      open(item);
    }
  };

  const showShare = () => {
    setOpenShare(true);
  };

  const hideShare = () => {
    setOpenShare(false);
  };

  return (
    <>
      <div ref={wrapperRef} onClick={handleClick} onDoubleClick={handleDblClick}>
        {clientWidth > 0 && (
          <div className={classes.wrapper} style={{ width: clientWidth, height: clientWidth }}>
            <div className={classes.item}>
              {item && 'createdAt' in item ? (
                <img
                  className="w-auto h-full"
                  src={`/img/${item.src}`}
                  alt={item.name}
                  title={format(item.createdAt, "'Created at' MM/d/yyyy")}
                />
              ) : (
                <AlbumIcon className="w-auto h-full" />
              )}
            </div>
            <div className={classes.label}>{isUp || !item ? '••' : item.name}</div>
            {!isUp && (
              <button className={classes.share} onClick={showShare}>
                <ShareIcon width={16} height={16} />
              </button>
            )}
          </div>
        )}
      </div>

      {item && <ShareModal item={item} open={openShare} onClose={hideShare} />}
    </>
  );
};
