/**
 * CPU使用率のコンポーネント
 */
import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {StatusType} from "../ReportingOverview";
import {Chart, Filler} from "chart.js";
import {CPUUsageRatioData, userCPUUsageRatio} from "../DataProvider/CPUUsageRatioProvider";
import {green, red, yellow} from "@mui/material/colors";
import {Bar} from "react-chartjs-2";

Chart.register(Filler);

/**
 * CPU使用率のステータスを取得する
 * TODO: 閾値の設定
 */
const getCPUUsageRatioStatus = (): StatusType | null => {
  const data: CPUUsageRatioData[] | null = userCPUUsageRatio();
  if (!data) return null;
  if (data.find((item) => item.user + item.system > 80 || item.ioWait > 10)) return 'ERROR';
  if (data.find((item) => item.user + item.system > 50 || item.ioWait >  5)) return 'WARNING';
  return 'OK';
}

/**
 * CPU使用率のJSX
 */
const CPUUsageRatio: React.FC = () => {
  const [chartData, setChartData] = useState<any | null>(null);
  const data: CPUUsageRatioData[] | null = userCPUUsageRatio();

  useEffect(() => {
    const fetchChartData = async () => {
      if (data) {
        const labels = data.map((item) => item.datetime);
        const length = labels.length;
        const user = data.map((item) => item.user);
        const system = data.map((item) => item.system);
        const ioWait = data.map((item) => item.ioWait);
        const idle = data.map((item) => item.idle);

        setChartData({
          labels: labels,
          length: length,
          datasets: [
            {
              label: 'I/O待ち',
              data: ioWait,
              backgroundColor: 'rgba(255, 206, 86, 0.5)',
              borderColor: 'rgb(255, 206, 86)',
              fill: true,
              type: 'line'
            },
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
            },
            // {
            //   label: 'アイドル',
            //   data: idle,
            //   backgroundColor: 'rgba(75, 192, 192, 0.5)',
            //   borderColor: 'rgb(75, 192, 192)',
            //   fill: true,
            //   type: 'line'
            // },
          ],
        });
      }
    }
    void fetchChartData();
  }, [data]);

  const getColor = (status: StatusType) => {
    switch (status) {
      case 'OK':
        return green[500];
      case 'WARNING':
        return yellow[700];
      case 'ERROR':
        return red[500];
    }
  }

  const getTitleSx = (status: StatusType | null) => {
    if (!status) {
      return {marginRight: '0.3vw'};
    }
    return {
      marginRight: '0.3vw',
      color: getColor(status),
    };
  }

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
            <Typography variant="h6" align="left" sx={getTitleSx(getCPUUsageRatioStatus())}>
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

export {CPUUsageRatio, getCPUUsageRatioStatus};
