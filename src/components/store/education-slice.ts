import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import EducationDTO from '../../dto/resume/EducationDTO';

type EducationState = {
  education?: EducationDTO;
};

const initialState: EducationState = { education: undefined };

export const educationSlice = createSlice({
  name: 'educationSlice',
  initialState: initialState,
  reducers: {
    replaceEducation(state, payloadAction: PayloadAction<EducationDTO>) {
      state.education = payloadAction.payload;
    },
    resetEducation(state) {
      state.education = undefined;
    },
  },
});

export const { replaceEducation, resetEducation } = educationSlice.actions;
