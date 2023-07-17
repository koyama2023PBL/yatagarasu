import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
  selected: string;
}

const initialState: MenuState = {
  selected: 'dashboard',
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
  },
});

export const { setSelected } = menuSlice.actions;

export default menuSlice.reducer;