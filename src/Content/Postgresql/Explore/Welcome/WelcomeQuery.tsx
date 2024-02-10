import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, CircularProgress, IconButton, Popover, Typography } from '@mui/material';
import Querystats from '@mui/icons-material/Querystats';
import { useState } from 'react';
import { useTheme } from '@mui/system';
import SvgExploreQueryRoot from '../../SVGs/ReactComponent/Queries/ExploreQueryRoot';



const WelcomeQuery: React.FC = () => {
  const theme = useTheme();

  
  return (
    <Card sx={{ height: '25vh' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            1. SQLクエリ
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row',  p: '1.5', marginTop: '1vh', marginLeft: '2vw'}}>
          <Box sx={{  display: 'left' }}>
            <Querystats sx={{ width: '50%', height: 'auto', color: theme.palette.primary.main }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '-4vw', marginTop: '2vh'}}>
            <Typography variant="body1" >
              リクエストされたSQLクエリがどのような順序で処理されるかを示します。
            </Typography>
            <Typography variant="body1" >
              Checkモードにて「クエリ」「パフォーマンス」に懸念が見つかった場合には、
            </Typography>
            <Typography variant="body1" >
              こちらでの詳細確認をお勧めします。
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>

  );
}

export default WelcomeQuery;


