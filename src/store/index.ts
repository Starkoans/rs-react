import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedCats from '@/store/selected-cats.slice';
import { useDispatch, useSelector } from 'react-redux';
import { catsApi } from '@/api';

const rootReducer = combineReducers({
  selectedCats,
  [catsApi.reducerPath]: catsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catsApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
