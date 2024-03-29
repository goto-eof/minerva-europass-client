import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import ProfileDTO from '../../dto/resume/ProfileDTO';

type ProfileState = {
  profile?: ProfileDTO;
};

const initialState: ProfileState = { profile: undefined };

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState: initialState,
  reducers: {
    replaceProfile(state, payloadAction: PayloadAction<ProfileDTO>) {
      state.profile = payloadAction.payload;
    },
    resetProfile(state) {
      state.profile = undefined;
    },
  },
});

export const { replaceProfile, resetProfile } = profileSlice.actions;
