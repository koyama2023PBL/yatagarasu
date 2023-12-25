import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import SvgExploreOverview from '../../SVGs/ReactComponent/Overview/ExploreOverview';



const OverviewHome: React.FC = () => {
  
  return (
    <Card sx={{ height: '80vh' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
          PostgreSQL全体概要図
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: '1.5', marginTop: '1vh', marginLeft: '2vw'}}>
        <Box sx={{  display: 'left' }}>
          <SvgExploreOverview style={{ width: '90%', height: 'auto' }}/>
        </Box>
      </Box>
    </CardContent>
  </Card>
  );
}

export default OverviewHome;


