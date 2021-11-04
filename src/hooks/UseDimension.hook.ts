import { useEffect, useMemo, useState } from 'react';

export interface UseDimensionInterface {
  clientWidth: number;
  clientHeight: number;
  scrollWidth: number;
  scrollHeight: number;
}

export const useDimension = (element: HTMLElement | null): UseDimensionInterface => {
  const emptyDimension: UseDimensionInterface = useMemo(
    () => ({
      clientWidth: 0,
      clientHeight: 0,
      scrollWidth: 0,
      scrollHeight: 0,
    }),
    [],
  );
  const [refresh, setRefresh] = useState<boolean>(false);
  const [dimension, setDimension] = useState<UseDimensionInterface>(emptyDimension);

  useEffect(() => {
    const onResize = () => {
      setDimension(emptyDimension);
      setRefresh(true);
    };

    setRefresh(true);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [emptyDimension]);

  useEffect(() => {
    if (refresh && element) {
      const { clientWidth, clientHeight, scrollWidth, scrollHeight } = element;
      setDimension({ clientWidth, clientHeight, scrollWidth, scrollHeight });
      setRefresh(false);
    }
  }, [element, refresh]);

  return dimension;
};
