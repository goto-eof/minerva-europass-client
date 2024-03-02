import { configureStore } from '@reduxjs/toolkit';
import { profileSlice } from './profile-slice';

export const resumeStore = configureStore({
  reducer: { profile: profileSlice.reducer },
});

export type RootState = ReturnType<typeof resumeStore.getState>;

export type AppDispatch = typeof resumeStore.dispatch;
