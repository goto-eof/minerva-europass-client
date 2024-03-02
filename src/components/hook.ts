import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

type DispatchFunction = () => AppDispatch;
export const useProfileDispatch: DispatchFunction = useDispatch;
export const useProfileSelector: TypedUseSelectorHook<RootState> = useSelector;
