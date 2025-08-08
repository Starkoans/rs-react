import type { RootState } from '..';

export const selectSearchValue = (state: RootState) =>
  state.searchCats.searchValue;
