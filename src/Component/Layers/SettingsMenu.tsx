import * as React from 'react';
import Box from '@mui/material/Box';

import { useSyncQueryString } from '../Common/DateUpdate';
import { BreadcrumbsBar } from '../Common/BreadcrumbsBar';
import SettingsInfo from "../../Content/Settings/SettingsInfo";

const SettingsMenu: React.FC = () => {

  useSyncQueryString();

  return (
    <div>
      <Box sx={{ p: 1, flexDirection: 'column', height: '8vh', alignItems: 'center', marginTop: '-1vh'}}>
        <BreadcrumbsBar/>
      </Box>
      <Box sx={{ p: 1, flexDirection: 'column', height: '8vh', alignItems: 'center', marginTop: '-1vh'}}>
        <SettingsInfo/>
      </Box>
    </div>
  );
}

export default SettingsMenu;
