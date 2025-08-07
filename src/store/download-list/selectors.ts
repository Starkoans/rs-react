import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';

export const selectDownloadList = (state: RootState) =>
  state.selectedCats.downloadList;

export const selectDownloadListRows = createSelector(
  selectDownloadList,
  (cats) => {
    return cats.map((cat) => [
      cat.name,
      cat.description,
      cat.temperament,
      cat.origin,
    ]);
  }
);

export const selectIsCatInDownloadList = (currentCatId: string) =>
  createSelector(selectDownloadList, (selectedCats) =>
    selectedCats.some((selectedCat) => currentCatId === selectedCat.id)
  );
