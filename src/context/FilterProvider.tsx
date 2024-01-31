import filter from 'leo-profanity';
import React, { PropsWithChildren, createContext, useCallback, useContext } from 'react';

const FilterContext = createContext({});
export const useFilter = () => useContext(FilterContext);

const FilterProvider = ({ children } : PropsWithChildren) => {
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));

  const filterWord = useCallback((word: string) => filter.clean(word), []);

  return <FilterContext.Provider value={filterWord}>{children}</FilterContext.Provider>;
};

export default FilterProvider;
