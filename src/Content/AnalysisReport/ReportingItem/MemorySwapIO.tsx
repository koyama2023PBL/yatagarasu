import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {Chart, registerables} from 'chart.js';
import {Bar} from "react-chartjs-2";
import {MemorySwapIOData, useMemorySwapIO} from "../DataProvider/MemorySwapIOProvider";
import {getItemTitleSx, lineChartOptions, ReportingItemProps, StatusType} from "../AnalysisReportUtil";
import Divider from "@mui/material/Divider";

Chart.register(...registerables);

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
export const MemorySwapIO: React.FC<ReportingItemProps<MemorySwapIOData[]>> = ({data}) => {
  const [chartData, setChartData] = useState<any | null>(null);

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

  const analysisResult = (): string | null => {
    const status: StatusType | null = getMemorySwapIOStatus();
    if (!status) return null;
    if (status === 'ERROR') return 'メモリが不足している可能性が高いです。';
    if (status === 'WARNING') return 'メモリが不足している可能性があります。';
    return 'メモリは充足しています。';
  }

  const options = lineChartOptions(chartData, '回');
  options.scales.y.stacked = true;
  options.plugins.legend.display = true;
  options.scales.y.max = 10;
  options.scales.y.ticks.stepSize = 2;

  return (
    <Card sx={{ width: '65vw', marginRight: 'auto', marginLeft: 'auto', marginTop: '2vh' }}>
      <CardContent sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" align="left" sx={ getItemTitleSx(getMemorySwapIOStatus()) }>
            メモリ使用状況（スワップI/O発生回数）
          </Typography>
          <Box sx={{ display: 'flex', marginTop: '3vh' }}>
            <Box sx={{ display: 'flex', width: '25vw' }}>
              <div style={{ width: '100%' }}>
                { chartData ? <Bar options={ options } data={ chartData }/> : <CircularProgress sx={{ marginTop: '7vh' }}/> }
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
                  <li>スワップインおよびスワップアウトの発生回数です。</li>
                  <li>メモリスワップが断続的に発生している場合、メモリ不足の可能性が高いです。</li>
                </ul>
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
