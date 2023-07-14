import React, { FC } from 'react';
import './App.css';
import BaseDisplayMenu from "./component/BaseMenu/BaseDisplayMenu"
import { Provider } from 'react-redux';
import { Store } from 'redux'; // Store type from 'redux'
import { store } from './component/Redux/StateStore'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: blueGrey,
  },
  //TODO 色・デザインの決定 
});

const App: FC = () => {
  return (
    <Provider store={store as Store}>
      <ThemeProvider theme={theme}>
        <div className="App" style={{ display: 'flex' }} >
          <BaseDisplayMenu />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
