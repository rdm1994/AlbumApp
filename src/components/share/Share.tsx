import React, { ChangeEventHandler, FunctionComponent, useContext, useState } from 'react';
import { Modal, ModalProps } from 'components/common';
import { AppContext, ExplorerItem } from 'contexts/AppContext';

export interface ShareModalProps extends Omit<ModalProps, 'children'> {
  item: ExplorerItem;
  children?: never;
}

export const ShareModal: FunctionComponent<ShareModalProps> = ({ item, open, onClose, ...rest }) => {
  const { share } = useContext(AppContext);

  const [email, setEmail] = useState<string>('');

  const handleEmailChanged: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.currentTarget.value);
  };

  const handleShare = () => {
    if (email) {
      share(item, email);
      setEmail('');

      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <Modal title="Share" open={open} onOkay={handleShare} onClose={onClose} width={400} {...rest}>
      <div className="flex flex-col items-stretch">
        <input
          type="email"
          className="h-[36px] m-[2px] px-[8px] py-[6px] rounded-[4px] text-[14px] leading-none tracking-normal focus:outline-none ring-1 ring-blueGray-200 focus:ring-blue-300"
          placeholder="Input the email address"
          value={email}
          onChange={handleEmailChanged}
        />
      </div>
    </Modal>
  );
};
