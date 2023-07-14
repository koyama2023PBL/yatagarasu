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

const fetchFromAPIwithRequest = async (endpoint: string, queryParameters: CpuUsageApiRequest) => {
  try {
      // Format the Date objects as strings
      const startTimeString = getDate(queryParameters.starttime);
      const endTimeString = getDate(queryParameters.endtime);

      // Add the query parameters to the URL
      const response = await instance.get(`${endpoint}?starttime=${startTimeString}&endtime=${endTimeString}`);
      console.log("URL:", endpoint);
      console.log("Response:", response);
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

const CPUusage: React.FC = () => {
  const [chartData, setChartData] = useState<any | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {

      const endpoint = "/database-explorer/api/visualization/cpu-usage";

      const requestBody: CpuUsageApiRequest = {
        starttime: new Date("2023-05-07T18:00:00"),
        endtime: new Date("2023-05-07T18:10:00")
      };

      const response: CpuUsageApiResponse = await fetchFromAPIwithRequest(endpoint, requestBody);

      const labels = response.data.map((item) => item.date);
      const data = response.data.map((item) => item.usage);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "CPU使用率(%)",
            data: data,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
    };

    fetchChartData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };
  
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '-35px' }}>
        <h5>CPU使用率</h5>
        <Tooltip title="データベースが稼働しているサーバのCPU使用率を表示しています。" arrow>
          <HelpOutlineIcon fontSize="small" style={{ marginLeft: '0px' }} />
        </Tooltip>
      </div>
      {chartData ? <Line options={options} data={chartData}/> : 'Loading...'}
    </>
  );
};

export default CPUusage;
