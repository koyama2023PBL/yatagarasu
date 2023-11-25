import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { roundMinutes } from '../Common/Util';

// DateState の型を Date から string に変更
interface DateState {
  from: string;
  to: string;
}

const truncatedNow = roundMinutes(new Date());
// from と to を ISO 文字列で初期化
const from = new Date(truncatedNow.getTime() - 1440 * 60 * 1000).toISOString();
const to = truncatedNow.toISOString();

const initialState: DateState = {
  from: from,
  to: to,
};

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    // PayloadAction の型を Date から string に変更
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