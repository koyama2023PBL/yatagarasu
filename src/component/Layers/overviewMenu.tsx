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


const OverViewMenu: React.FC = () => {

  const { from, to } = useSelector((state: RootState) => state.date);

  const starttime = new Date(from);
  const endtime = new Date(to);
  const querytime = 0.1

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
        <Box
          component="main"
          sx={{
            flexGrow: 0,
            p: 2,
            height: '40vh',
            width: '40vw',
            border: `1px dashed`
          }}
        >
          <CPUusage starttime={starttime} endtime={endtime}/>
        </Box>
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
            height: '24vh',
            width: '40vw',
            border: `1px dashed`
          }}
        >
          <AverageQueryTime starttime={starttime} endtime={endtime} />
        </Box>
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
          <SlowQueryCount starttime={starttime} endtime={endtime} querytime={querytime}/>
        </Box>
      </Box>
    </Box>
  );
}

export default OverViewMenu;