import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import ExperienceDTO from '../../dto/resume/ExperienceDTO';

type ExperienceState = {
  experience?: ExperienceDTO;
};

const initialState: ExperienceState = { experience: undefined };

export const experienceSlice = createSlice({
  name: 'experienceSlice',
  initialState: initialState,
  reducers: {
    replaceExperience(state, payloadAction: PayloadAction<ExperienceDTO>) {
      state.experience = payloadAction.payload;
    },
    resetExperience(state) {
      state.experience = undefined;
    },
  },
});

export const { replaceExperience, resetExperience } = experienceSlice.actions;
