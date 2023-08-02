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
  TooltipCallbacks,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box, Card, CardContent, Checkbox,CircularProgress,IconButton,Popover,Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green, yellow, red } from '@mui/material/colors';
import annotationPlugin from 'chartjs-plugin-annotation';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

import instance from '../../Axios/AxiosInstance';
import { getDate, rgbToRgba} from '../../Component/Common/Util';
import { StatusColor, Status, Thresholds, statusColors } from '../../Component/Threshold/Threshold';


interface CpuUsageData {
  date: string;
  usage: number;
};

interface CpuUsageApiResponse {
  starttime: string;
  endtime: string;
  data: CpuUsageData[];
};

interface CpuUsageApiRequest {
  starttime: Date;
  endtime: Date;
};

interface CpuUsageProps {
  starttime: Date;
  endtime: Date;
}

const fetchFromAPIwithRequest = async (endpoint: string, queryParameters: CpuUsageApiRequest) => {
  try {
      const startTimeString = getDate(queryParameters.starttime);
      const endTimeString = getDate(queryParameters.endtime);
      const response = await instance.get(`${endpoint}?starttime=${startTimeString}&endtime=${endTimeString}`);

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

const CPUusage: React.FC<CpuUsageProps> = ({ starttime, endtime }) => {
  const [chartData, setChartData] = useState<any | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [yAxisFixed, setYAxisFixed] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)};
  const handlePopoverClose = () => {setAnchorEl(null)};
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchChartData = async () => {
      const endpoint = "/database-explorer/api/visualization/cpu-usage";
      const requestBody: CpuUsageApiRequest = {
        starttime: new Date(starttime),
        endtime: new Date(endtime)
      };
  
      const { status, data: response }: {status: number, data: CpuUsageApiResponse} = await fetchFromAPIwithRequest(endpoint, requestBody);
      setStatusCode(status);
  
      const labels = response.data.map((item) => item.date);
      const data = response.data.map((item) => item.usage);
      const borderColor = data.map((value) => {
        let status: Status;
        if (value <= Thresholds.cpu.ok) {
          status = 'ok';
        } else if (value <= Thresholds.cpu.watch) {
          status = 'watch';
        } else {
          status = 'alert';
        }
        return rgbToRgba(statusColors[status], 1);
      });
      const backgroundColor = data.map((value) => {
        let status: Status;
        if (value <= Thresholds.cpu.ok) {
          status = 'ok';
        } else if (value <= Thresholds.cpu.watch) {
          status = 'watch';
        } else {
          status = 'alert';
        }
        return rgbToRgba(statusColors[status], 0.1);
      });
      const length = labels.length;


  
      setChartData({
        labels: labels,
        datasets: [
          {
            data: data,
            borderColor: borderColor,
            backgroundColor: backgroundColor
          }
        ],
        length: length
      });
    };
  
  
    fetchChartData();
  }, [starttime, endtime]);

  const options = () => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: yAxisFixed ? undefined : 100,
      },
      x: {
        barPercentage: 1.2,
        categoryPercentage: 1.2,
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          callback: function(value : any, index : any , values : any) {
            return index === 0 || index === chartData?.labels.length - 1 ? chartData?.labels[index] : '';
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      }
    },
    onHover: (e: any, elements: any) => {
    },
    plugin: {
      legend: {
        display: false, 
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'white',
        titleColor: 'black',
        bodyColor: 'black',
        callbacks: {
          label: function(context : any) {
            const index = context.dataIndex;
            const dataset = context.dataset.data;
            
            return `${parseFloat(dataset[index]).toFixed(2)} %`;
          },
        },
      },
    }
  });
  
  const getIcon = () => {
    if (statusCode === null) {
      return WarningIcon; 
    }

    if (statusCode >= 500) {
      return ErrorIcon;
    } else if (statusCode >= 400 || chartData.length === 0) {
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
    } else if (statusCode >= 400 || chartData.length === 0) {
      return yellow[700];
    } else {
      return green[500];
    }
  }

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '-15px', marginTop: '-5px', width: '100%' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            CPU使用率(%)
          </Typography>
          {chartData && React.createElement(getIcon(), { style: { color: getIconColor() } })}
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
              監視対象のDBが稼働しているマシンのリソースを参照しています。
            </Typography>
          </Popover>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginBottom: '-15px', marginTop: '-15px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '-30px',marginBottom: '-15px', marginTop: '-15px', width: '100%' }}>
              <Box sx={{ border: '1px solid ' + statusColors['ok'], borderRadius: '5px', padding: '1.5px',alignItems: 'center', marginRight: '0.5vw'}}>  
                <Typography variant="body2" sx={{ color: statusColors['ok'] }}>
                  {'≦ ' + Thresholds.cpu.ok + '%'}
                </Typography>
              </Box>
              <Box sx={{ border: '1px solid ' + statusColors['watch'], borderRadius: '5px', padding: '1.5px',alignItems: 'center', marginRight: '0.5vw'}}>  
                <Typography variant="body2" sx={{ color: statusColors['watch'] }}>
                  {Thresholds.cpu.ok + '%' + '< ~ ≦ '+ Thresholds.cpu.watch + '%'}
                </Typography>
              </Box>
              <Box sx={{ border: '1px solid ' + statusColors['alert'], borderRadius: '5px', padding: '1.5px',alignItems: 'center', marginRight: '0.5vw'}}>  
                <Typography variant="body2" sx={{ color: statusColors['alert'] }}>
                  {'> ' + Thresholds.cpu.watch + '%'}
                </Typography>
              </Box>
            </Box>
            <Checkbox
              checked={yAxisFixed}
              onChange={() => setYAxisFixed(!yAxisFixed)}
            />
            <Typography variant="body2">
              AutoScale
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'left', width: '100%' , marginBottom: '-20px', marginTop: '2vh'}}>
          <div style={{ height: '20vh', width: '100%', marginLeft: '-2vw', marginRight: '-2vw' }}>
            {chartData ? <Bar options={options()} data={chartData}/> : <CircularProgress sx={{marginTop: '7vh'}}/>}
          </div>
        </Box>
    </CardContent>
  </Card>

  );
};

export default CPUusage;
