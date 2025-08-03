import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedCats from '@/store/selected-cats.slice';
import { useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({ selectedCats });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
