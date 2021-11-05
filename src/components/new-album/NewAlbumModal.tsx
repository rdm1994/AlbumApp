import React, { ChangeEventHandler, FunctionComponent, useContext, useState } from 'react';
import { Modal, ModalProps } from 'components/common';
import { AppContext } from 'contexts/AppContext';

export interface NewAlbumModalProps extends Omit<ModalProps, 'children'> {
  children?: never;
}

export const NewAlbumModal: FunctionComponent<NewAlbumModalProps> = ({ open, onClose, ...rest }) => {
  const { createAlbum } = useContext(AppContext);

  const [albumName, setAlbumName] = useState<string>('');

  const handleAlbumNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAlbumName(e.currentTarget.value);
  };

  const handleCreateNewAlbum = () => {
    if (albumName) {
      createAlbum(albumName);
      setAlbumName('');

      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <Modal title="Create New Album" open={open} onOkay={handleCreateNewAlbum} onClose={onClose} width={400} {...rest}>
      <div className="flex flex-col items-stretch">
        <input
          className="h-[36px] m-[2px] px-[8px] py-[6px] rounded-[4px] text-[14px] leading-none tracking-normal focus:outline-none ring-1 ring-blueGray-200 focus:ring-blue-300"
          placeholder="Input the album name"
          value={albumName}
          onChange={handleAlbumNameChange}
        />
      </div>
    </Modal>
  );
};
