import type { Cat } from '@/sources/types/cat';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  selectedCats: Cat.Breed[];
}

const initialState: CounterState = {
  selectedCats: [],
};

export const downloadListSlice = createSlice({
  name: 'catList',
  initialState,
  reducers: {
    addCat: (state, action: PayloadAction<Cat.Breed>) => {
      state.selectedCats.push(action.payload);
    },
    removeCat: (state, action: PayloadAction<Cat.Breed>) => {
      state.selectedCats = state.selectedCats.filter(
        (cat) => cat.id !== action.payload.id
      );
    },
    removeAllCats: (state) => {
      state.selectedCats = [];
    },
  },
});

export const { addCat, removeAllCats, removeCat } = downloadListSlice.actions;

export default downloadListSlice.reducer;
