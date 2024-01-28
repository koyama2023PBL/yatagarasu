import * as React from 'react';
import Box from '@mui/material/Box';

import { BreadcrumbsBar } from '../Common/BreadcrumbsBar';
import { Typography } from '@mui/material';

const HomeMenu: React.FC = () => {
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
