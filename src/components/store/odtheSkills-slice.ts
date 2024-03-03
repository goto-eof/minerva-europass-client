import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import OtherSkillsDTO from '../../dto/resume/OtherSkillsDTO';

type OtherSkillsState = {
  otherSkills?: OtherSkillsDTO;
};

const initialState: OtherSkillsState = { otherSkills: undefined };

export const otherSkillsSlice = createSlice({
  name: 'otherSkillsSlice',
  initialState: initialState,
  reducers: {
    replaceOtherSkills(state, payloadAction: PayloadAction<OtherSkillsDTO>) {
      state.otherSkills = payloadAction.payload;
    },
  },
});

export const { replaceOtherSkills } = otherSkillsSlice.actions;
