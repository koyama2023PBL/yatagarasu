import React, { useEffect, useState } from 'react';
import instance from '../../Axios/AxiosInstance';
import { getDate } from '../../Component/Common/Util';
import { Box, Card, CardContent, CircularProgress, IconButton, Popover, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { green, yellow, red } from '@mui/material/colors';

interface SlowQueryCountData {
  startTime: string;
  endTime: string;
  queryTimeAtLeast: number;
  queryCount: number;
}

interface SlowQueryCountApiResponse {
  starttime: string;
  endtime: string;
  querytime: number;
  count: number;
}

interface SlowQueryCountApiRequest {
  starttime: Date;
  endtime: Date;
  querytime: number;
}

interface SlowQueryCountProps {
  starttime: Date;
  endtime: Date;
  querytime: number;
}

export const fetchFromAPIwithRequest = async (endpoint: string, queryParameters: SlowQueryCountApiRequest) => {
  try {
      const startTimeString = getDate(queryParameters.starttime);
      const endTimeString = getDate(queryParameters.endtime);

      const response = await instance.get<SlowQueryCountApiResponse>(`${endpoint}?starttime=${startTimeString}&endtime=${endTimeString}&querytime=${queryParameters.querytime}`);
      
      return { status: response.status, data: response.data };

  } catch (err) {
      console.log("err:", err);
      throw err;
  }
}

const SlowQueryCount: React.FC<SlowQueryCountProps> = ({starttime, endtime, querytime}) => {
  const [slowQueryCountData, setSlowQueryCountData] = useState<SlowQueryCountData | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)};
  const handlePopoverClose = () => {setAnchorEl(null)};
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchSlowQueryCountData = async () => {
      const endpoint = '/database-explorer/api/visualization/slow-query-counts';

      const requestBody: SlowQueryCountApiRequest = {
        starttime: new Date(starttime),
        endtime: new Date(endtime),
        querytime: querytime,
      };

      const { status, data: response }: {status: number, data: SlowQueryCountApiResponse} = await fetchFromAPIwithRequest(endpoint, requestBody);
      setStatusCode(status);

      setSlowQueryCountData({
        startTime: response.starttime,
        endTime: response.endtime,
        queryTimeAtLeast: response.querytime,
        queryCount: response.count,
      });
    };

    fetchSlowQueryCountData();
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
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: '-5px' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Slow Query Count
          </Typography>
          {slowQueryCountData && React.createElement(getIcon(), { style: { color: getIconColor() } })}
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
              対象期間のスロークエリ数とその閾値を表示します。
            </Typography>
          </Popover>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', width: '100%' ,height: '3.5vh'}}></Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', width: '100%' ,marginLeft: '1vw'}}>
          {slowQueryCountData ? (
            <>
              <Card sx={{ width: '30%' , marginRight: '1vw'}}>
                <CardContent>
                  <Typography variant="body2" align="left" sx={{ fontWeight: 'bold', marginTop: '-1vh' }}>
                    Threshold
                  </Typography>
                  <Box sx={{width: '100%' ,height: '0.5vh'}}></Box>
                  <Box sx={{justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '1vh' }}>
                    <Typography variant="h5" component="div" align="center" sx={{ display: 'inline' }}>
                      {slowQueryCountData.queryTimeAtLeast}
                    </Typography>
                  </Box>
                  <Typography variant="h6" component="div" align="right" sx={{ marginTop: '-1vh',marginBottom: '-1vw'}}>
                      {"   "}s
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ width: '60%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', marginTop: '-1vh' }}>
                    <Typography variant="body2" align="left" sx={{ fontWeight: 'bold' }}>
                      Slow Query Count
                    </Typography>
                    <Box sx={{width: '100%' ,height: '0.5vh'}}></Box>
                    <Box sx={{justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '1vh' }}>
                      <Typography variant="h5" component="div" align="center" sx={{ display: 'inline' }}>
                        {slowQueryCountData.queryCount === -1 ? '0' : slowQueryCountData.queryCount}
                      </Typography>
                    </Box>
                    <Typography variant="body2" component="div" align="right" sx={{ marginTop: '1vh', marginBottom: '-1.3vh'}}>
                      Time: {slowQueryCountData.startTime} - {slowQueryCountData.endTime}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'left', width: '100%' }}>
              <CircularProgress sx={{marginTop: '3.5vh', marginLeft: '-2vw'}}/>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>

    );
};

export default SlowQueryCount;
