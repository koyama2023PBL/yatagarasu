import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateState {
  from: string;
  to: string;
}

const initialState: DateState = {
  from: '',
  to: '',
};

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setFromDate: (state, action: PayloadAction<string>) => {
      state.from = action.payload;
    },
    setToDate: (state, action: PayloadAction<string>) => {
      state.to = action.payload;
    },
  },
});

export const { setFromDate, setToDate } = dateSlice.actions;

export default dateSlice.reducer;
