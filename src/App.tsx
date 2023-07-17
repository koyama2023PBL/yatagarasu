import React, { FC } from 'react';
import './App.css';
import BaseDisplayMenu from "./Component/BaseMenu/BaseDisplayMenu"
import { Provider } from 'react-redux';
import { Store } from 'redux'; // Store type from 'redux'
import { store } from './Component/Redux/StateStore'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey, indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500]
    },
    background: {
      default: '#c5cae9'
    }
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
