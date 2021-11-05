import React, { FunctionComponent, useState } from 'react';
import { Browser } from 'components/browser';
import { Button } from 'components/common';
import { Detail } from 'components/detail';
import { Filter } from 'components/filter';
import { NewAlbumModal } from 'components/new-album';

export const Home: FunctionComponent = () => {
  const [isOpenNewAlbumModal, setOpenNewAlbumModal] = useState<boolean>(false);

  const openNewAlbumModal = () => {
    setOpenNewAlbumModal(true);
  };

  const closeNewAlbumModal = () => {
    setOpenNewAlbumModal(false);
  };

  return (
    <>
      <div className="w-full h-screen pt-[48px] flex items-stretch">
        <div className="flex flex-col flex-grow">
          <div className="p-[16px] flex items-center space-x-[16px] border-b border-blueGray-200">
            <Filter />
            <Button onClick={openNewAlbumModal}>New Album</Button>
          </div>

          <Browser />
        </div>

        <Detail />
      </div>

      <NewAlbumModal open={isOpenNewAlbumModal} onClose={closeNewAlbumModal} />
    </>
  );
};
