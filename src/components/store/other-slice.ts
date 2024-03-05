import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import OtherDTO from '../../dto/resume/OtherDTO';

type OtherState = {
  other?: OtherDTO;
};

const initialState: OtherState = { other: undefined };

export const otherSlice = createSlice({
  name: 'otherSlice',
  initialState: initialState,
  reducers: {
    replaceOther(state, payloadAction: PayloadAction<OtherDTO>) {
      state.other = payloadAction.payload;
    },
    resetOther(state) {
      state.other = undefined;
    },
  },
});

export const { replaceOther, resetOther } = otherSlice.actions;
