import React, { FunctionComponent } from 'react';
import { AppIcon, UserIcon } from 'components/icons';

export const Header: FunctionComponent = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-[48px] px-[8px] bg-white shadow flex justify-between items-center">
      <AppIcon width="48" height="48" />
      <UserIcon width="36" height="36" />
    </div>
  );
};
