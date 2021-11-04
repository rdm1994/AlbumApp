import React, { ChangeEventHandler, FunctionComponent, useContext } from 'react';
import DatePicker from 'react-datepicker';
import clsx from 'clsx';
import { Button } from 'components/common';
import { AppContext } from 'contexts/AppContext';
import 'react-datepicker/dist/react-datepicker.css';

export const Filter: FunctionComponent = () => {
  const { filter, updateFilter, resetFilter } = useContext(AppContext);

  const classes = {
    label: 'flex-shrink-0',
    input:
      'w-full h-[36px] px-[8px] py-[6px] rounded-[4px] text-[14px] leading-none tracking-normal focus:outline-none ring-1 ring-blueGray-200 focus:ring-blue-300',
  };

  const handleAlbumNameChanged: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateFilter({ albumName: e.currentTarget.value });
  };

  const handleStartDateChanged = (startDate: Date) => {
    updateFilter({ startDate });
  };

  const handleEndDateChanged = (endDate: Date) => {
    updateFilter({ endDate });
  };

  const handleTagChanged: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateFilter({ tag: e.currentTarget.value });
  };

  const handleEmailChanged: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateFilter({ email: e.currentTarget.value });
  };

  return (
    <div className="flex flex-1 items-center space-x-[12px]">
      <div className="flex flex-grow items-center space-x-[8px]">
        <label className={classes.label}>Album name:</label>
        <input className={classes.input} value={filter.albumName ?? ''} onChange={handleAlbumNameChanged} />
      </div>

      <div className="flex items-center space-x-[8px]">
        <label className={classes.label}>Date:</label>
        <div>
          <DatePicker
            className={clsx(classes.input, 'w-[150px]')}
            maxDate={filter.endDate}
            selected={filter.startDate}
            onChange={handleStartDateChanged}
          />
        </div>
        <div className="w-[12px] h-px bg-current" />
        <div>
          <DatePicker
            className={clsx(classes.input, 'w-[150px]')}
            minDate={filter.startDate}
            selected={filter.endDate}
            onChange={handleEndDateChanged}
          />
        </div>
      </div>

      <div className="flex flex-grow items-center space-x-[8px]">
        <label className={classes.label}>Tag:</label>
        <input className={classes.input} value={filter.tag ?? ''} onChange={handleTagChanged} />
      </div>

      <div className="flex flex-grow items-center space-x-[8px]">
        <label className={classes.label}>Email:</label>
        <input className={classes.input} value={filter.email ?? ''} onChange={handleEmailChanged} />
      </div>

      <Button onClick={resetFilter}>Reset</Button>
    </div>
  );
};
