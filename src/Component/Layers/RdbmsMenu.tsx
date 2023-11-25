import * as React from 'react';
import Box from '@mui/material/Box';

import CacheHitRate from '../../Content/Postgresql/CacheHitRate';
import PostgresProcessStatus from '../../Content/Postgresql/ProcessCheck';

import { RootState } from '../Redux/StateStore';
import { useSelector } from 'react-redux';
import DeadTuple from '../../Content/Postgresql/DeadTuple';
import PostgresMemoryUsageRatio from '../../Content/Postgresql/PostgresMemoryUsageRatio';
import DeadTupleRatio from '../../Content/Postgresql/DeadTupleRatio';
import PostgresMemoryUsage from '../../Content/Postgresql/PostgresMemoryUsage';
import ErrorLogDisplay from '../../Content/Postgresql/ErrorLog';
import { useSyncQueryString } from '../Common/DateUpdate';


const RdbmsMenu: React.FC = () => {

  useSyncQueryString();

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