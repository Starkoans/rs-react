import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';

export const selectSelectedCats = (state: RootState) =>
  state.selectedCats.selectedCats;

export const selectSelectedCatsRows = createSelector(
  selectSelectedCats,
  (cats) => {
    return cats.map((cat) => [
      cat.name,
      cat.description,
      cat.temperament,
      cat.origin,
    ]);
  }
);

export const selectIsCatSelected = (currentCatId: string) =>
  createSelector(selectSelectedCats, (selectedCats) =>
    selectedCats.some((selectedCat) => currentCatId === selectedCat.id)
  );
