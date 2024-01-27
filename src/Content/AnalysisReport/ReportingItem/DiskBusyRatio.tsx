import {Chart, Filler} from "chart.js";
import {DiskBusyRatioData, useDiskBusyRatio} from "../DataProvider/DiskBusyRatioProvider";
import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {Bar} from "react-chartjs-2";
import {getItemTitleSx, lineChartOptions, ReportingItemProps, StatusType} from "../AnalysisReportUtil";
import Divider from "@mui/material/Divider";

Chart.register(Filler);

/**
 * ディスクビジー率のステータスを取得する
 */
export const getDiskBusyRatioStatus = (): StatusType | null => {
  const data: DiskBusyRatioData[] | null = useDiskBusyRatio();
  if (!data) return null;
  if (data.find((item) => item.ratio > 80)) return 'ERROR';
  if (data.find((item) => item.ratio > 50)) return 'WARNING';
  return 'OK';
}

/**
 * ディスクビジー率のコンポーネント
 */
export const DiskBusyRatio: React.FC<ReportingItemProps<DiskBusyRatioData[]>> = ({data}) => {
  const [chartData, setChartData] = useState<any | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      if (data) {
        const labels = data.map((item) => item.datetime);
        const length = labels.length;
        const ratio = data.map((item) => item.ratio);

        setChartData({
          labels: labels,
          length: length,
          datasets: [
            {
              label: 'ディスクビジー率',
              data: ratio,
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
    const status: StatusType | null = getDiskBusyRatioStatus();
    if (!status) return null;
    if (status === 'ERROR') return 'ディスクビジー率が非常に高いです。';
    if (status === 'WARNING') return 'ディスクビジー率が高いです。';
    return 'ディスクビジー率は正常です。';
  }

  return (
    <Card sx={{ width: '65vw', marginRight: 'auto', marginLeft: 'auto', marginTop: '2vh' }}>
      <CardContent sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" align="left" sx={ getItemTitleSx(getDiskBusyRatioStatus()) }>
            ディスクビジー率
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
                  <li>ディスクビジー率が50%を頻繁に超えている場合、ディスクがボトルネックとなっている可能性が高いです。</li>
                  <li>問題となっているのはどのディスクなのか、書き込み／読み込みのどちらで問題が発生しているのかを確認してください。</li>
                </ul>
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
