import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CircularProgress, IconButton, Popover, Typography } from "@mui/material";
import instance from '../../Axios/AxiosInstance';
import { getDate } from "../../Component/Common/Util";

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { green, yellow, red } from '@mui/material/colors';

interface ErrorLogDisplayProps {
  starttime: Date;
  endtime: Date;
}

interface ErrorLogApiResponse {
  starttime: string;
  endtime: string;
  erroLogList: ErrorLog[];
}

interface ErrorLog {
  timestamp: Date;
  logMessage: string;
}

const ErrorLogDisplay: React.FC<ErrorLogDisplayProps> = ({ starttime, endtime }) => {
  const [errorLogs, setErrorLogs] = useState<ErrorLog[] | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)};
  const handlePopoverClose = () => {setAnchorEl(null)};
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchErrorLogs = async () => {
      const startTimeString = getDate(starttime);
      const endTimeString = getDate(endtime);

      try {
        const response = await instance.get<ErrorLogApiResponse>(
          `/error-log?starttime=${startTimeString}&endtime=${endTimeString}`
        );
        setErrorLogs(response.data.erroLogList);
        setStatusCode(response.status);
      } catch (err) {
        console.log("err:", err);
        setErrorLogs([]);
      }
    };

    fetchErrorLogs();
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
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: '-5px'}}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            PostgresSQL Error Log
          </Typography>
          {statusCode && React.createElement(getIcon(), { style: { color: getIconColor() } })}
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
              PostgreSQLから出力されたエラーログを表示します。
            </Typography>
          </Popover>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', width: '100%', height: '2.5vh'}}></Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', height: '100%', width: '100%', marginLeft: '1vw'}}>
        {errorLogs === null ? (
          <CircularProgress />
        ) : errorLogs.length > 0 ? (
          // ここにエラーログに基づいて表示したい内容を追加
          // 例:
          <Typography variant="body1">
            エラーログが見つかりました。
          </Typography>
        ) : (
          <Typography variant="body1" color="textSecondary">
            エラーログはありません。
          </Typography>
        )}
      </Box>
      </CardContent>
    </Card>
  );
};

export default ErrorLogDisplay;
