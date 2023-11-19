import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import { Chart, Filler } from 'chart.js';
import {Bar} from "react-chartjs-2";
import {MemorySwapIOData, useMemorySwapIO} from "../DataProvider/MemorySwapIOProvider";
import {getItemTitleSx, StatusType} from "../AnalysisReportUtil";

Chart.register(Filler);

/**
 * メモリスワップI/Oのステータスを取得する
 * IOともに0より大きい瞬間がある: ERROR
 * IOのどちらかが0より大きい瞬間がある: WARNING
 * それ以外: OK
 */
export const getMemorySwapIOStatus = (): StatusType | null => {
  const data: MemorySwapIOData[] | null = useMemorySwapIO();
  if (!data) return null;
  if (data.find((item) => item.swapIn > 0 && item.swapOut > 0)) return 'ERROR';
  if (data.find((item) => item.swapIn > 0 || item.swapOut > 0)) return 'WARNING';
  return 'OK';
}

/**
 * メモリスワップI/OのJSX
 */
export const MemorySwapIO = () => {
  const [chartData, setChartData] = useState<any | null>(null);
  const data: MemorySwapIOData[] | null = useMemorySwapIO();

  useEffect(() => {
    const fetchChartData = async () => {
      if (data) {
        const labels = data.map((item) => item.datetime);
        const dataOut = data.map((item) => item.swapOut);
        const dataIn = data.map((item) => item.swapIn);
        const length = labels.length;

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'スワップアウト',
              data: dataOut,
              backgroundColor: 'rgba(136, 204, 238, 1)',
              borderColor: 'rgb(136, 204, 238)',
              fill: true,
              type: 'line',
              pointRadius: 0,
              borderWidth: 1,
              pointStyle: 'rect',
            },
            {
              label: 'スワップイン',
              data: dataIn,
              backgroundColor: 'rgba(51, 34, 136, 1)',
              borderColor: 'rgb(51, 34, 136)',
              fill: true,
              type: 'line',
              pointRadius: 0,
              borderWidth: 1,
              pointStyle: 'rect',
            },
          ],
          length: length
        });
      }
    }

    void fetchChartData();
  }, [data]);

  // noinspection JSUnusedGlobalSymbols, JSUnusedLocalSymbols
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
        stacked: true,
        min: 0,
        max: 10,
        ticks: {
          callback: function(value: any, index: any, ticks: any) {
            return value + '回';
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
        },
      },
    },
  });

  return (
    <Card sx={{ width: '65vw', marginRight: 'auto', marginLeft: 'auto', marginTop: '2vh' }}>
      <CardContent sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" align="left" sx={getItemTitleSx(getMemorySwapIOStatus())}>
            メモリ使用状況（スワップI/O発生回数）
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
};
