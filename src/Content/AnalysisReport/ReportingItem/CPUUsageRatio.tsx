import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {Chart, Filler} from "chart.js";
import {CPUUsageRatioData, useCPUUsageRatio} from "../DataProvider/CPUUsageRatioProvider";
import {Bar} from "react-chartjs-2";
import {getItemTitleSx, StatusType} from "../AnalysisReportUtil";
import Divider from "@mui/material/Divider";

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
              backgroundColor: 'rgba(136, 204, 238, 1)',
              borderColor: 'rgb(136, 204, 238)',
              fill: true,
              type: 'line',
              pointRadius: 0,
              borderWidth: 1,
              pointStyle: 'rect',
            },
            {
              label: 'システム',
              data: system,
              backgroundColor: 'rgba(51, 34, 136, 1)',
              borderColor: 'rgb(51, 34, 136)',
              fill: true,
              type: 'line',
              pointRadius: 0,
              borderWidth: 1,
              pointStyle: 'rect',
            }
          ],
        });
      }
    }
    void fetchChartData();
  }, [data]);

  const analysisResult = (): string | null => {
    const status: StatusType | null = getCPUUsageRatioStatus();
    if (!status) return null;
    if (status === 'ERROR') return 'CPU使用率が非常に高いです。';
    if (status === 'WARNING') return 'CPU使用率が高いです。';
    return 'CPU使用率は正常です。';
  }

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
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        }
      },
      y: {
        stacked: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: function(value: any, _index: any, _ticks: any) {
            return value + '%';
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
      }
    },
  });

  return (
    <Card sx={{ width: '65vw', marginRight: 'auto', marginLeft: 'auto' }}>
      <CardContent sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" align="left" sx={ getItemTitleSx(getCPUUsageRatioStatus()) }>
            CPU使用率
          </Typography>
          <Box sx={{ display: 'flex', marginTop: '3vh' }}>
            <Box sx={{ display: 'flex', width: '25vw' }}>
              <div style={{ width: '100%' }}>
                { chartData ? <Bar options={ options() } data={ chartData }/> : <CircularProgress sx={{ marginTop: '7vh' }}/> }
              </div>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '35vw', marginLeft: '2vw' }}>
              <Typography variant="body2" align="left">
                診断結果
              </Typography>
              <Divider />
              <Typography variant="body1" align="left" sx={{ marginTop: '1vh', marginLeft: '2vw' }}>
                { analysisResult() }
              </Typography>
              <Typography variant="body2" align="left" sx={{ marginTop: '2vh' }}>
                チェックポイント
              </Typography>
              <Divider />
              <Typography variant="body2" align="left" sx={{ marginLeft: '1vw' }}>
                <ul>
                  <li>ユーザープロセスおよびシステムプロセスによるCPU使用率です。</li>
                  <li>CPU使用率が高騰している時間帯に非効率な処理が行われていた可能性があります。</li>
                </ul>
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
