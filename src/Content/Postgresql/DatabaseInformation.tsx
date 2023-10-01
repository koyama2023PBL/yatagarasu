import { Box, Card, CardContent, CircularProgress, IconButton, Popover } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import instance from '../../Axios/AxiosInstance';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green, yellow, red } from '@mui/material/colors';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import React from 'react';

interface DbInfoApiResponse {
  version: string;
};

const fetchFromAPI = async (endpoint: string) => {
  try {

      const response = await instance.get(`${endpoint}`);

      return { status: response.status, data: response.data };

  } catch (err) {
      console.log("err:", err);
      throw err;
  }
}

const DatabaseInformation: React.FC = () => {
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)};
  const handlePopoverClose = () => {setAnchorEl(null)};
  const open = Boolean(anchorEl);
  const [response, setResponse] = useState<DbInfoApiResponse>({ version: '' });
  
  useEffect(() => {
    const fetchDbInformation = async () => {
      const endpoint = '/database-explorer/api/information/dbinfo';


      const { status, data: response }: {status: number, data: DbInfoApiResponse}  = await fetchFromAPI(
        endpoint
      );
      setStatusCode(status);
      setResponse(response);
    };

    fetchDbInformation();
  }, []);

  const getIcon = () => {
    if (statusCode === null) {
      return WarningIcon; 
    }

    if (statusCode >= 500) {
      return ErrorIcon;
    } else if (statusCode >= 400) {
      return WarningIcon;
    } else {
      return CheckCircleOutlineIcon;
    }
  }

  const getIconColor = () => {
    if (statusCode === null) {
      return; 
    }
  
    if (statusCode >= 500) {
      return red[500];
    } else if (statusCode >= 400) {
      return yellow[700];
    } else {
      return green[500];
    }
  }

  return (
    <Card sx={{ width: '60%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' , marginTop: '-5px'}}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Database Information
          </Typography>
          {response && React.createElement(getIcon(), { style: { color: getIconColor() } })}
          <IconButton onClick={handlePopoverOpen} size="small" style={{ marginLeft: '-3px', marginRight: '-1px' }}>
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
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
              DBの情報を表示します。
            </Typography>
          </Popover>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', width: '100%', height: '3.5vh'}}></Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', width: '100%', marginLeft: '1vw'}}>
          {response ? (
            <Typography variant="body2" sx={{ marginTop: '-1.5vh',fontWeight: 'bold' }}>
              {response.version}
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'left', width: '100%'}}>
              <CircularProgress sx={{marginTop: '3.5vh'}}/>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DatabaseInformation;