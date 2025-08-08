import type { Cat } from '@/sources/types/cat';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface downloadListState {
  downloadList: Cat.Breed[];
}

const initialState: downloadListState = {
  downloadList: [],
};

export const downloadListSlice = createSlice({
  name: 'downloadList',
  initialState,
  reducers: {
    addCat: (state, action: PayloadAction<Cat.Breed>) => {
      state.downloadList.push(action.payload);
    },
    removeCat: (state, action: PayloadAction<Cat.Breed>) => {
      state.downloadList = state.downloadList.filter(
        (cat) => cat.id !== action.payload.id
      );
    },
    removeAllCats: (state) => {
      state.downloadList = [];
    },
  },
});

export const { addCat, removeAllCats, removeCat } = downloadListSlice.actions;

export default downloadListSlice.reducer;
