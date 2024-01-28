import filter from 'leo-profanity';
import { createContext, useCallback, useContext } from 'react';

const FilterContext = createContext({});
export const useFilter = () => useContext(FilterContext);

// interface IChildren {
//   children: React.ReactNode;
// }

const FilterProvider = ({ children }) => {
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));

  const filterWord = useCallback((word) => filter.clean(word), []);

  return <FilterContext.Provider value={filterWord}>{children}</FilterContext.Provider>;
};

export default FilterProvider;
