import {Chart, Filler} from "chart.js";
import {CPUUsageRatioData, useCPUUsageRatio} from "../DataProvider/CPUUsageRatioProvider";
import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {Bar} from "react-chartjs-2";
import {getItemTitleSx, StatusType} from "../AnalysisReportUtil";

Chart.register(Filler);

/**
 * CPU使用率のステータスを取得する
 */
export const getCPUIOWaitRatioStatus = (): StatusType | null => {
  const data: CPUUsageRatioData[] | null = useCPUUsageRatio();
  if (!data) return null;
  if (data.find((item) => item.ioWait > 10)) return 'ERROR';
  if (data.find((item) => item.ioWait >  5)) return 'WARNING';
  return 'OK';
}

/**
 * CPU I/O待ち率のコンポーネント
 * @constructor
 */
export const CPUIOWaitRatio: React.FC = () => {
  const [chartData, setChartData] = useState<any | null>(null);
  const data: CPUUsageRatioData[] | null = useCPUUsageRatio();

  useEffect(() => {
    const fetchChartData = async () => {
      if (data) {
        const labels = data.map((item) => item.datetime);
        const length = labels.length;
        const ioWait = data.map((item) => item.ioWait);

        setChartData({
          labels: labels,
          length: length,
          datasets: [
            {
              label: 'I/O待ち率',
              data: ioWait,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgb(54, 162, 235)',
              type: 'line',
              pointRadius: 0,
              borderWidth: 1,
            },
          ]
        });
      }
    }
    void fetchChartData();
  }, [data]);

  const options = () => ({
    maintainAspectRatio: true,
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
        min: 0,
        max: 100,
        ticks: {
          callback: function(value: any, index: any, ticks: any) {
            return value + '%';
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  });

  return (
      <Card sx={{ width: '65vw', marginRight: 'auto', marginLeft: 'auto' }}>
        <CardContent sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" align="left" sx={getItemTitleSx(getCPUIOWaitRatioStatus())}>
              I/O待ち率
            </Typography>
            <Box sx={{ display: 'flex', marginTop: '3vh' }}>
              <Box sx={{ display: 'flex', width: '25vw' }}>
                <div style={{ width: '100%' }}>
                  {chartData ? <Bar options={options()} data={chartData}/> : <CircularProgress sx={{marginTop: '7vh'}}/>}
                </div>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                概況
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
}
