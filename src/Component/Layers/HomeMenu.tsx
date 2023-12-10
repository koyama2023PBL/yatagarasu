import * as React from 'react';
import Box from '@mui/material/Box';

import CPUusage from '../../Content/Postgresql/CPUusage';
import PostgresProcessStatus from '../../Content/Postgresql/ProcessCheck';

import { useSelector } from 'react-redux';
import { RootState } from '../Redux/StateStore';
import ArchitectureOverview from '../../Content/Postgresql/ArchitectureOverview';
import MemoryUsage from '../../Content/Postgresql/PostgresMemoryUsage';
import DeadTuple from '../../Content/Postgresql/DeadTuple';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { parse } from 'date-fns';
import { useEffect } from 'react';
import { useSyncQueryString } from '../Common/DateUpdate';
import { BreadcrumbsBar } from '../Common/BreadcrumbsBar';
import { Typography } from '@mui/material';

const HomeMenu: React.FC = () => {

  const { from, to } = useSelector((state: RootState) => state.date);
  const starttime = new Date(from);
  const endtime = new Date(to);

  return (
    <div>
      <Box sx={{ p: 1, flexDirection: 'column', height: '13vh', alignItems: 'center', marginTop: '-1vh'}}>
        <BreadcrumbsBar/>
      </Box>
      <Box sx={{ p: 1, flexDirection: 'column', height: '13vh', alignItems: 'center', marginTop: '-1vh'}}>
        <Typography variant="body2" align="right">
          © 2023 Advanced Institute of Industrial Technology, Koyama Lab. All rights reserved. Released under the MIT license.(仮)
        </Typography>
      </Box>
    </div>
  );
}

export default HomeMenu;
