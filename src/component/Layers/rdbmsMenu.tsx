import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';

import CacheHitRate from '../../Content/CacheHitRate';
import CPUusage from '../../Content/CPUusage';
import SlowQueryCount from '../../Content/SlowQuery';
import AverageQueryTime from '../../Content/AvgQueryTime';
import PostgresProcessStatus from '../../Content/ProcessCheck';

import { useState } from 'react';
import { RootState } from '../Redux/StateStore';
import { useSelector } from 'react-redux';


const RdbmsMenu: React.FC = () => {

  const { from, to } = useSelector((state: RootState) => state.date);

  const starttime = new Date(from);
  const endtime = new Date(to);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
        <Box
            component="main"
            border={1}
            sx={{
              flexGrow: 0,
              p: 2,
              height: '30vh',
              width: '40vw',
              border: `1px dashed`
            }}
          >
            <PostgresProcessStatus />
          </Box>
        </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
        <Box
          component="main"
          border={1}
          sx={{
            flexGrow: 0,
            p: 2,
            height: '18vh',
            width: '40vw',
            border: `1px dashed`
          }}
        >
          <CacheHitRate starttime={starttime} endtime={endtime} />
        </Box>
      </Box>
    </Box>
  );
}

export default RdbmsMenu;