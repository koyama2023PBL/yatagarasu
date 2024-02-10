import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import SvgExploreComponentRoot from '../../SVGs/ReactComponent/Components/ExploreComponentRoot';
import SvgExploreOverviewRoot from '../../SVGs/ReactComponent/Overview/ExploreOverviewRoot';
import Business from '@mui/icons-material/Business';



const WelcomeOverview: React.FC = () => {
  
  return (
    <Card sx={{ height: '25vh' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            4. PostgreSQLアーキテクチャ全体概要
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: '1.5', marginTop: '1vh', marginLeft: '2vw'}}>
          <Box sx={{  display: 'left' }}>
            <Business style={{ width: '50%', height: 'auto' }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '-4vw', marginTop: '3vh'}}>
            <Typography variant="body1" >
              PostgreSQL全体のアーキテクチャ概要図を示します。
            </Typography>
            <Typography variant="body1" >
              PostgreSQLを用いたシステムの新規構築・更改・機能改善など、
            </Typography>
            <Typography variant="body1" >
              アーキテクチャレベルでの検討を行う際の構成検討を行う際に
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

export default WelcomeOverview;


