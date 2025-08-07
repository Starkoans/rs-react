import { LSKeys } from '@/sources/constants';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchCatsState {
  searchValue: string;
}
const initialState: SearchCatsState = {
  searchValue: localStorage.getItem(LSKeys.searchValue) || '',
};

export const searchCatsSlice = createSlice({
  name: 'searchCats',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchCatsSlice.actions;

export default searchCatsSlice.reducer;
