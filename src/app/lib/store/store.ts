import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from '@reduxjs/toolkit';

import { catsApi } from 'api/cats.service';
import downloadList from './download-list/slice';
import searchCats from './search-cats/slice';

const rootReducer = combineReducers({
  downloadList,
  searchCats,
  [catsApi.reducerPath]: catsApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(catsApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const listenerMiddleware = createListenerMiddleware();

// listenerMiddleware.startListening({
//   actionCreator: setSearchValue,
//   effect: (action) => {
//     localStorage.setItem(LSKeys.searchValue, action.payload);
//   },
// });
