import {Chart, registerables} from "chart.js";
import {DiskUsageData, useDiskUsage} from "../DataProvider/DiskUsageProvider";
import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {Bar} from "react-chartjs-2";
import {getItemTitleSx, lineChartOptions, ReportingItemProps, StatusType} from "../AnalysisReportUtil";
import Divider from "@mui/material/Divider";

Chart.register(...registerables);

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
export const DiskUsage: React.FC<ReportingItemProps<DiskUsageData[]>> = ({data}) => {
  const [chartData, setChartData] = useState<any | null>(null);

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
    const status: StatusType | null = getDiskUsageStatus();
    if (!status) return null;
    if (status === 'ERROR') return 'ディスク使用率が非常に高いです。';
    if (status === 'WARNING') return 'ディスク使用率が高いです。';
    return 'ディスク使用率は正常です。';
  }

  return (
    <Card sx={{ width: '65vw', marginRight: 'auto', marginLeft: 'auto', marginTop: '2vh' }}>
      <CardContent sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" align="left" sx={ getItemTitleSx(getDiskUsageStatus()) }>
            ディスク使用率
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
                  <li>ディスク使用率が50%を超えた時点から、ディスク性能が徐々に劣化する可能性があります。</li>
                  <li>ディスクの空き容量がゼロになると動作障害が生じるリスクが高まります。</li>
                  <li>ディスク使用率が高騰している場合、ディスク使用量の大きいテーブルから順に、自動VACUUMの実行状況などを確認してください。</li>
                </ul>
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
