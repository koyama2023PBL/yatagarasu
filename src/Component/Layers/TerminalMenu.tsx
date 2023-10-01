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
import { Terminal } from '@mui/icons-material';
import TerminalComponent from '../../Content/Terminal/Terminal';


const TerminalMenu: React.FC = () => {

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '95vw',marginRight: 'auto', marginLeft: 'auto'}}>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '50vh',alignItems: 'left', marginTop: '-1vh'}}>
          <TerminalComponent/>
        </Box>
      </Box>
    </div>
  );
}

export default TerminalMenu;