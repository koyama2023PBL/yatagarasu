import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { truncateMinites } from '../Common/Util';

interface DateState {
  from: string;
  to: string;
}

//TODO きちんとした値がセットされるように変更を行う
const initialState: DateState = {
  from: truncateMinites(new Date()).toISOString(),
  to: new Date().toISOString(),
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
