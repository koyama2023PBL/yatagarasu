import React, { useEffect, useState } from 'react';
import instance from '../Axios/AxiosInstance';
import { getDate, padZero} from '../Component/Common/Util';
import { Card, CardContent, Typography, IconButton, Popover, Grid, Box, CircularProgress } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { green, yellow, red } from '@mui/material/colors';

interface CacheHitRateData {
  startTime: string;
  endTime: string;
  databaseName: string;
  hitRate: number;
}

interface CacheHitRateApiResponse {
  starttime: string;
  endtime: string;
  dbname: string;
  hitrate: number;
}

interface CacheHitRateApiRequest {
  starttime: Date;
  endtime: Date;
  dbname: string;
}

interface CacheHitRateProps {
  starttime: Date;
  endtime: Date;
}

const fetchFromAPIwithRequest = async (endpoint: string, queryParameters: CacheHitRateApiRequest) => {
  try {
      const startTimeString = getDate(queryParameters.starttime);
      const endTimeString = getDate(queryParameters.endtime);

      const response = await instance.get<CacheHitRateApiResponse>(
        `${endpoint}?starttime=${startTimeString}&endtime=${endTimeString}&dbname=${queryParameters.dbname}`
      );
      return { status: response.status, data: response.data };
  } catch (err) {
      console.log("err:", err);
      throw err;
  }
}

const CacheHitRate: React.FC<CacheHitRateProps> = ({ starttime, endtime }) => {
  const [cacheHitRateData, setCacheHitRateData] = useState<CacheHitRateData | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget);};
  const handlePopoverClose = () => {setAnchorEl(null);};
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchCacheHitRateData = async () => {
      const endpoint = '/database-explorer/api/visualization/hit-rate';

      const requestBody: CacheHitRateApiRequest = {
        starttime: starttime,
        endtime: endtime,
        dbname: 'databaseexplorer',
      };

      const { status, data: response }: {status: number, data: CacheHitRateApiResponse}  = await fetchFromAPIwithRequest(
        endpoint,
        requestBody
      );
      setStatusCode(status);

      setCacheHitRateData({
        startTime: response.starttime,
        endTime: response.endtime,
        databaseName: response.dbname,
        hitRate: response.hitrate,
      });
    };

    fetchCacheHitRateData();
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
            キャッシュヒット率
          </Typography>
          {cacheHitRateData && React.createElement(getIcon(), { style: { color: getIconColor() } })}
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
              pg_stat_databaseから取得したキャッシュヒット率です。キャッシュヒット率が低いとクエリの実行にかかる時間が長くなり、パフォーマンスの低下に繋がります。この値を下げる要因には以下のようなものがあります。
              <ul>
                <li>メモリ不足</li>
                <li>不適切なクエリ</li>
                <li>不適切なインデックス設定</li>
                <li>VACUUM不足</li>
              </ul>
            </Typography>
          </Popover>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', width: '100%', height: '3.5vh'}}></Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left', width: '100%', marginLeft: '1vw'}}>
          {cacheHitRateData ? (
            <>
              <Card sx={{ width: '30%', marginRight: '1vw'}}>
                <CardContent>
                  <Typography variant="body2" align="left" sx={{ fontWeight: 'bold' , marginTop: '-1vh'}}>
                    データベース名
                  </Typography>
                  <Box sx={{justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '1.5vh' }}>
                    <Typography variant="h5" component="div" align="center" sx={{ display: 'inline' }}>
                      {cacheHitRateData.databaseName}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ width: '60%'}}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' , marginTop: '-1vh'}}>
                    <Typography variant="body2" align="left" sx={{ fontWeight: 'bold' }}>
                      キャッシュヒット率
                    </Typography>
                    <Box sx={{width: '100%' ,height: '0.5vh'}}></Box>
                    <Box sx={{justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '1vh' }}>
                      <Typography variant="h5" component="div" align="center" sx={{ display: 'inline' }}>
                        {cacheHitRateData.hitRate === -1 ? "-" : `${cacheHitRateData.hitRate * 100}%`}
                      </Typography>
                    </Box>
                    <Typography variant="body2" component="div" align="right" sx={{ marginTop: '1vh', marginBottom: '-1.3vh'}}>
                        測定時間: {cacheHitRateData.startTime} - {cacheHitRateData.endTime}
                    </Typography>
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

export default CacheHitRate;