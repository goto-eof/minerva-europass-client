import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import IntroductionDTO from '../../dto/resume/IntroductionDTO';

type IntroductionState = {
  introduction?: IntroductionDTO;
};

const initialState: IntroductionState = { introduction: undefined };

export const introductionSlice = createSlice({
  name: 'introductionSlice',
  initialState: initialState,
  reducers: {
    replaceIntroduction(state, payloadAction: PayloadAction<IntroductionDTO>) {
      state.introduction = payloadAction.payload;
    },
    resetIntroduction(state) {
      state.introduction = undefined;
    },
  },
});

export const { replaceIntroduction, resetIntroduction } =
  introductionSlice.actions;
