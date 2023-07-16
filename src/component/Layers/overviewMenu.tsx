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
import OverView from '../../Content/OverView';
import MemoryUsage from '../../Content/MemoryUsage';
import DeadTuple from '../../Content/DeadTuple';
import LineChart from '../../Content/LineChart';


const OverViewMenu: React.FC = () => {

  const { from, to } = useSelector((state: RootState) => state.date);

  const starttime = new Date(from);
  const endtime = new Date(to);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: '-8px'}}>
      <Box
        component="main"
        sx={{
          flexGrow: 0,
          p: 2,
          height: '18vh',
          width: '80vw',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <OverView starttime={starttime} endtime={endtime}/>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', marginRight: 'auto', marginLeft: 'auto', marginTop: '-20px'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
          <Box
            component="main"
            sx={{
              flexGrow: 0,
              p: 2,
              height: '25vh',
              width: '40vw',
              justifyContent: 'center',
              alignItems: 'center'
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
                height: '25vh',
                width: '40vw',
                border: `1px dashed`
              }}
            >
              <LineChart />
            </Box>
        </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
          <Box
            component="main"
            sx={{
              flexGrow: 0,
              p: 2,
              height: '25vh',
              width: '40vw'
            }}
          >
            <MemoryUsage starttime={starttime} endtime={endtime} />
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 0,
              p: 2,
              height: '25vh',
              width: '40vw',
            }}
          >
            <DeadTuple starttime={starttime} endtime={endtime} />
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
  );
}

export default OverViewMenu;