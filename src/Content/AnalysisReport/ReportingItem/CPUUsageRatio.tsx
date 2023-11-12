import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {Chart, Filler} from "chart.js";
import {CPUUsageRatioData, useCPUUsageRatio} from "../DataProvider/CPUUsageRatioProvider";
import {Bar} from "react-chartjs-2";
import {getItemTitleSx, StatusType} from "../AnalysisReportUtil";

Chart.register(Filler);

/**
 * CPU使用率のステータスを取得する
 * TODO: 閾値の設定
 */
export const getCPUUsageRatioStatus = (): StatusType | null => {
  const data: CPUUsageRatioData[] | null = useCPUUsageRatio();
  if (!data) return null;
  if (data.find((item) => item.user + item.system > 80)) return 'ERROR';
  if (data.find((item) => item.user + item.system > 50)) return 'WARNING';
  return 'OK';
}

/**
 * CPU使用率のJSX
 */
export const CPUUsageRatio: React.FC = () => {
  const [chartData, setChartData] = useState<any | null>(null);
  const data: CPUUsageRatioData[] | null = useCPUUsageRatio();

  useEffect(() => {
    const fetchChartData = async () => {
      if (data) {
        const labels = data.map((item) => item.datetime);
        const length = labels.length;
        const user = data.map((item) => item.user);
        const system = data.map((item) => item.system);

        setChartData({
          labels: labels,
          length: length,
          datasets: [
            {
              label: 'ユーザ',
              data: user,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              fill: true,
              type: 'line'
            },
            {
              label: 'システム',
              data: system,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgb(54, 162, 235)',
              fill: true,
              type: 'line'
            }
          ],
        });
      }
    }
    void fetchChartData();
  }, [data]);

  const options = () => ({
    scales: {
      x: {
        ticks: {
          stacked: true,
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          callback: function(_value : any, index : any , _values : any) {
            return index === 0 || index === chartData?.labels.length - 1 ? chartData?.labels[index] : '';
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      },
      y: {
        stacked: true,
      }
    },
  });

  return (
    <Card sx={{width: '95vw'}}>
      <CardContent sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" align="left" sx={getItemTitleSx(getCPUUsageRatioStatus())}>
            CPU使用率
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div>
              {chartData ? <Bar options={options()} data={chartData}/> : <CircularProgress sx={{marginTop: '7vh'}}/>}
            </div>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
