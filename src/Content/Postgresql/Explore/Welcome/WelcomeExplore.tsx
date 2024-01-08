import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, CircularProgress, IconButton, Popover, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from 'react';
import { useTheme } from '@mui/system';
import { useSyncQueryString } from '../../../../Component/Common/DateUpdate';
import SvgExploreWelcome from '../../SVGs/ReactComponent/Welcome/ExploreWelcome';


const WelcomeExplore: React.FC = () => {
  
  return (
    <Card sx={{ height: '50vh' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
          ようこそ！
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', p: '1.5', marginTop: '1vh', marginLeft: '2vw'}}>
        <Box sx={{  display: 'left' }}>
          <SvgExploreWelcome style={{ width: '80%', height: 'auto' }} />
        </Box>
        <Box sx={{  display: 'left' }}>
          <SvgExploreWelcome style={{ width: '80%', height: 'auto' }} />
        </Box>
      </Box>
    </CardContent>
  </Card>
  );
}

export default WelcomeExplore;


