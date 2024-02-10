import * as React from 'react';
import WelcomeExplore from './WelcomeExplore';
import { NavLink, Outlet } from 'react-router-dom';
import WelcomeQuery from './WelcomeQuery';
import WelcomeComponent from './WelcomeComponent';
import WelcomeServer from './WelcomeServer';
import WelcomeOverview from './WelcomeOverview';
import { Grid } from '@mui/material';

const WelcomeRoot: React.FC = () => (
  <div>
    <WelcomeExplore />

    <Grid container spacing={1} sx={{ marginTop: '5px' }}>
      <Grid item xs={12} md={6}>
        <NavLink to="/explore/query">
          <WelcomeQuery />
        </NavLink>
      </Grid>

      <Grid item xs={12} md={6}>
        {/*<NavLink to="/explore/component">*/}
          <WelcomeComponent />
        {/*</NavLink>*/}
      </Grid>

      <Grid item xs={12} md={6}>
        <NavLink to="/explore/server">
          <WelcomeServer />
        </NavLink>
      </Grid>

      <Grid item xs={12} md={6}>
        <NavLink to="/explore/overview">
          <WelcomeOverview />
        </NavLink>
      </Grid>
    </Grid>

    <Outlet />
  </div>
);

export default WelcomeRoot;