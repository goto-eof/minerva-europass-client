import { configureStore } from '@reduxjs/toolkit';
import { profileSlice } from './profile-slice';
import { introductionSlice } from './introdution-slice';
import { experienceSlice } from './experience-slice';

export const resumeStore = configureStore({
  reducer: {
    profile: profileSlice.reducer,
    introduction: introductionSlice.reducer,
    experience: experienceSlice.reducer,
  },
});

export type RootState = ReturnType<typeof resumeStore.getState>;

export type AppDispatch = typeof resumeStore.dispatch;
