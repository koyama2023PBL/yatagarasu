import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import Polyline from '@mui/icons-material/Polyline';
import SvgExploreComponentRoot from '../../SVGs/ReactComponent/Components/ExploreComponentRoot';



const WelcomeComponent: React.FC = () => {
  
  return (
    <Card sx={{ height: '25vh' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            2. PostgreSQLコンポーネント ※準備中
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: '1.5', marginTop: '1vh', marginLeft: '2vw'}}>
          <Box sx={{  display: 'left' }}>
            <Polyline style={{ width: '50%', height: 'auto', color: '#bf360c' }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '-4vw', marginTop: '4vh'}}>
            <Typography variant="body1" >
              PostgreSQL本体のコンポーネント・プロセスの詳細と稼働状況を示します。
            </Typography>
            <Typography variant="body1" >
              Checkモードにて「パフォーマンス」「死活監視」に懸念が見つかった場合には、
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

export default WelcomeComponent;


