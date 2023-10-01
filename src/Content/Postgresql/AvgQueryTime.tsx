import React, { useEffect, useState } from "react";

import instance from '../../Axios/AxiosInstance';
import { getDate, DateTostring, roundToThreeDecimalPlaces} from '../../Component/Common/Util';
import { Box, Card, CardContent, CircularProgress, IconButton, Popover, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { green, yellow, red } from '@mui/material/colors';

type AverageQueryTimeApiResponse = {
  starttime: string;
  endtime: string;
  kind: number;
  time: number;
};

type AverageQueryTimeApiRequest = {
  starttime: Date;
  endtime: Date;
  queryKind: number;
};

interface AvgQueryTimeProps {
  starttime: Date;
  endtime: Date;
}

const fetchFromAPIwithRequest = async (endpoint: string, queryParameters: AverageQueryTimeApiRequest) => {
  try {
    const startTimeString = getDate(queryParameters.starttime);
    const endTimeString = getDate(queryParameters.endtime);

    const response = await instance.get(
      `${endpoint}?starttime=${startTimeString}&endtime=${endTimeString}&kind=${queryParameters.queryKind}`
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    console.log("err:", err);
    throw err;
  }
};

const AverageQueryTime: React.FC<AvgQueryTimeProps> = ({ starttime, endtime }) => {
  const [avgQueryTimes, setAvgQueryTimes] = useState<{[key: string]: number | string | null}>({
    "startTime": null,
    "endTime": null,
    "SELECT": null,
    "INSERT": null,
    "UPDATE": null,
    "DELETE": null,
  });

  const [statusCode, setStatusCode] = useState<number | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget);};
  const handlePopoverClose = () => {setAnchorEl(null);};
  const open = Boolean(anchorEl);

  useEffect(() => {
    
    const fetchQueryTimes = async () => {
      const newAvgQueryTimes: {[key: string]: number | string | null} = {
        "startTime": null,
        "endTime": null,
        "SELECT": null,
        "INSERT": null,
        "UPDATE": null,
        "DELETE": null,
      };

      const endpoint = "/database-explorer/api/visualization/average-query-time";

      const requestBody: AverageQueryTimeApiRequest = {
        starttime: new Date(starttime),
        endtime: new Date(endtime),
        queryKind: 0,
      };

      const startTimeString = requestBody.starttime;
      const endTimeString = requestBody.endtime;

      newAvgQueryTimes["startTime"] = DateTostring(startTimeString);
      newAvgQueryTimes["endTime"] = DateTostring(endTimeString);

      const queryKinds = {
        "SELECT": 1,
        "INSERT": 2,
        "UPDATE": 3,
        "DELETE": 4
      };

      for (const queryKind in queryKinds as {[key: string]: number}) {
        requestBody.queryKind = queryKinds[queryKind as keyof typeof queryKinds];
        const { status, data: response }: {status: number, data: AverageQueryTimeApiResponse} = await fetchFromAPIwithRequest(endpoint, requestBody);
        setStatusCode(status);
        newAvgQueryTimes[queryKind] = roundToThreeDecimalPlaces(response.time);
      }
      
      setAvgQueryTimes(newAvgQueryTimes);
    };


    fetchQueryTimes();
  }, [starttime, endtime]);

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
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' , marginTop: '-5px'}}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Average Query Time
          </Typography>
          {avgQueryTimes && React.createElement(getIcon(), { style: { color: getIconColor() } })}
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
              各クエリの平均実行時間を表示します。
            </Typography>
          </Popover>
      </Box>
        {avgQueryTimes["SELECT"] !== null ? (
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' ,marginLeft: '1vw', marginTop: '0.5vh'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column',width: '50%', marginLeft: '1vw', marginRight: '1vw'}}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                    <Typography variant="body2" component="div" align="left" sx={{ fontWeight: 'bold', marginTop: '-0.7vh' }}>
                        SELECT: 
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                      <Typography variant="h5" component="div" align="center" sx={{ display: 'inline' }}>
                        {avgQueryTimes["SELECT"]=== -1 ? '-' : avgQueryTimes["SELECT"]}
                      </Typography>
                    </Box>
                    <Typography variant="body2" component="div" align="right" sx={{ marginTop: '-0.7vh',marginBottom: '-1vw'}}>
                      {"   "}ms
                    </Typography>
                </CardContent>
              </Card>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', width: '100%' ,height: '0.5vh'}}></Box>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                    <Typography variant="body2" component="div" align="left" sx={{ fontWeight: 'bold', marginTop: '-0.7vh' }}>
                        INSERT: 
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                      <Typography variant="h5" component="div" align="center" sx={{ display: 'inline' }}>
                          {avgQueryTimes["INSERT"]=== -1 ? '-' : avgQueryTimes["INSERT"]}
                      </Typography>
                    </Box>
                    <Typography variant="body2" component="div" align="right" sx={{ marginTop: '-0.7vh',marginBottom: '-1vw'}}>
                      {"   "}ms
                    </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column',width: '50%', marginLeft: '1vw', marginRight: '2vw'}}>
              <Card sx={{ width: '100%' }}>
                <CardContent>
                    <Typography variant="body2" component="div" align="left" sx={{ fontWeight: 'bold', marginTop: '-0.7vh' }}>
                        UPDATE: 
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                      <Typography variant="h5" component="div" align="center" sx={{ display: 'inline' }}>
                        {avgQueryTimes["UPDATE"]=== -1 ? '-' : avgQueryTimes["UPDATE"]}
                      </Typography>
                    </Box>
                    <Typography variant="body2" component="div" align="right" sx={{ marginTop: '-0.7vh',marginBottom: '-1vw'}}>
                      {"   "}ms
                    </Typography>
                </CardContent>
              </Card>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', width: '100%' ,height: '0.5vh'}}></Box>
              <Card sx={{ width: '100%' }}>
              <CardContent>
                  <Typography variant="body2" component="div" align="left" sx={{ fontWeight: 'bold', marginTop: '-0.7vh' }}>
                      DELETE: 
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Typography variant="h5" component="div" align="center" sx={{ display: 'inline' }}>
                      {avgQueryTimes["DELETE"]=== -1 ? '-' : avgQueryTimes["DELETE"]}
                    </Typography>
                  </Box>
                  <Typography variant="body2" component="div" align="right" sx={{ marginTop: '-0.7vh',marginBottom: '-1vw'}}>
                    {"   "}ms
                  </Typography>
              </CardContent>
            </Card>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'left', width: '100%'}}>
            <CircularProgress sx={{marginTop: '7vh'}}/>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AverageQueryTime;