import * as React from 'react';
import Box from '@mui/material/Box';

import TerminalComponent from '../../Content/Terminal/Terminal';


const TerminalMenu: React.FC = () => {

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '95vw',marginRight: 'auto', marginLeft: 'auto'}}>
        <Box sx={{ p:1, display: 'flex', flexDirection: 'row', height: '50vh',alignItems: 'left', marginTop: '-1vh'}}>
          <TerminalComponent/>
        </Box>
      </Box>
    </div>
  );
}

export default TerminalMenu;