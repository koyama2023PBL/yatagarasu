import {Chart, registerables} from "chart.js";
import {CPUUsageRatioData, useCPUUsageRatio} from "../DataProvider/CPUUsageRatioProvider";
import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {Bar} from "react-chartjs-2";
import {getItemTitleSx, lineChartOptions, ReportingItemProps, StatusType} from "../AnalysisReportUtil";
import Divider from "@mui/material/Divider";

Chart.register(...registerables);

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
export const CPUIOWaitRatio: React.FC<ReportingItemProps<CPUUsageRatioData[]>> = ({data}) => {
  const [chartData, setChartData] = useState<any | null>(null);

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
              label: 'I/O待ち比率',
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

  const analysisResult = (): string | null => {
    const status: StatusType | null = getCPUIOWaitRatioStatus();
    if (!status) return null;
    if (status === 'ERROR') return 'ディスクI/O待ちの比率が非常に高いです。';
    if (status === 'WARNING') return 'ディスクI/O待ちの比率が高いです。';
    return 'ディスクI/O待ちの比率は正常です。';
  }

  return (
      <Card sx={{ width: '65vw', marginRight: 'auto', marginLeft: 'auto' }}>
        <CardContent sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" align="left" sx={ getItemTitleSx(getCPUIOWaitRatioStatus()) }>
              I/O待ち比率
            </Typography>
            <Box sx={{ display: 'flex', marginTop: '3vh' }}>
              <Box sx={{ display: 'flex', width: '25vw' }}>
                <div style={{ width: '100%' }}>
                  { chartData ? <Bar options={ lineChartOptions(chartData) } data={ chartData }/> : <CircularProgress sx={{ marginTop: '7vh' }}/> }
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
                    <li>ディスクI/O待ちの比率が高騰している時間帯に、ディスクI/Oがボトルネックとなるような処理が行われていた可能性があります。</li>
                  </ul>
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
}
