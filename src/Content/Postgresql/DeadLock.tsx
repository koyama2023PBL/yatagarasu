import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  BarElement,
  Tooltip,
} from "chart.js";

import instance from '../../Axios/AxiosInstance';
import { getDate } from '../../Component/Common/Util';
import { Box, Card, CardContent, CircularProgress,IconButton,Popover,Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green, yellow, red } from '@mui/material/colors';
import annotationPlugin from 'chartjs-plugin-annotation';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

interface DeadLocksData {
  startTime: string;
  endTime: string;
  dbName: string;
  deadlocks: number;
}

interface DeadLockApiResponse {
  starttime: string;
  endtime: string;
  dbName: string;
  deadlocks: number;
}

interface DeadLockApiRequest {
  starttime: Date;
  endtime: Date;
  dbname: string;
}

interface DeadLocksProps {
  starttime: Date;
  endtime: Date;
}

const fetchFromAPIwithRequest = async (endpoint: string, queryParameters: DeadLockApiRequest) => {
  try {
      const startTimeString = getDate(queryParameters.starttime);
      const endTimeString = getDate(queryParameters.endtime);
      const dbName = queryParameters.dbname;

      const response = await instance.get(`${endpoint}?starttime=${startTimeString}&endtime=${endTimeString}&dbName=${dbName}`);

      return { status: response.status, data: response.data };

  } catch (err) {
      console.log("err:", err);
      throw err;
  }
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  annotationPlugin,
  Title,
  Legend
);

const DeadLocks: React.FC<DeadLocksProps> = ({ starttime, endtime }) => {
  const [deadLocksData, setDeadLocksData] = useState<DeadLocksData | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchDeadLocksData = async () => {
      const endpoint = '/database-explorer/api/visualization/dead-lock';

      const requestBody: DeadLockApiRequest = {
        starttime: starttime,
        endtime: endtime,
        dbname: 'databaseexplorer',
      };

      const { status, data: response }: {status: number, data: DeadLockApiResponse}  = await fetchFromAPIwithRequest(
        endpoint,
        requestBody
      );
      setStatusCode(status);

      setDeadLocksData({
        startTime: response.starttime,
        endTime: response.endtime,
        dbName: response.dbName,
        deadlocks: response.deadlocks,
      });
    };

    fetchDeadLocksData();
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
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' , marginTop: '-5px'}}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Deadlocks
          </Typography>
          {deadLocksData && React.createElement(getIcon(), { style: { color: getIconColor() } })}
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
              対象期間のデッドロック数を表示します。
            </Typography>
          </Popover>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', width: '100%', height: '3.5vh'}}></Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', width: '100%', marginLeft: '1vw'}}>
          {deadLocksData ? (
            <>
              <Card sx={{ width: '30%' , marginRight: '1vw'}}>
                <CardContent>
                  <Typography variant="body2" align="left" sx={{ fontWeight: 'bold' , marginTop: '-1vh'}}>
                    Database Name
                  </Typography>
                  <Box sx={{justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '1.5vh' }}>
                    <Typography variant="h5" component="div" align="center" sx={{ display: 'inline' }}>
                      {deadLocksData.dbName}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ width: '60%'}}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' , marginTop: '-1vh'}}>
                    <Typography variant="body2" align="left" sx={{ fontWeight: 'bold' }}>
                      Deadlocks Count
                    </Typography>
                    <Box sx={{width: '100%' ,height: '0.5vh'}}></Box>
                    <Box sx={{justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '1vh' }}>
                      <Typography variant="h5" component="div" align="center" sx={{ display: 'inline' }}>
                        {deadLocksData.deadlocks === -1 ? "0" : `${deadLocksData.deadlocks}`}
                      </Typography>
                      <Typography variant="body2" component="div" align="right" sx={{ marginTop: '1vh', marginBottom: '-1.3vh'}}>
                          Time: {deadLocksData.startTime} - {deadLocksData.endTime}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'left', width: '100%'}}>
              <CircularProgress sx={{marginTop: '3.5vh', marginLeft: '-2vw'}}/>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DeadLocks;
