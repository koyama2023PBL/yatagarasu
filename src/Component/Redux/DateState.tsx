import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { roundMinutes } from '../Common/Util';

interface DateState {
  from: string;
  to: string;
}

const truncatedNow = roundMinutes(new Date());
const from = new Date(truncatedNow.getTime() - 720 * 60 * 1000).toISOString();
const to = truncatedNow.toISOString();

const initialState: DateState = {
  from: from,
  to: to,
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