import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { roundMinutes } from '../Common/Util';

interface DateState {
  from: Date;
  to: Date;
}


const truncatedNow = roundMinutes(new Date());
const from = new Date(truncatedNow.getTime() - 15 * 60 * 1000);
const to = new Date(truncatedNow.getTime());


//TODO きちんとした値がセットされるように変更を行う
const initialState: DateState = {
  from: from,
  to: to,
};

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setFromDate: (state, action: PayloadAction<Date>) => {
      state.from = action.payload;
    },
    setToDate: (state, action: PayloadAction<Date>) => {
      state.to = action.payload;
    },
  },
});

export const { setFromDate, setToDate } = dateSlice.actions;

export default dateSlice.reducer;
