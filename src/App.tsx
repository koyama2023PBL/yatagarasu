import React, { FC } from 'react';
import './App.css';
import BaseDisplayMenu from "./Component/BaseMenu/BaseDisplayMenu"
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { store } from './Component/Redux/StateStore'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#073A66'
    },
    background: {
      default: '#D0EAFA'
    }
  },
  typography: {
    fontFamily: 'Oxygen, Arial, sans-serif', 
  },
});

const App: FC = () => {
  return (
    <Provider store={store as Store}>
      <ThemeProvider theme={theme}>
        <div className="App" style={{ display: 'flex' }} >
          <code>
            <BaseDisplayMenu />
          </code>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
