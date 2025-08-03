import type { Cat } from '@/sources/types/cat';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SelectedCatsState {
  selectedCats: Cat.Breed[];
}

const initialState: SelectedCatsState = {
  selectedCats: [],
};

export const selectedCatsSlice = createSlice({
  name: 'selectedCats',
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

export const { addCat, removeAllCats, removeCat } = selectedCatsSlice.actions;

export default selectedCatsSlice.reducer;
