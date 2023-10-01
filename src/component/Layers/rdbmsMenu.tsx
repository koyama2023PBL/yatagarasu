import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';

import CacheHitRate from '../../Content/Postgresql/CacheHitRate';
import CPUusage from '../../Content/Postgresql/CPUusage';
import SlowQueryCount from '../../Content/Postgresql/SlowQuery';
import AverageQueryTime from '../../Content/Postgresql/AvgQueryTime';
import PostgresProcessStatus from '../../Content/Postgresql/ProcessCheck';

import { useState } from 'react';
import { RootState } from '../Redux/StateStore';
import { useSelector } from 'react-redux';
import DeadTuple from '../../Content/Postgresql/Deadtuple';
import PostgresMemoryUsageRatio from '../../Content/Postgresql/PostgresMemoryUsageRatio';
import DeadTupleRatio from '../../Content/Postgresql/DeadtupleRatio';
import PostgresMemoryUsage from '../../Content/Postgresql/PostgresMemoryUsage';
import ErrorLogDisplay from '../../Content/Postgresql/ErrorLog';


const RdbmsMenu: React.FC = () => {

  const { from, to } = useSelector((state: RootState) => state.date);

  const starttime = new Date(from);
  const endtime = new Date(to);

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '95vw',marginRight: 'auto', marginLeft: 'auto'}}>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '27vh',alignItems: 'left', marginTop: '-1vh'}}>
          <CacheHitRate starttime={starttime} endtime={endtime} />
          <Box sx={{ width: '1.5vh'}}></Box>
          <PostgresProcessStatus starttime={starttime} endtime={endtime}/>
        </Box>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '27vh',alignItems: 'left', marginTop: '-1vh'}}>
            <PostgresMemoryUsageRatio starttime={starttime} endtime={endtime} />
            <Box sx={{ width: '1.5vh'}}></Box>
            <PostgresMemoryUsage starttime={starttime} endtime={endtime} />
        </Box>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '27vh',alignItems: 'left', marginTop: '-1vh'}}>
          <DeadTupleRatio starttime={starttime} endtime={endtime} />
          <Box sx={{ width: '1.5vh'}}></Box>
          <DeadTuple starttime={starttime} endtime={endtime} />
        </Box>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '27vh',alignItems: 'left', marginTop: '-1vh'}}>
          <ErrorLogDisplay starttime={starttime} endtime={endtime} />
        </Box>
      </Box>
    </div>
  );
}

export default RdbmsMenu;