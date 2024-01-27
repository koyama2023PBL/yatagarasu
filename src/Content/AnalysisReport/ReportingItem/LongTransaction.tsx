import {getItemTitleSx, ReportingItemProps, StatusType, tableObject, tableThemeOptions} from "../AnalysisReportUtil";
import {LongTransactionData, useLongTransaction} from "../DataProvider/LongTransactionProvider";
import React, {useEffect, useMemo, useState} from "react";
import {MaterialReactTable, MRT_ColumnDef} from "material-react-table";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import Divider from "@mui/material/Divider";

/**
 * 長時間トランザクションのステータスを取得する
 */
export const getLongTransactionStatus = (): StatusType | null => {
  const data: LongTransactionData[] | null = useLongTransaction();
  if (!data) return null;
  if (data.length === 0) return 'OK';
  if (data.find((item) => item.duration >= 600)) return 'ERROR';
  return 'WARNING';
}

/**
 * 長時間トランザクションのコンポーネント
 * @param data
 */
export const LongTransaction: React.FC<ReportingItemProps<LongTransactionData[]>> = ({data}) => {
  const columns: MRT_ColumnDef<LongTransactionData>[] = useMemo<MRT_ColumnDef<LongTransactionData>[]>(() => [
    {
      header: 'クライアント',
      accessorKey: 'client',
      size: 160,
      muiTableHeadCellProps: {
        align: 'center',
      },
    },
    {
      header: '開始日時',
      accessorKey: 'start_at',
      size: 160,
      muiTableHeadCellProps: {
        align: 'center',
      },
    },
    {
      header: '経過秒数',
      accessorKey: 'duration',
      size: 120,
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'right',
      },
    },
    {
      header: 'ステータス',
      accessorKey: 'state',
      size: 180,
      muiTableHeadCellProps: {
        align: 'center',
      },
    }
  ], []);

  const [tableData, setData] = useState<LongTransactionData[]>([]);
  const table = tableObject<LongTransactionData>(columns, tableData);
  const tableTheme = useMemo(() => createTheme(tableThemeOptions()), []);

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const sortedData = data.sort((a, b) => {
          if (a.duration > b.duration) return -1;
          if (a.duration < b.duration) return  1;
          return 0;
        });
        setData(sortedData);
      }
    };
    void fetchData();
  }, [data]);

  const analysisResult = (): string | null => {
    const status: StatusType | null = getLongTransactionStatus();
    if (!status)              return null;
    if (status === 'ERROR')   return '非常に長いトランザクションが存在します。';
    if (status === 'WARNING') return '長いトランザクションが存在します。';
    return '長いトランザクションは存在しません。';
  }

  return (
    <Card sx={{ width: '65vw', marginRight: 'auto', marginLeft: 'auto', marginTop: '2vh' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" align="left" sx={ getItemTitleSx(getLongTransactionStatus()) }>
            長時間トランザクション
          </Typography>
          <Box sx={{ display: 'flex', marginTop: '3vh' }}>
            <Box sx={{ display: 'flex', width: '35vw' }}>
              <div style={{ width: '100%' }}>
                { tableData ?
                  <ThemeProvider theme={tableTheme}>
                    <MaterialReactTable table={table} />
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
                  <li>リストされているトランザクションは、ロックを保持したまま何もしていない可能性があります。</li>
                  <li>リストされているトランザクションは、ロック待ちに陥っている可能性もあります。</li>
                </ul>
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
