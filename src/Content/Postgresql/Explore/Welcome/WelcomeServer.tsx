import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, CircularProgress, IconButton, Popover, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from 'react';
import { useTheme } from '@mui/system';
import SvgExploreQueryRoot from '../../SVGs/ReactComponent/Queries/ExploreQueryRoot';
import SvgExploreServerRoot from '../../SVGs/ReactComponent/Server/ExploreServerRoot';



const WelcomeServer: React.FC = () => {
  
  return (
    <Card sx={{ height: '25vh' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
          3. サーバインフォメーション
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: '1.5', marginTop: '1vh', marginLeft: '2vw'}}>
        <Box sx={{  display: 'left' }}>
          <SvgExploreServerRoot style={{ width: '100%', height: 'auto' }} />
        </Box>
      </Box>
    </CardContent>
  </Card>
  );
}

export default WelcomeServer;


