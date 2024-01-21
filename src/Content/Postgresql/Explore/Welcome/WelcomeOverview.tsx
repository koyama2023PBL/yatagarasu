import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import SvgExploreComponentRoot from '../../SVGs/ReactComponent/Components/ExploreComponentRoot';
import SvgExploreOverviewRoot from '../../SVGs/ReactComponent/Overview/ExploreOverviewRoot';



const WelcomeOverview: React.FC = () => {
  
  return (
    <Card sx={{ height: '40vh' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            4. PostgreSQLアーキテクチャ全体概要
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: '1.5', marginTop: '1vh', marginLeft: '2vw'}}>
          <Box sx={{  display: 'left' }}>
            <SvgExploreOverviewRoot style={{ width: '80%', height: 'auto' }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WelcomeOverview;


