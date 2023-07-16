import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  TooltipPositionerMap,
} from "chart.js";
import { Line } from "react-chartjs-2";

import instance from '../axios/axiosInstance';
import { getDate} from '../component/Common/Util';
import { Box, Card, CardContent, Checkbox,Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green, yellow, red } from '@mui/material/colors';

import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

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
  Title,
  Legend
);

const CPUusage: React.FC<CpuUsageProps> = ({ starttime, endtime }) => {
  const [chartData, setChartData] = useState<any | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [yAxisFixed, setYAxisFixed] = useState<boolean>(true);

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
      const length = labels.length;
  
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "%",
            data: data,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
        length: length
      });
    };
  
    fetchChartData();
  }, []);

  const options = () => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: yAxisFixed ? undefined : 100,
      },
      x: {
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
      //TODO tooltipを表示させる。マウスホバーイベント自体は捕捉できているため、描画の問題と予測。
      console.log("this is test")
    },
    plugins: {
      // plugins の中では tooltips を設定しない
    },
    tooltips: { // tooltip を options のルートに設定
      mode: 'index',
      intersect: false,
      callbacks: {
        title: function(tooltipItems : any, data : any) {
          console.log("this is test")
          return "my tittle";
        },
        label: function(tooltipItem : any, data : any) {
          console.log(tooltipItem)
          let label = data.datasets[tooltipItem.datasetIndex].label || '';
          if (tooltipItem.yLabel !== null) {
            label += ': ' + tooltipItem.yLabel.toFixed(2) + '%';
          }
          return label;
        },
      }
    },
  });
  
  
  
  const getIcon = () => {
    if (statusCode === null) {
      return CheckCircleOutlineIcon; 
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
      return yellow[500];
    } else {
      return green[500];
    }
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '-15px', marginTop: '-5px', width: '100%' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            CPU使用率(%)
          </Typography>
          {chartData && React.createElement(getIcon(), { style: { color: getIconColor() } })}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginBottom: '-15px', marginTop: '-15px' }}>
            <Checkbox
              checked={yAxisFixed}
              onChange={() => setYAxisFixed(!yAxisFixed)}
            />
            <Typography variant="body2">
              AutoScale
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'left', width: '100%' , marginBottom: '-20px', marginTop: '-10px'}}>
          <div style={{ height: '145pt', width: '100%', marginLeft: '-2vw', marginRight: '-2vw' }}>
            {chartData ? <Line options={options()} data={chartData}/> : 'Loading...'}
          </div>
        </Box>
    </CardContent>
  </Card>

  );
};

export default CPUusage;
