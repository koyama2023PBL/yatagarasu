import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';

import CacheHitRate from '../../Content/CacheHitRate';
import CPUusage from '../../Content/CPUusage';
import SlowQueryCount from '../../Content/SlowQuery';
import AverageQueryTime from '../../Content/AvgQueryTime';
import PostgresProcessStatus from '../../Content/ProcessCheck';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/StateStore';
import LineChart from '../../Content/LineChart';


const SettingMenu: React.FC = () => {

  const { from, to } = useSelector((state: RootState) => state.date);

  const starttime = new Date(from);
  const endtime = new Date(to);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
        <Box
          component="main"
          sx={{
            flexGrow: 0,
            p: 2,
            height: '100vh',
            width: '100vw',
            border: `1px dashed`
          }}
        >
          <LineChart/>
        </Box>
        </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
      </Box>
    </Box>
  );
}

export default SettingMenu;