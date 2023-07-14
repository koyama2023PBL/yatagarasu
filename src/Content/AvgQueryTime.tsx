import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import instance from '../axios/axiosInstance';
import { getDate, padZero, DateTostring, roundToThreeDecimalPlaces} from '../component/Common/Util';
import { Card, CardContent, Typography } from '@mui/material';

/*
interface AverageQueryTimeApiResponse {
  starttime: string;
  endtime: string;
  kind: number;
  time: number;
}

interface AverageQueryTimeApiRequest {
  starttime: Date;
  endtime: Date;
  queryKind: number;
}
*/
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

const fetchFromAPIwithRequest = async (endpoint: string, queryParameters: AverageQueryTimeApiRequest) => {
  try {
    const startTimeString = getDate(queryParameters.starttime);
    const endTimeString = getDate(queryParameters.endtime);

    const response = await instance.get(
      `${endpoint}?starttime=${startTimeString}&endtime=${endTimeString}&kind=${queryParameters.queryKind}`
    );
    return response.data;
  } catch (err) {
    console.log("err:", err);
    throw err;
  }
};

const AverageQueryTime: React.FC = () => {
  const [avgQueryTimes, setAvgQueryTimes] = useState<{[key: string]: number | string | null}>({
    "startTime": null,
    "endTime": null,
    "SELECT": null,
    "INSERT": null,
    "UPDATE": null,
    "DELETE": null,
  });

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
        starttime: new Date("2023-05-07T18:00:00"),
        endtime: new Date("2023-05-07T18:10:00"),
        queryKind: 0,
      };

      // Format the Date objects as strings
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
        const response: AverageQueryTimeApiResponse = await fetchFromAPIwithRequest(endpoint, requestBody);
        newAvgQueryTimes[queryKind] = roundToThreeDecimalPlaces(response.time);
      }
      
      setAvgQueryTimes(newAvgQueryTimes);
    };

    fetchQueryTimes();
  }, []);

  return (
    <Card>
      <CardContent>
        {avgQueryTimes["SELECT"] !== null ? (
          <>
            <Typography variant="h6" component="div" align="left">
              平均クエリ時間（種別）
            </Typography>
            <Typography variant="body2" component="div" align="left">
              SELECT: {avgQueryTimes["SELECT"]} ms
            </Typography>
            <Typography variant="body2" component="div" align="left">
              INSERT: {avgQueryTimes["INSERT"]} ms
            </Typography>
            <Typography variant="body2" component="div" align="left">
              UPDATE: {avgQueryTimes["UPDATE"]} ms
            </Typography>
            <Typography variant="body2" component="div" align="left">
              DELETE: {avgQueryTimes["DELETE"]} ms
            </Typography>
            <Typography variant="body2" align="left">
            測定時間: {avgQueryTimes["startTime"]} - {avgQueryTimes["endTime"]}
            </Typography>
          </>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AverageQueryTime;