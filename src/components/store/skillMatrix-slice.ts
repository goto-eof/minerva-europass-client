import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import SkillsMatrixDTO from '../../dto/resume/SkillsMatrixDTO';

type SkillMatrixState = {
  skillMatrix?: SkillsMatrixDTO;
};

const initialState: SkillMatrixState = { skillMatrix: undefined };

export const skillMatrixSlice = createSlice({
  name: 'SkillMatrixSlice',
  initialState: initialState,
  reducers: {
    replaceSkillMatrix(state, payloadAction: PayloadAction<SkillsMatrixDTO>) {
      state.skillMatrix = payloadAction.payload;
    },
  },
});

export const { replaceSkillMatrix } = skillMatrixSlice.actions;
