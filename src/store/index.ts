import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
import selectedCats from '@/store/download-list/slice';
import searchCats, { setSearchValue } from './search-cats/slice';
import { catsApi } from '@/api/cats.service';
import { LSKeys } from '@/sources/constants';

const rootReducer = combineReducers({
  selectedCats,
  searchCats,
  [catsApi.reducerPath]: catsApi.reducer,
});

export const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(catsApi.middleware),
});

listenerMiddleware.startListening({
  actionCreator: setSearchValue,
  effect: (action) => {
    localStorage.setItem(LSKeys.searchValue, action.payload);
  },
});

export type RootState = ReturnType<typeof rootReducer>;
