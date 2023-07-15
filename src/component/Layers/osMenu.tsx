import * as React from 'react';
import Box from '@mui/material/Box';

import { useSelector } from 'react-redux';
import { RootState } from '../Redux/StateStore';

import CacheHitRate from '../../Content/CacheHitRate';
import CPUusage from '../../Content/CPUusage';
import AverageQueryTime from '../../Content/AvgQueryTime';
import PostgresProcessStatus from '../../Content/ProcessCheck';

const OsMenu: React.FC = () => {

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
            height: '40vh',
            width: '80vw',
            border: `1px dashed`
          }}
        >
          <CPUusage starttime={starttime} endtime={endtime}/>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left'}}></Box>
      </Box>
    </Box>
  );
}

export default OsMenu;