import * as React from 'react';
import WelcomeExplore from './WelcomeExplore';
import { Link, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import WelcomeQuery from './WelcomeQuery';
import WelcomeComponent from './WelcomeComponent';
import WelcomeServer from './WelcomeServer';
import { Box } from '@mui/material';
import WelcomeOverview from './WelcomeOverview';

const WelcomeRoot: React.FC = () => (
  <div>
    {/*<WelcomeExplore />*/}

    <Box sx={{ marginTop: '1vh' }}>
      <NavLink to ="/explore/query">
        <WelcomeQuery />
      </NavLink>
    </Box>
    {/*
      <Box sx={{ marginTop: '10px' }}>
        <NavLink to="/explore/component">
          <WelcomeComponent />
        </NavLink>
      </Box>

      <Box sx={{ marginTop: '10px' }}>
        <NavLink to="/explore/server">
          <WelcomeServer />
        </NavLink>
      </Box>
    */}

    <Box sx={{ marginTop: '1vh' }}>
      <NavLink to="/explore/overview">
        <WelcomeOverview />
      </NavLink>
    </Box>

    <Outlet/>
  </div>
)

export default WelcomeRoot;


