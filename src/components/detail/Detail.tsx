import React, { ChangeEventHandler, FunctionComponent, useContext } from 'react';
import { AlbumIcon, CloseIcon } from 'components/icons';
import { AppContext } from 'contexts/AppContext';
import { format } from 'date-fns';

export const Detail: FunctionComponent = () => {
  const { selectedItem, data, assignAlbum, unshare, setTag } = useContext(AppContext);

  if (!selectedItem) {
    return <div className="p-[24px] w-[300px] border-l border-blueGray-200" />;
  }

  const isPicure = 'createdAt' in selectedItem;

  const handleAlbumChanged: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const match = data.albums.find((item) => item.id === e.currentTarget.value);
    if (match) {
      assignAlbum(selectedItem, match);
    }
  };

  const handleUnshare = (email: string) => () => {
    unshare(selectedItem, email);
  };

  const handleTagChanged: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTag(selectedItem, e.currentTarget.value);
  };

  return (
    <div className="p-[24px] w-[300px] border-l border-blueGray-200 space-y-[24px]">
      <div className="space-y-[4px]">
        <div className="w-full flex justify-center">
          {isPicure ? (
            <img
              className="w-auto h-full"
              src={`/img/${selectedItem.src}`}
              alt={selectedItem.name}
              title={format(selectedItem.createdAt, "'Created at' MM/d/yyyy")}
            />
          ) : (
            <AlbumIcon className="w-2/3 h-auto" />
          )}
        </div>
        <p>{selectedItem.name}</p>
      </div>

      {isPicure && (
        <div className="space-y-[4px]">
          <p>Album</p>
          <select
            className="w-full h-[36px] px-[8px] py-[6px] rounded-[4px] text-[14px] leading-none tracking-normal focus:outline-none ring-1 ring-blueGray-200 focus:ring-blue-300"
            value={selectedItem.album?.id ?? ''}
            onChange={handleAlbumChanged}
          >
            <option value="">None</option>
            {data.albums.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-[4px]">
        <p>Shared by emails</p>
        {selectedItem.sharedEmails.map((item) => (
          <div key={item} className="flex items-center text-[14px]">
            <p className="flex-1">{item}</p>
            <button className="p-[8px] pr-0" onClick={handleUnshare(item)}>
              <CloseIcon width={12} height={12} />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-[4px]">
        <p>Tag</p>
        <div className="flex items-center space-x-[8px]">
          <span>#</span>
          <input
            className="flex-1 h-[36px] px-[8px] py-[6px] rounded-[4px] text-[14px] leading-none tracking-normal focus:outline-none ring-1 ring-blueGray-200 focus:ring-blue-300"
            value={selectedItem.tag ?? ''}
            onChange={handleTagChanged}
          />
        </div>
      </div>

      {isPicure && (
        <div className="space-y-[4px]">
          <p>Created Date</p>
          <p className="text-[14px]">{format(selectedItem.createdAt, 'MM/d/yyyy h:ma')}</p>
        </div>
      )}
    </div>
  );
};
