/* eslint-disable @typescript-eslint/ban-ts-comment */
import filter from 'leo-profanity';
import { PropsWithChildren, useCallback } from 'react';
import { FilterContext } from './FilterContext.ts';

const FilterProvider = ({ children } : PropsWithChildren) => {
  // @ts-ignore
  filter.add(filter.getDictionary('ru'));
  // @ts-ignore
  filter.add(filter.getDictionary('en'));

  const filterWord = useCallback((word: string) => filter.clean(word), []);

  return <FilterContext.Provider value={filterWord}>{children}</FilterContext.Provider>;
};

export default FilterProvider;
