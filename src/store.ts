import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedCatsReducer from '@/download-list.slice';
import { useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({ downloadList: selectedCatsReducer });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
