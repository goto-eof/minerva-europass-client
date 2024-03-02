import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

type DispatchFunction = () => AppDispatch;
export const useGlobalDispatch: DispatchFunction = useDispatch;
export const useGlobalSelector: TypedUseSelectorHook<RootState> = useSelector;
