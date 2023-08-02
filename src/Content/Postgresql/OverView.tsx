import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, CircularProgress, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { green, yellow, red } from '@mui/material/colors';
import { DateTostring, getDate, roundToThreeDecimalPlaces } from '../../Component/Common/Util';
import instance from '../../Axios/AxiosInstance';
import { useEffect, useState } from 'react';
import { Thresholds } from '../../Component/Threshold/Threshold';

interface OverViewProps {
  starttime: Date;
  endtime: Date;
}


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
};

interface DeadLockApiRequest {
  starttime: Date;
  endtime: Date;
  dbname: string;
};

const fetchFromDeadLockAPIwithRequest = async (endpoint: string, queryParameters: DeadLockApiRequest) => {
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

const fetchFromProcessCheckAPIwithRequest = async (
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

export const fetchFromSlowQueryCountAPIwithRequest = async (endpoint: string, queryParameters: SlowQueryCountApiRequest) => {
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

const fetchFromAvarageQueryTimeAPIwithRequest = async (endpoint: string, queryParameters: AverageQueryTimeApiRequest) => {
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

const fetchFromAPI = async (endpoint: string) => {
  try {
      const response = await instance.get(`${endpoint}`);
      return { status: response.status, data: response.data };
  } catch (err) {
      console.log("err:", err);
      throw err;
  }
}


const OverView: React.FC<OverViewProps> = ({ starttime, endtime }) => {
  const [deadLocksData, setDeadLocksData] = useState<DeadLocksData | null>(null);
  const [postgresProcessStatus, setPostgresProcessStatus] = useState<PostgresProcessApiResponse | null>(null);
  const [dbStatusCode, setDbStatusCode] = useState<string | null>("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [deadlockStatus, setDeadlockStatus] = useState<string>("");
  const [slowQueryStatus, setSlowQueryStatus] = useState<string>("");
  const [averageTimeStatus, setAverageTimeStatus] = useState<string>("");
  const [rdbmsStatus, setRdbmsStatus] = useState<string>("");

  const [avgQueryTimes, setAvgQueryTimes] = useState<{[key: string]: number | string | null}>({
    "startTime": null,
    "endTime": null,
    "SELECT": null,
    "INSERT": null,
    "UPDATE": null,
    "DELETE": null,
  });

  useEffect(() => {
    const fetchDeadLocksData = async () => {
      const endpoint = '/database-explorer/api/visualization/dead-lock';

      const requestBody: DeadLockApiRequest = {
        starttime: starttime,
        endtime: endtime,
        dbname: 'databaseexplorer',
      };

      const { status, data: response }: {status: number, data: DeadLockApiResponse}  = await fetchFromDeadLockAPIwithRequest(
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

      setDeadlockStatus(response.deadlocks < Thresholds.deadlocks.watch ? "OK" : "ERROR");
    };

    fetchDeadLocksData();
  }, []);

  useEffect(() => {
    const fetchProcessStatus = async () => {
      const endpoint = "/database-explorer/api/visualization/processes";
      const requestBody: PostgresProcessApiRequest = {
        startTime: starttime,
        endTime: endtime,
      };

      const { data: response }: {status: number, data: PostgresProcessApiResponse} = await fetchFromProcessCheckAPIwithRequest(endpoint, requestBody);
      response.masterProcess === true ? setRdbmsStatus("OK") : setRdbmsStatus("ERROR");
    };

    fetchProcessStatus();
  }, []);

  useEffect(() => {
    const fetchSlowQueryCountData = async () => {
      const endpoint = '/database-explorer/api/visualization/slow-query-counts';

      const requestBody: SlowQueryCountApiRequest = {
        starttime: new Date(starttime),
        endtime: new Date(endtime),
        querytime: Thresholds.queryruntime.ok,
      };

      const { data: response }: {status: number, data: SlowQueryCountApiResponse} = await fetchFromSlowQueryCountAPIwithRequest(endpoint, requestBody);
      response.count < Thresholds.querycounts.watch ? setSlowQueryStatus("OK") : setSlowQueryStatus("ERROR");
    };

    fetchSlowQueryCountData();
  }, []);

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
        const { status, data: response }: {status: number, data: AverageQueryTimeApiResponse} = await fetchFromAvarageQueryTimeAPIwithRequest(endpoint, requestBody);
        setStatusCode(status);
        newAvgQueryTimes[queryKind] = roundToThreeDecimalPlaces(response.time);
      }
      
      setAvgQueryTimes(newAvgQueryTimes);

      const keysToCheck = ["SELECT", "INSERT", "UPDATE", "DELETE"];
      for (const key of keysToCheck) {
        const value = avgQueryTimes[key];
        if (value !== null && typeof value === 'number' && value > Thresholds.queryruntime.ok * 0.8) {
          setAverageTimeStatus("ERROR");
          return;
        }
      }
      setAverageTimeStatus("OK");

    };

    fetchQueryTimes();
  }, []);

  useEffect(() => {
    const fetchDbStatus = async () => {
      const endpoint = "/database-explorer/api/information/dbhealthcheck";
      const { status }: {status: number} = await fetchFromAPI(endpoint);
      status === 200 ? setDbStatusCode("OK") : setDbStatusCode("ERROR");
    };

    fetchDbStatus();
  }, []);

  return (
  <Card sx={{ height: '16vh'}}>
    <CardContent>
      <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
        Status Overview
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: '1.5', marginTop: '1vh',marginLeft: '2vw' }}>
        <Card sx={{backgroundColor: dbStatusCode === "OK" ? '#e8f5e9' : dbStatusCode === "STABLE" ? '#fffde7' : dbStatusCode === "ERROR" ? '#ffebee' : ''}}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '3vh' }}>
              <Typography variant="h6">
                DB-Server:
              </Typography>
              {dbStatusCode === "OK" ? 
                <CheckCircleIcon style={{ color: green[500] }} /> 
                : dbStatusCode === "STABLE" ? 
                <WarningIcon style={{ color: yellow[700] }} /> 
                : dbStatusCode === "ERROR" ? 
                <ErrorIcon style={{ color: red[500] }} />
                :
                <CircularProgress/>
              }
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ width: '1.5vh'}}></Box>
        <Card sx={{backgroundColor: rdbmsStatus === "OK" ? '#e8f5e9' : rdbmsStatus === "STABLE" ? '#fffde7' : rdbmsStatus === "ERROR" ? '#ffebee' : ''}}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '3vh' }}>
              <Typography variant="h6">
                RDBMS:   
              </Typography>
              {rdbmsStatus === "OK" ? 
                <CheckCircleIcon style={{ color: green[500] }} /> 
                : rdbmsStatus === "STABLE" ? 
                <WarningIcon style={{ color: yellow[700] }} /> 
                : rdbmsStatus === "ERROR" ? 
                <ErrorIcon style={{ color: red[500] }} />
                :
                <CircularProgress/>
              }
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ width: '1.5vh'}}></Box>
        <Card sx={{backgroundColor: deadlockStatus === "OK" ? '#e8f5e9' : deadlockStatus === "STABLE" ? '#fffde7' : deadlockStatus === "ERROR" ? '#ffebee' : ''}}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '3vh' }}>
              <Typography variant="h6">
                Deadlocks: 
              </Typography>
              {deadlockStatus === "OK" ? 
                <CheckCircleIcon style={{ color: green[500] }} /> 
                : deadlockStatus === "STABLE" ? 
                <WarningIcon style={{ color: yellow[700] }} /> 
                : deadlockStatus === "ERROR" ? 
                <ErrorIcon style={{ color: red[500] }} />
                :
                <CircularProgress/>
              }
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ width: '1.5vh'}}></Box>
        <Card sx={{backgroundColor: slowQueryStatus === "OK" ? '#e8f5e9' : slowQueryStatus === "STABLE" ? '#fffde7' : slowQueryStatus === "ERROR" ? '#ffebee' : ''}}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '3vh' }}>
              <Typography variant="h6">
                SlowQuery: 
              </Typography>
              {slowQueryStatus === "OK" ? 
                <CheckCircleIcon style={{ color: green[500] }} /> 
                : slowQueryStatus === "STABLE" ? 
                <WarningIcon style={{ color: yellow[700] }} /> 
                : slowQueryStatus === "ERROR" ? 
                <ErrorIcon style={{ color: red[500] }} />
                :
                <CircularProgress/>
              }
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ width: '1.5vh'}}></Box>
        <Card sx={{backgroundColor: averageTimeStatus === "OK" ? '#e8f5e9' : averageTimeStatus === "STABLE" ? '#fffde7' : averageTimeStatus === "ERROR" ? '#ffebee' : ''}}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '3vh' }}>
              <Typography variant="h6">
                Avg-Time Query: 
              </Typography>
              {averageTimeStatus === "OK" ? 
                <CheckCircleIcon style={{ color: green[500] }} /> 
                : averageTimeStatus === "STABLE" ? 
                <WarningIcon style={{ color: yellow[700] }} /> 
                : averageTimeStatus === "ERROR" ? 
                <ErrorIcon style={{ color: red[500] }} />
                :
                <CircularProgress/>
              }
            </Box>
          </CardContent>
        </Card>
      </Box>
    </CardContent>
  </Card>
  );
}

export default OverView;
