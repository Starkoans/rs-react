import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
} from '@reduxjs/toolkit';

import downloadList from './download-list/slice';
import searchCats from './search-cats/slice';

const rootReducer = combineReducers({
  downloadList,
  searchCats,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const listenerMiddleware = createListenerMiddleware();
