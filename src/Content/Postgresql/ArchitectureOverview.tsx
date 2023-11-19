import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, CircularProgress, IconButton, Popover, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import OpenInNew from '@mui/icons-material/OpenInNew';
import { green, yellow, red } from '@mui/material/colors';
import { DateTostring, getDate, roundToThreeDecimalPlaces } from '../../Component/Common/Util';
import instance from '../../Axios/AxiosInstance';
import { useEffect, useState } from 'react';
import { Thresholds } from '../../Component/Threshold/Threshold';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../Component/Redux/MenuState'; 
import { useTheme } from '@mui/system';
import {useMediaQuery} from '@mui/material';
import SvgPostgresOverviewLight from './SVGs/PostgresOverviewLight';

interface ArchitectureOverviewProps {
  starttime: Date;
  endtime: Date;
}

const ArchitectureOverview: React.FC<ArchitectureOverviewProps> = ({ starttime, endtime }) => {

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)};
  const handlePopoverClose = () => {setAnchorEl(null)};
  const open = Boolean(anchorEl);
  
  return (
    <Card sx={{ height: '61vh' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
          Architecture Overview
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
          全体概況を表示しています。
        </Typography>
      </Popover>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: '1.5', marginTop: '1vh', marginLeft: '2vw'}}>
        <Box sx={{ width: '70%', height: '70%', mr: 2, mb: 2 }}>
          <SvgPostgresOverviewLight highlight="masterProcess" style={{ width: '100%', height: 'auto' }} />
        </Box>
      </Box>
    </CardContent>
  </Card>
  );
}

export default ArchitectureOverview;


