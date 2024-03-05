import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import PersonalProjectsDTO from '../../dto/resume/PersonalProjectDTO';

type PersonalProjects = {
  personalProjects?: PersonalProjectsDTO;
};

const initialState: PersonalProjects = { personalProjects: undefined };

export const personalProjectsSlice = createSlice({
  name: 'personalProjectsSlice',
  initialState: initialState,
  reducers: {
    replacePersonalProjects(
      state,
      payloadAction: PayloadAction<PersonalProjectsDTO>
    ) {
      state.personalProjects = payloadAction.payload;
    },
    resetPersonalProjects(state) {
      state.personalProjects = undefined;
    },
  },
});

export const { replacePersonalProjects, resetPersonalProjects } =
  personalProjectsSlice.actions;
