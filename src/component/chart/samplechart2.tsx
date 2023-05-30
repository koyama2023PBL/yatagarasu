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
import { fetchFromAPI } from "../../ApiService";
import { fetchFromAPIwithRequest } from "../../ApiService";

type CpuUsageData = {
  date: string;
  usage: number;
};

type CpuUsageApiResponse = {
  starttime: string;
  endtime: string;
  data: CpuUsageData[];
};

type CpuUsageApiRequest = {
  starttime: Date;
  endtime: Date;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph: React.FC = () => {
  const [chartData, setChartData] = useState<any | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
    //const  fetchFromAPIwithRequest = async () => {
      const endpoint = "/database-explorer/api/visualization/cpu-usage";
      //const response: CpuUsageApiResponse = await fetchFromAPI(endpoint);

      const requestBody: CpuUsageApiRequest = {
        starttime: new Date("2023-05-07T18:00:00"),
        endtime: new Date("2023-05-07T18:10:00"),
      };

      const response: CpuUsageApiResponse = await fetchFromAPIwithRequest(endpoint, requestBody);

      const labels = response.data.map((item) => item.date);
      const data = response.data.map((item) => item.usage);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "CPU Usage",
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
    plugins: {
      title: {
        display: true,
        text: "CPU Usage",
      },
    },
  };

  return <>{chartData && <Line options={options} data={chartData} />}</>;
};

export default Graph;





