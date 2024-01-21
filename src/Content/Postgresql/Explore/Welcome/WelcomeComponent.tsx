import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import SvgExploreComponentRoot from '../../SVGs/ReactComponent/Components/ExploreComponentRoot';



const WelcomeComponent: React.FC = () => {
  
  return (
    <Card sx={{ height: '25vh' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            2. PostgreSQLコンポーネント
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: '1.5', marginTop: '1vh', marginLeft: '2vw'}}>
          <Box sx={{  display: 'left' }}>
            <SvgExploreComponentRoot style={{ width: '100%', height: 'auto' }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WelcomeComponent;


