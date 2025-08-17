import type { RootState } from '../store';

export const selectSearchValue = (state: RootState) =>
  state.searchCats.searchValue;
