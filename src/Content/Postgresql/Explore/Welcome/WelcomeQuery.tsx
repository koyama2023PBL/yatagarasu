import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, CircularProgress, IconButton, Popover, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from 'react';
import { useTheme } from '@mui/system';
import SvgExploreQueryRoot from '../../SVGs/ReactComponent/Queries/ExploreQueryRoot';



const WelcomeQuery: React.FC = () => {

  
  return (
  <Card sx={{ height: '25vh' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
          1. SQLクエリ
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: '1.5', marginTop: '1vh', marginLeft: '2vw'}}>
        <Box sx={{  display: 'left' }}>
          <SvgExploreQueryRoot style={{ width: '100%', height: 'auto' }} />
        </Box>
        <Typography variant="body2" sx={{ marginLeft: '14pt', marginBottom: '4px' }}>
          PostgreSQLへ入力されたSQLがどのような順序で実行されていくのかを示します。
        </Typography>
      </Box>
    </CardContent>
  </Card>

  );
}

export default WelcomeQuery;


