import * as React from 'react';
import Box from '@mui/material/Box';

import CPUusage from '../../Content/Postgresql/CPUusage';
import PostgresProcessStatus from '../../Content/Postgresql/ProcessCheck';

import { useSelector } from 'react-redux';
import { RootState } from '../Redux/StateStore';
import ArchitectureOverview from '../../Content/Postgresql/ArchitectureOverview';
import MemoryUsage from '../../Content/Postgresql/PostgresMemoryUsage';
import DeadTuple from '../../Content/Postgresql/DeadTuple';
import { useSyncQueryString } from '../Common/DateUpdate';
import { BreadcrumbsBar } from '../Common/BreadcrumbsBar';

const OverViewMenu: React.FC = () => {

  useSyncQueryString();

  const { from, to } = useSelector((state: RootState) => state.date);
  const starttime = new Date(from);
  const endtime = new Date(to);

  return (
    <div>
      <Box sx={{ p: 1, flexDirection: 'column', height: '8vh', alignItems: 'center', marginTop: '-1vh'}}>
        <BreadcrumbsBar/>
      </Box>
      <Box sx={{ p: 1, flexDirection: 'column', height: '63vh', alignItems: 'center', marginTop: '-1vh'}}>
        <ArchitectureOverview starttime={starttime} endtime={endtime}/>
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
