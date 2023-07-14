import React, { useEffect, useState } from 'react';
import instance from '../axios/axiosInstance';
import { getDate, padZero} from '../component/Common/Util';
import { Card, CardContent, Typography } from '@mui/material';

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

export const fetchFromAPIwithRequest = async (endpoint: string, queryParameters: SlowQueryCountApiRequest) => {
  try {
      // Format the Date objects as strings
      const startTimeString = getDate(queryParameters.starttime);
      const endTimeString = getDate(queryParameters.endtime);

      // Add the query parameters to the URL
      const response = await instance.get<SlowQueryCountApiResponse>(
        `${endpoint}?starttime=${startTimeString}&endtime=${endTimeString}&querytime=${queryParameters.querytime}`
      );
      console.log("URL:", endpoint);
      console.log("Response:", response);
      return response.data;
  } catch (err) {
      console.log("err:", err);
      throw err;
  }
}

const SlowQueryCount: React.FC = () => {
  const [slowQueryCountData, setSlowQueryCountData] = useState<SlowQueryCountData | null>(null);

  useEffect(() => {
    const fetchSlowQueryCountData = async () => {
      const endpoint = '/database-explorer/api/visualization/slow-query-counts';

      const requestBody: SlowQueryCountApiRequest = {
        starttime: new Date('2023-05-07T18:00:00'),
        endtime: new Date('2023-05-07T18:10:00'),
        querytime: 0.1,
      };

      const response: SlowQueryCountApiResponse = await fetchFromAPIwithRequest(
        endpoint,
        requestBody
      );

      setSlowQueryCountData({
        startTime: response.starttime,
        endTime: response.endtime,
        queryTimeAtLeast: response.querytime,
        queryCount: response.count,
      });
    };

    fetchSlowQueryCountData();
  }, []);

  return (
    <Card>
      <CardContent>
        {slowQueryCountData ? (
          <>
            <Typography variant="h6" align="left">
              スロークエリ数: {slowQueryCountData.queryCount}
            </Typography>
            <Typography variant="body2" component="div" align="left">
              スロークエリ閾値: {slowQueryCountData.queryTimeAtLeast}s
            </Typography>
            <Typography variant="body2" align="left">
              測定時間: {slowQueryCountData.startTime} - {slowQueryCountData.endTime}
            </Typography>
            
          </>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </CardContent>
    </Card>

    );
};

export default SlowQueryCount;
