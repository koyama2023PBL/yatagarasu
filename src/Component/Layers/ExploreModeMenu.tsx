import * as React from 'react';
import Box from '@mui/material/Box';

import { useSelector } from 'react-redux';
import { RootState } from '../Redux/StateStore';
import { useSyncQueryString } from '../Common/DateUpdate';
import { BreadcrumbsBar } from '../Common/BreadcrumbsBar';
import { Outlet } from 'react-router-dom';

const ExploreModeMenu: React.FC = () => {

  useSyncQueryString();

  const { from, to } = useSelector((state: RootState) => state.date);
  const starttime = new Date(from);
  const endtime = new Date(to);

  return (
    <div>
      <Box sx={{ p: 1, flexDirection: 'column', height: '8vh', alignItems: 'center', marginTop: '-1vh'}}>
        <BreadcrumbsBar/>
      </Box>
      <Box sx={{ p: 1, flexDirection: 'column', height: '63vh', alignItems: 'center', marginTop: '-20px'}}>
        <Outlet />
      </Box>
    </div>
  );
}

export default ExploreModeMenu;
