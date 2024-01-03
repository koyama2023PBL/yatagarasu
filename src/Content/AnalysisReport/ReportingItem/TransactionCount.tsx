import {getItemTitleSx, lineChartOptions, ReportingItemProps, StatusType} from "../AnalysisReportUtil";
import {TransactionCountData, useTransactionCount} from "../DataProvider/TransactionCountProvider";
import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {Bar} from "react-chartjs-2";
import Divider from "@mui/material/Divider";
import {getDiskUsageStatus} from "./DiskUsage";

/**
 * トランザクション数のステータスを取得する
 */
export const getTransactionCountStatus = (): StatusType | null => {
  const data: TransactionCountData[] | null = useTransactionCount();
  if (!data) return null;
  if (data.find((item) => item.transaction_count >=  item.max_transaction * 0.9)) return 'ERROR';
  if (data.find((item) => item.transaction_count === item.max_transaction))       return 'WARNING';
  return 'OK';
}

/**
 * トランザクション数のコンポーネント
 * @param data
 */
export const TransactionCount: React.FC<ReportingItemProps<TransactionCountData[]>> = ({data}) => {
  const [chartData, setChartData] = useState<any | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      if (data) {
        const labels = data.map((item) => item.datetime);
        const length = labels.length;
        const maxConn = data.map((item) => item.max_transaction);
        const connCount = data.map((item) => item.transaction_count);

        setChartData({
          labels: labels,
          length: length,
          datasets: [
            {
              label: '接続数',
              data: connCount,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgb(54, 162, 235)',
              type: 'line',
              pointRadius: 0,
              borderWidth: 1,
              pointStyle: 'rect',
            },
            {
              label: '最大接続数',
              data: maxConn,
              backgroundColor: 'rgba(51, 34, 136, 1)',
              borderColor: 'rgb(51, 34, 136)',
              type: 'line',
              pointRadius: 0,
              borderWidth: 1,
              pointStyle: 'rect',
            },
          ]
        });
      }
    }
    void fetchChartData();
  }, [data]);

  const options = lineChartOptions(chartData, '件');
  options.plugins.legend.display = true;
  // @ts-ignore
  delete options.scales?.y?.min;
  // @ts-ignore
  delete options.scales?.y?.max;

  const analysisResult = (): string | null => {
    const status: StatusType | null = getDiskUsageStatus();
    if (!status)              return null;
    if (status === 'ERROR')   return '同時接続数が最大接続数に到達しています。';
    if (status === 'WARNING') return '同時接続数が最大接続数に近づいています。';
    return '同時接続数は適切な範囲で推移しています。';
  }

  return (
    <Card sx={{ width: '65vw', marginRight: 'auto', marginLeft: 'auto', marginTop: '2vh' }}>
      <CardContent sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" align="left" sx={ getItemTitleSx(getTransactionCountStatus()) }>
            トランザクション数
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
                  <li>同時最大接続数の設定値に対して、同時にどれだけ接続されているかを確認します。</li>
                  <li>同時接続数が同時最大接続数に到達している場合、接続待ちが発生している可能性があります。</li>
                  <li>中長期的に見て、同時接続数が増加傾向にないかどうかも確認してください。</li>
                </ul>
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
