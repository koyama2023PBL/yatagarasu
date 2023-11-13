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
import {calcAverage, calcSum, getDate, roundToTwoDecimalPlaces, unixTimeToDate} from '../../Component/Common/Util';
import { Box, Card, CardContent, CircularProgress,IconButton,Popover,Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green, yellow, red } from '@mui/material/colors';
import annotationPlugin from 'chartjs-plugin-annotation';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import yatagarasuSettings from "../../Component/Redux/YatagarasuSettings";
import {CacheHitRateApiResponse} from "./CacheHitRate";
import {prometheusSettings} from "../../Component/Redux/PrometheusSettings";

interface DeadLocksApiRequest {
  start: Date;
  end: Date;
  datname: string;
}

interface DeadLocksProps {
  starttime: Date;
  endtime: Date;
}

interface DeadLocksApiResponse {
  data: DeadLocksApiResponseData;
  status: string;
};

export interface DeadLocksApiResponseData {
  resultType: string;
  result: DeadLocksApiResponseResult[];
}

interface DeadLocksApiResponseResult {
  metric: DeadLocksApiResponseMetric;
  values: [number, string][];
}

interface DeadLocksApiResponseMetric {
  __name__: string;
  datid: string;
  datname: string;
  instance: string;
  job: string;
}

interface DeadLocksData {
  startTime: string;
  endTime: string;
  dbName: string;
  deadlocks: number;
}

const fetchFromAPIwithRequest = async (
    endpoint: string,
    queryParameters: DeadLocksApiRequest,
    query: string
) => {
  try {
    const startTimeString = queryParameters.start.toISOString();
    const endTimeString = queryParameters.end.toISOString();
    const dbName = queryParameters.datname;

    const response = await instance.get<DeadLocksApiResponse>(
        `${endpoint}${encodeURIComponent(
            query
        )}&start=${startTimeString}&end=${endTimeString}&step=${prometheusSettings?.postgresqlScrapeInterval
        }`
    );
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

  const [deadLocksData, setDeadLocksData] =
      useState<DeadLocksApiResponseData | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [datname, setDatname] = useState<string | null>(null);
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
      const endpoint = "/api/v1/query_range?query=";
      const query =
          'pg_stat_database_deadlocks{datname="' +
          yatagarasuSettings.dbname + '"}';
      const requestBody: DeadLocksApiRequest = {
        start: starttime,
        end: endtime,
        datname: yatagarasuSettings.dbname,
      };
      const { status, data: response }: {status: number, data: DeadLocksApiResponse}
          = await fetchFromAPIwithRequest(endpoint, requestBody, query);
      setStatusCode(status);
      setDatname(yatagarasuSettings.dbname);
      setDeadLocksData(response.data);
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
                      {datname}
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
                        {deadLocksData.result[0].values.length === 0
                            ? "-"
                            : `${calcSum(deadLocksData.result[0].values)}`}
                      </Typography>
                      <Typography
                          variant="body2"
                          component="div"
                          align="right"
                          sx={{ marginTop: "1vh", marginBottom: "-1.3vh" }}
                      >
                        Time:{" "}
                        {unixTimeToDate(
                            deadLocksData.result[0].values[1][0]
                        ).toLocaleString()}{" "}
                        -{" "}
                        {unixTimeToDate(
                            deadLocksData.result[0].values[
                            deadLocksData.result[0].values.length - 1
                                ][0]
                        ).toLocaleString()}

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
