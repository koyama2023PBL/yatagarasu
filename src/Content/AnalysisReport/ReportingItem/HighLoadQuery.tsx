import React, {useEffect, useMemo, useState} from "react";
import {getItemTitleSx, ReportingItemProps, StatusType, tableObject, tableThemeOptions} from "../AnalysisReportUtil";
import {HighLoadQueryData, useHighLoadQuery} from "../DataProvider/HighLoadQueryProvider";
import {MRT_ColumnDef, MRT_Table} from "material-react-table";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import {getLongTransactionStatus} from "./LongTransaction";

/**
 * 高負荷クエリのステータスを取得する
 */
export const getHighLoadQueryStatus = (): StatusType | null => {
  const data: HighLoadQueryData[] | null = useHighLoadQuery();
  if (!data) return null;
  if (data.length === 0) return 'OK';
  if (data.find((item) => item.mean_time >= 0.5)) return 'ERROR';
  return 'WARNING';
}

/**
 * 高負荷クエリのコンポーネント
 * @param data
 */
export const HighLoadQuery: React.FC<ReportingItemProps<HighLoadQueryData[]>> = ({data}) => {

  const columns = useMemo<MRT_ColumnDef<HighLoadQueryData>[]>(() => [
    {
      // @ts-ignore
      header: <div><br/>クエリ<br/></div>,
      accessorKey: 'query',
      muiTableHeadCellProps: {
        align: 'center',
      },
    },
    {
      // @ts-ignore
      header: <div><br/>実行回数<br/></div>,
      accessorKey: 'calls',
      size: 50,
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'right',
      },
    },
    {
      // @ts-ignore
      header: <div>合計<br />実行<br />秒数</div>,
      accessorKey: 'total_time',
      size: 20,
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'right',
      },
    },
    {
      // @ts-ignore
      header: <div>平均<br />実行<br />秒数</div>,
      accessorKey: 'mean_time',
      size: 20,
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'right',
      },
    },
  ], []);

  const [tableData, setData] = useState<HighLoadQueryData[]>([]);
  const table = tableObject<HighLoadQueryData>(columns, tableData);
  const tableTheme = useMemo(() => createTheme(tableThemeOptions()), []);

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const sortedData = data.sort((a, b) => {
          if (a.total_time > b.total_time) return -1;
          if (a.total_time < b.total_time) return  1;
          return 0;
        });
        setData(sortedData);
      }
    };
    void fetchData();
  }, [data]);

  const analysisResult = (): string | null => {
    const status: StatusType | null = getLongTransactionStatus();
    if (!status) return null;
    if (status === 'ERROR') return 'チューニングの余地が大きいクエリがあります。';
    if (status === 'WARNING') return '一部のクエリにチューニングの余地があります。';
    return 'クエリのパフォーマンスは良好です。';
  }

  return <Card sx={{ width: '65vw', marginRight: 'auto', marginLeft: 'auto', marginTop: '2vh' }}>
    <CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" align="left" sx={ getItemTitleSx(getHighLoadQueryStatus()) }>
          高負荷クエリ
        </Typography>
        <Box sx={{ display: 'flex', marginTop: '3vh' }}>
          <Box sx={{ display: 'flex', width: '35vw' }}>
            <div style={{ width: '100%' }}>
              { tableData ?
                <ThemeProvider theme={tableTheme}>
                  <MRT_Table table={table} />
                </ThemeProvider> : <CircularProgress sx={{ marginTop: '7vh' }}/> }
            </div>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '25vw', marginLeft: '2vw' }}>
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
                <li>リストされているクエリにはチューニングの余地があります。</li>
                <li>特に1回あたりの実行時間が0.5秒を超えているクエリはチューニングの余地が大きいです。</li>
                <li>合計実行時間の大きいクエリから順に確認してください。</li>
              </ul>
            </Typography>
          </Box>
        </Box>
      </Box>
    </CardContent>
  </Card>;
}
