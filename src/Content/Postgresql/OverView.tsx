import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, CircularProgress, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { green, yellow, red } from '@mui/material/colors';
import { getDate } from '../../Component/Common/Util';
import instance from '../../Axios/AxiosInstance';
import { useEffect, useState } from 'react';

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
  const [queryStatus, setQueryStatus] = useState<string>("");
  const [rdbmsStatus, setRdbmsStatus] = useState<string>("");

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

      setQueryStatus(response.deadlocks === -1 ? "OK" : "ERROR");
      console.log(response.deadlocks);
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

      const { status, data: response }: {status: number, data: PostgresProcessApiResponse} = await fetchFromProcessCheckAPIwithRequest(endpoint, requestBody);
      setStatusCode(status);
      response.masterProcess === true ? setRdbmsStatus("OK") : setRdbmsStatus("ERROR");
    };

    fetchProcessStatus();
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
        OverView
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: '1.5', marginTop: '1vh',marginLeft: '2vw' }}>
        <Card sx={{backgroundColor: dbStatusCode === "OK" ? '#e8f5e9' : dbStatusCode === "STABLE" ? '#fffde7' : dbStatusCode === "ERROR" ? '#ffebee' : ''}}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '3vh' }}>
              <Typography variant="h6">
                DBサーバの稼働状態 : 
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
                RDBMSの稼働状態 :   
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
        <Card sx={{backgroundColor: queryStatus === "OK" ? '#e8f5e9' : queryStatus === "STABLE" ? '#fffde7' : queryStatus === "ERROR" ? '#ffebee' : ''}}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '3vh' }}>
              <Typography variant="h6">
                クエリの処理状態 : 
              </Typography>
              {queryStatus === "OK" ? 
                <CheckCircleIcon style={{ color: green[500] }} /> 
                : queryStatus === "STABLE" ? 
                <WarningIcon style={{ color: yellow[700] }} /> 
                : queryStatus === "ERROR" ? 
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
