import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';

import CacheHitRate from '../../Content/Postgresql/CacheHitRate';
import CPUusage from '../../Content/Postgresql/CPUusage';
import SlowQueryCount from '../../Content/Postgresql/SlowQuery';
import AverageQueryTime from '../../Content/Postgresql/AvgQueryTime';
import PostgresProcessStatus from '../../Content/Postgresql/ProcessCheck';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/StateStore';
import DeadLocks from '../../Content/Postgresql/DeadLock';
import QueryCounts from '../../Content/Postgresql/QueryCounts';
import CacheHitCount from '../../Content/Postgresql/CacheHitCount'; 


const TableMenu: React.FC = () => {

  const { from, to } = useSelector((state: RootState) => state.date);

  const starttime = new Date(from);
  const endtime = new Date(to);
  const querytime = 0.1

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '95vw',marginRight: 'auto', marginLeft: 'auto'}}>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '27vh',alignItems: 'left', marginTop: '-1vh'}}>
          <SlowQueryCount starttime={starttime} endtime={endtime} querytime={querytime}/>
          <Box sx={{ width: '1.5vh'}}></Box>
          <AverageQueryTime starttime={starttime} endtime={endtime}/>
        </Box>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '27vh',alignItems: 'left', marginTop: '-1vh'}}>
          <DeadLocks starttime={starttime} endtime={endtime} />
          <Box sx={{ width: '1.5vh'}}></Box>
          <QueryCounts starttime={starttime} endtime={endtime} />
        </Box>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '27vh',alignItems: 'left', marginTop: '-1vh'}}>
          <CacheHitCount start={starttime} end={endtime} />
          <Box sx={{ width: '1.5vh'}}></Box>
          <QueryCounts starttime={starttime} endtime={endtime} />
        </Box>
      </Box>
    </div>
  );
}

export default TableMenu;