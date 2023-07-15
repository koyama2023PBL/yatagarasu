import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
//import { fetchFromAPIwithRequest } from "../../ApiService";

import instance from '../axios/axiosInstance';
import { getDate, padZero} from '../component/Common/Util';
import { Card, CardContent } from "@mui/material";

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

interface MemoryUsageProps {
  starttime: Date;
  endtime: Date;
}

const fetchFromAPIwithRequest = async (endpoint: string, queryParameters: CpuUsageApiRequest) => {
  try {
      const startTimeString = getDate(queryParameters.starttime);
      const endTimeString = getDate(queryParameters.endtime);

      const response = await instance.get(`${endpoint}?starttime=${startTimeString}&endtime=${endTimeString}`);

      return response.data;
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

const DeadTuple: React.FC<MemoryUsageProps> = ({ starttime, endtime }) => {
  const [chartData, setChartData] = useState<any | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {

      const endpoint = "/database-explorer/api/visualization/cpu-usage";

      const requestBody: CpuUsageApiRequest = {
        starttime: new Date(starttime),
        endtime: new Date(endtime)
      };

      const response: CpuUsageApiResponse = await fetchFromAPIwithRequest(endpoint, requestBody);


      const labels = response.data.map((item) => {
        const date = new Date(item.date);
        const hours = padZero(date.getHours());
        const minutes = padZero(date.getMinutes());
        const seconds = padZero(date.getSeconds());
    
        return `${hours}:${minutes}:${seconds}`;
      });
      
      const data = response.data.map((item) => item.usage);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "個",
            data: data,
            borderColor: "rgb(54, 162, 235)", 
            backgroundColor: "rgba(54, 162, 235, 0.5)", 
          },
        ],
      });
    };

    fetchChartData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.chart.data.labels[context.dataIndex];
            const value = context.parsed.y;
            return `Date: ${label}, Usage: ${value}%`;
          }
        }
      }
    }
  };
  
  
  return (
    <Card>
    <CardContent>
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '-35px',marginTop: '-25px', width: '100%' }}>
        <h5>デッドタプル(個数) *未実装</h5>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <div style={{ height: '130pt', width: '100%' }}>
          {chartData ? <Line options={options} data={chartData}/> : 'Loading...'}
        </div>
      </div>
    </CardContent>
  </Card>
  );
};

export default DeadTuple;
