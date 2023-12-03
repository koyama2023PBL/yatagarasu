import * as React from 'react';
import Box from '@mui/material/Box';

import { useSelector } from 'react-redux';
import { RootState } from '../Redux/StateStore';

import CPUusage from '../../Content/Postgresql/CPUusage';
import MemoryUsage from '../../Content/Postgresql/PostgresMemoryUsage';
import MemoryUsageRatio from '../../Content/Postgresql/PostgresMemoryUsageRatio';
import { useSyncQueryString } from '../Common/DateUpdate';
import { BreadcrumbsBar } from '../Common/BreadcrumbsBar';


const OsMenu: React.FC = () => {
  
  useSyncQueryString();

  const { from, to } = useSelector((state: RootState) => state.date);
  const starttime = new Date(from);
  const endtime = new Date(to);

  return (
    <div>
      <Box sx={{ p: 1, flexDirection: 'column', height: '7vh', alignItems: 'center', marginTop: '-1vh'}}>
        <BreadcrumbsBar/>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '95vw',marginRight: 'auto', marginLeft: 'auto'}}>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '27vh',alignItems: 'left', marginTop: '-1vh'}}>
          <CPUusage starttime={starttime} endtime={endtime}/>
        </Box>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '27vh',alignItems: 'left', marginTop: '-1vh'}}>
          <MemoryUsage starttime={starttime} endtime={endtime} />
        </Box>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '27vh',alignItems: 'left', marginTop: '-1vh'}}>
          <MemoryUsageRatio starttime={starttime} endtime={endtime} />
        </Box>
      </Box>
    </div>
  );
}

export default OsMenu;