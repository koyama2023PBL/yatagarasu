import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        position: 'fixed', 
        bottom: 0, 
        padding: 0.5,
        borderTop: '1px solid #ddd'
      }}
    >
      <Typography variant="body2" color="text.secondary" align="justify">
        © 2023 Advanced Institute of Industrial Technology, Koyama Lab. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;