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
    <div>
      <Box sx={{ p: 1, flexDirection: 'column', height: '18vh', alignItems: 'center', marginTop: '-1vh'}}>
        <OverView starttime={starttime} endtime={endtime}/>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '95vw',marginRight: 'auto', marginLeft: 'auto'}}>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '27vh',alignItems: 'left', marginTop: '-1vh'}}>
          <CPUusage starttime={starttime} endtime={endtime}/>
          <Box sx={{ width: '1.5vh'}}></Box>
          <PostgresProcessStatus starttime={starttime} endtime={endtime}/>
        </Box>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '27vh',alignItems: 'left', marginTop: '-1vh'}}>
          <MemoryUsage starttime={starttime} endtime={endtime} />
          <Box sx={{ width: '1.5vh'}}></Box>
          <DeadTuple starttime={starttime} endtime={endtime} />
        </Box>
      </Box>
    </div>
  );
}

export default OverViewMenu;