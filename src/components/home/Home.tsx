import React, { FunctionComponent } from 'react';
import { Browser } from 'components/browser';
import { Button } from 'components/common';
import { Detail } from 'components/detail';
import { Filter } from 'components/filter';

export const Home: FunctionComponent = () => {
  return (
    <div className="w-full h-screen pt-[48px] flex items-stretch">
      <div className="flex flex-col flex-grow">
        <div className="p-[16px] flex items-center space-x-[16px] border-b border-blueGray-200">
          <Filter />
          <Button>New Album</Button>
        </div>

        <Browser />
      </div>

      <Detail />
    </div>
  );
};
