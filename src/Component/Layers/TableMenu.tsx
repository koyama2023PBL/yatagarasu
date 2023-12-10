import * as React from 'react';
import Box from '@mui/material/Box';

import SlowQuery from '../../Content/Postgresql/SlowQuery';
import AverageQueryTime from '../../Content/Postgresql/AvgQueryTime';

import { useSelector } from 'react-redux';
import { RootState } from '../Redux/StateStore';
import DeadLocks from '../../Content/Postgresql/DeadLock';
import QueryCounts from '../../Content/Postgresql/QueryCounts';
import { useSyncQueryString } from '../Common/DateUpdate';
import { BreadcrumbsBar } from '../Common/BreadcrumbsBar';
import {HighLoadSQL} from "../../Content/Postgresql/HighLoadSQL";


const TableMenu: React.FC = () => {

  useSyncQueryString();

  const { from, to } = useSelector((state: RootState) => state.date);

  const starttime = new Date(from);
  const endtime = new Date(to);
  const querytime = 0.1

  return (
    <div>
      <Box sx={{ p: 1, flexDirection: 'column', height: '7vh', alignItems: 'center', marginTop: '-1vh'}}>
        <BreadcrumbsBar/>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '95vw',marginRight: 'auto', marginLeft: 'auto'}}>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '27vh',alignItems: 'left', marginTop: '-1vh'}}>
          <SlowQuery starttime={starttime} endtime={endtime}/>
          <Box sx={{ width: '1.5vh'}}></Box>
          <HighLoadSQL starttime={starttime} endtime={endtime}/>
        </Box>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '27vh',alignItems: 'left', marginTop: '-1vh'}}>
          <DeadLocks starttime={starttime} endtime={endtime} />
          <Box sx={{ width: '1.5vh'}}></Box>
          <QueryCounts starttime={starttime} endtime={endtime} />
        </Box>
      </Box>
    </div>
  );
}

export default TableMenu;
