import { createContext, useContext } from 'react';

const FilterContext = createContext({} as (word: string) => string);
const useFilter = () => useContext(FilterContext);

export { FilterContext, useFilter };