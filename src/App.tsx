import React from 'react';
import './App.css';
import styled from "@emotion/styled";
import Header from "./component/header/header";
import Drawer from "./component/drawer/drawer";
import BaseDisplayMenu from "./component/drawer/BaseDisplayMenu"
import DataDisplayComponent from './DataDisplayComponent';
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
    <div className="App" style={{ display: 'flex' }}>
      <BaseDisplayMenu />
      <DataDisplayComponent/>
    </div>
    </ThemeProvider>
  );
}

export default App;
