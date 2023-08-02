import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CircularProgress, IconButton, Popover, Typography } from "@mui/material";
import instance from '../../Axios/AxiosInstance';
import { getDate, rgbToRgba } from "../../Component/Common/Util";


import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { green, yellow, red } from '@mui/material/colors';

interface PostgresProcessApiRequest {
  startTime: Date;
  endTime: Date;
}

interface PostgresProcessApiResponse {
  starttime: string;
  endtime: string;
  masterProcess: boolean;
  walWriter: boolean;
  writer: boolean;
  checkPointer: boolean;
  statisticsCollector: boolean;
  autoVacuumLauncher: boolean;
  autoVacuumWorker: boolean;
  backendProcess: boolean;
}

interface PostgresProcessCheckProps {
  starttime: Date;
  endtime: Date;
}

const fetchFromAPIwithRequest = async (
  endpoint: string,
  queryParameters: PostgresProcessApiRequest
) => {
  try {
    const startTimeString = getDate(queryParameters.startTime);
    const endTimeString = getDate(queryParameters.endTime);

    const response = await instance.get<PostgresProcessApiResponse>(
      `${endpoint}?starttime=${startTimeString}&endtime=${endTimeString}`
    );
    return { status: response.status, data: response.data };
  } catch (err) {
    console.log("err:", err);
    throw err;
  }
};

const PostgresProcessStatus: React.FC<PostgresProcessCheckProps> = ({ starttime, endtime }) => {
  const [postgresProcessStatus, setPostgresProcessStatus] = useState<PostgresProcessApiResponse | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)};
  const handlePopoverClose = () => {setAnchorEl(null)};
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchProcessStatus = async () => {
      const endpoint = "/database-explorer/api/visualization/processes";
      const requestBody: PostgresProcessApiRequest = {
        startTime: starttime,
        endTime: endtime,
      };

      const { status, data: response }: {status: number, data: PostgresProcessApiResponse} = await fetchFromAPIwithRequest(endpoint, requestBody);
      setStatusCode(status);
      setPostgresProcessStatus(response);
    };

    fetchProcessStatus();
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
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: '-5px'}}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Postgresプロセスチェック
          </Typography>
          {postgresProcessStatus && React.createElement(getIcon(), { style: { color: getIconColor() } })}
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
              主要なPostgresプロセスの状態を確認します。
            </Typography>
          </Popover>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', width: '100%' ,height: '2.5vh'}}></Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', height: '100%', width: '100%', marginLeft: '1vw'}}>
          {postgresProcessStatus ? (
            <>
              <Card sx={{  width: '20%', marginRight: '1vh'}}>
                <CardContent sx={{ alignItems: 'center'}}>
                  <Typography variant="body2" sx={{ display: 'flex',fontWeight: 'bold', marginTop: '-1vh' }}>
                    MasterProcess
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '0.5vw' }}>
                    {postgresProcessStatus.masterProcess ? <CheckCircleOutlineIcon style={{ color: green[500] }} /> : <WarningIcon style={{ color: red[500] }} />}
                    <Typography variant="body1" align="center" sx={{ marginLeft: '0.5vw' }}>
                      {postgresProcessStatus.masterProcess ? "Active" : "Inactive"}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ width: '70%' }}>
                <CardContent>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gridGap: '0.5rem', justifyContent: 'center', marginTop: '-1vh' }}>
                    {Object.keys(postgresProcessStatus).map((processName, index) => {
                      if (processName !== 'masterProcess' && processName !== 'starttime' && processName !== 'endtime') {
                        return (
                          <Box key={index}>
                            <Typography variant="body2" align="left" sx={{ fontWeight: 'bold' }}>
                              {processName}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {postgresProcessStatus[processName as keyof typeof postgresProcessStatus] ? <CheckCircleOutlineIcon sx={{marginLeft: '0.5vw'}} style={{ color: green[500] }} /> : <WarningIcon sx={{marginLeft: '0.5vw'}} style={{ color: yellow[700] }} />}
                              <Typography variant="body1" align="left" sx={{ marginLeft: '0.5vw' }}>
                                {postgresProcessStatus[processName as keyof typeof postgresProcessStatus] ? "Active" : "Inactive"}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </Box>
                </CardContent>
              </Card>
            </>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'left', width: '100%'}}>
              <CircularProgress sx={{ marginTop: '3.5vh', marginLeft: '-2vw'}}/>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostgresProcessStatus;
