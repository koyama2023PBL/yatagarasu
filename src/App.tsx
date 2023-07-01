import React from 'react';
import './App.css';
import BaseDisplayMenu from "./component/BaseMenu/BaseDisplayMenu"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: blueGrey,
  },
  //TODO 色・デザインの決定 
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App" style={{ display: 'flex' }} >
      <BaseDisplayMenu />
    </div>
    </ThemeProvider>
  );
}

export default App;
