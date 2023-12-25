import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, CircularProgress, IconButton, Popover, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from 'react';
import { useTheme } from '@mui/system';
import SvgExploreQueryRoot from '../../SVGs/ReactComponent/Queries/ExploreQueryRoot';
import SvgExploreComponentRoot from '../../SVGs/ReactComponent/Components/ExploreComponentRoot';
import SvgExploreQueryHome from '../../SVGs/ReactComponent/Queries/ExploreQueryHome';
import SvgExploreQueryAdvanceHome from '../../SVGs/ReactComponent/Queries/ExploreQueryAdvanceHome';



const QueryAdvanceHome: React.FC = () => {

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)};
  const handlePopoverClose = () => {setAnchorEl(null)};
  const open = Boolean(anchorEl);
  
  return (
    <Card sx={{ height: '25vh' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
          SQLクエリの処理フロー:Advance
        </Typography>
        <IconButton onClick={handlePopoverOpen} size="small" sx={{ marginLeft: '-3px', marginRight: '-1px' }}>
          <HelpOutlineIcon fontSize="small" />
        </IconButton>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 , alignItems: 'center'}} style={{ width: '600px', whiteSpace: 'pre-line' }}>
          <HelpOutlineIcon fontSize="small" sx={{ marginBottom: '-5px', marginLeft: '3px', marginRight: '3px'}}/>
          SQLクエリがどのように処理されるかについて、応用含めて説明します。
        </Typography>
      </Popover>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: '1.5', marginTop: '1vh', marginLeft: '2vw'}}>
        <Box sx={{  display: 'left' }}>
          <SvgExploreQueryAdvanceHome/>
        </Box>
      </Box>
    </CardContent>
  </Card>
  );
}

export default QueryAdvanceHome;


