import {Chart, Filler} from "chart.js";
import {DiskUsageData, useDiskUsage} from "../DataProvider/DiskUsageProvider";
import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {Bar} from "react-chartjs-2";
import {getItemTitleSx, StatusType} from "../AnalysisReportUtil";

Chart.register(Filler);

/**
 * ディスク使用率のステータスを取得する
 */
export const getDiskUsageStatus = (): StatusType | null => {
  const data: DiskUsageData[] | null = useDiskUsage();
  if (!data) return null;
  if (data.find((item) => item.usage > 90)) return 'ERROR';
  if (data.find((item) => item.usage > 50)) return 'WARNING';
  return 'OK';
}

/**
 * ディスク使用率のコンポーネント
 */
export const DiskUsage: React.FC = () => {
  const [chartData, setChartData] = useState<any | null>(null);
  const data: DiskUsageData[] | null = useDiskUsage();

  useEffect(() => {
    const fetchChartData = async () => {
      if (data) {
        const labels = data.map((item) => item.datetime);
        const length = labels.length;
        const remain = data.map((item) => item.usage);

        setChartData({
          labels: labels,
          length: length,
          datasets: [
            {
              label: 'ディスク使用率',
              data: remain,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgb(54, 162, 235)',
              type: 'line'
            },
          ]
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
      }
    },
  });

  return (
      <Card sx={{width: '95vw', marginTop: '1vh'}}>
        <CardContent sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" align="left" sx={getItemTitleSx(getDiskUsageStatus())}>
              ディスク使用率
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
