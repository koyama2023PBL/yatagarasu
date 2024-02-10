import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const HomeMenu: React.FC = () => {
  return (
    <div>
      <Box sx={{ width: '100vw', marginLeft: 'auto', marginRight: 'auto', marginTop: '-1.2vh' }}>
        <img
          src="./images/Home.jpg"
          style={{
            width: '100%'
          }}
          alt="Home"
        />
      </Box>
    </div>
  );
}

export default HomeMenu;
