import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import CertificatesDTO from '../../dto/resume/CertificatesDTO';

type CertificatesState = {
  certificates?: CertificatesDTO;
};

const initialState: CertificatesState = { certificates: undefined };

export const certificatesSlice = createSlice({
  name: 'certificatesSlice',
  initialState: initialState,
  reducers: {
    replaceCertificates(state, payloadAction: PayloadAction<CertificatesDTO>) {
      state.certificates = payloadAction.payload;
    },
    resetCertificates(state) {
      state.certificates = undefined;
    },
  },
});

export const { replaceCertificates, resetCertificates } =
  certificatesSlice.actions;
