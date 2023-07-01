import React, { useEffect, useState } from 'react';
import instance from '../../axios/axiosInstance';
import { getDate, padZero} from '../Common/Util';
import { Card, CardContent, Typography } from '@mui/material';

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
    //cacheHitRateData ? `${cacheHitRateData.hitRate * 100}%` : 'Loading...'
    <Card>
      <CardContent>
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