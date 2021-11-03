import React, { FunctionComponent } from 'react';
import { Button } from 'components/common';
import { Filter } from 'components/filter';

export const Home: FunctionComponent = () => {
  return (
    <div className="w-full h-screen pt-[48px] flex items-stretch">
      <div className="flex-col flex-1">
        <div className="p-[16px] flex items-center space-x-[16px] border-b border-blueGray-200">
          <Filter />
          <Button>New Album</Button>
        </div>
      </div>

      <div className="w-[300px] border-l border-blueGray-200"></div>
    </div>
  );
};
