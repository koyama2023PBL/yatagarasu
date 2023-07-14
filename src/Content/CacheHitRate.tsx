import React, { useEffect, useState } from 'react';
import instance from '../axios/axiosInstance';
import { getDate, padZero} from '../component/Common/Util';
import { Card, CardContent, Typography, IconButton, Popover, Grid } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

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

export const fetchFromAPIwithRequest = async (endpoint: string, queryParameters: CacheHitRateApiRequest) => {
  try {
      // Format the Date objects as strings
      const startTimeString = getDate(queryParameters.starttime);
      const endTimeString = getDate(queryParameters.endtime);

      // Add the query parameters to the URL
      const response = await instance.get<CacheHitRateApiResponse>(
        `${endpoint}?starttime=${startTimeString}&endtime=${endTimeString}&dbname=${queryParameters.dbname}`
      );
      console.log("URL:", endpoint);
      console.log("Response:", response);
      return response.data;
  } catch (err) {
      console.log("err:", err);
      throw err;
  }
}

const CacheHitRate: React.FC = () => {
  const [cacheHitRateData, setCacheHitRateData] = useState<CacheHitRateData | null>(null);

  // Popoverに必要なstateと関数を定義
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchCacheHitRateData = async () => {
      const endpoint = '/database-explorer/api/visualization/hit-rate';

      const requestBody: CacheHitRateApiRequest = {
        starttime: new Date('2023-05-07T18:00:00'),
        endtime: new Date('2023-05-07T18:10:00'),
        dbname: 'databaseexplorer',
      };

      const response: CacheHitRateApiResponse = await fetchFromAPIwithRequest(
        endpoint,
        requestBody
      );

      setCacheHitRateData({
        startTime: response.starttime,
        endTime: response.endtime,
        databaseName: response.dbname,
        hitRate: response.hitrate,
      });
    };

    fetchCacheHitRateData();
  }, []);

  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '-30px',marginBottom: '-20px' }}>
          <h4>キャッシュヒット率</h4>
          <IconButton onClick={handlePopoverOpen} size="small" style={{ marginLeft: '0px' }}>
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }} style={{ width: '600px', whiteSpace: 'pre-line' }}>
              pg_stat_databaseから取得したキャッシュヒット率です。
              キャッシュヒット率が低いとクエリの実行にかかる時間が長くなり、パフォーマンスの低下に繋がります。
              この値を下げる要因には以下のようなものがあります。
              <ul>
                <li>メモリ不足</li>
                <li>不適切なクエリ</li>
                <li>不適切なインデックス設定</li>
                <li>VACUUM不足</li>
              </ul>
            </Typography>
          </Popover>
        </div>
        {cacheHitRateData ? (
          <>
            <Typography variant="h6" component="div" align="left">
              データベース名: {cacheHitRateData.databaseName}
            </Typography>
            <Typography variant="h6" align="left">
              キャッシュヒット率: {cacheHitRateData.hitRate === -1 ? "(データが存在しません)" : `${cacheHitRateData.hitRate * 100}%`}
            </Typography>
            <Typography variant="body2" align="left">
              測定時間: {cacheHitRateData.startTime} - {cacheHitRateData.endTime}
            </Typography>
            
          </>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CacheHitRate;