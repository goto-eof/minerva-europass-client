import { configureStore } from '@reduxjs/toolkit';
import { profileSlice } from './profile-slice';
import { introductionSlice } from './introdution-slice';
import { experienceSlice } from './experience-slice';
import { educationSlice } from './education-slice';
import { otherSkillsSlice } from './odtheSkills-slice';
import { otherSlice } from './other-slice';
import { certificatesSlice } from './certificates-slice';

export const resumeStore = configureStore({
  reducer: {
    profile: profileSlice.reducer,
    introduction: introductionSlice.reducer,
    experience: experienceSlice.reducer,
    education: educationSlice.reducer,
    otherSkills: otherSkillsSlice.reducer,
    other: otherSlice.reducer,
    certificates: certificatesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof resumeStore.getState>;

export type AppDispatch = typeof resumeStore.dispatch;
