import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/*
    <Box component="span" m={0}>
      <Button variant="contained" startIcon={<FavoriteIcon />}>
        Default
      </Button>
    </Box>
    <Box component="span" m={0}>
      <Button variant="contained" color="primary" startIcon={<FavoriteIcon />}>
        Primary
      </Button>
    </Box>
    <Box component="span" m={0}>
      <Button variant="contained" color="secondary" startIcon={<FavoriteIcon />}>
        Secondary
      </Button>
    </Box>
    */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
