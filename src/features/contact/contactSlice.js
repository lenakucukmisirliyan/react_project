import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sentForms: [],
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addSentForm: (state, action) => {
      state.sentForms.push(action.payload);
    },
  },
});

export const { addSentForm } = contactSlice.actions;
export default contactSlice.reducer;
