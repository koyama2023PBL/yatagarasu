import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, CircularProgress, IconButton, Popover, Typography } from '@mui/material';
import Memory from '@mui/icons-material/Memory';
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
            3. サーバーインフォメーション
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: '1.5', marginTop: '1vh', marginLeft: '2vw'}}>
          <Box sx={{  display: 'left' }}>
            <Memory style={{ width: '50%', height: 'auto', color: '#004d40' }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '-4vw', marginTop: '2vh'}}>
            <Typography variant="body1" >
              PostgreSQLの稼働するサーバの稼働状況を示します。
            </Typography>
            <Typography variant="body1" >
              Checkモードにて「パフォーマンス」「ディスク」に懸念が見つかった場合には、
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

export default WelcomeServer;


