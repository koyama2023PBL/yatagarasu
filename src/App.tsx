import React, { FC } from 'react';
import './App.css';
import BaseDisplayMenu from "./Component/BaseMenu/BaseDisplayMenu"
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { store } from './Component/Redux/StateStore'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FetchOnInit } from "./Component/Common/FetchOnInit";
import { fetchPrometheusSettings } from "./Component/Redux/PrometheusSettings";

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
    fontFamily: 'Noto SansJP, meiryo ui,Arial, sans-serif', 
  },
});

const App: FC = () => {
  return (
    <FetchOnInit tasks={[fetchPrometheusSettings]}>
      <Provider store={store as Store}>
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <div className="App" style={{ display: 'flex' }} >
            <code>
              <BaseDisplayMenu />
            </code>
          </div>
        </ThemeProvider>
      </Provider>
    </FetchOnInit>
  );
}

export default App;
