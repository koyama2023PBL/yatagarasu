import {ReportingItemProps} from "../AnalysisReportUtil";
import {TableSizeData} from "../DataProvider/TableSizeProvider";
import React, {useEffect, useMemo, useState} from "react";
import {MRT_Table, MRT_ColumnDef, useMaterialReactTable} from "material-react-table";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Divider from "@mui/material/Divider";

export const TableSize: React.FC<ReportingItemProps<TableSizeData[]>> = ({ data }) => {
  const columns = useMemo<MRT_ColumnDef<TableSizeData>[]>(() => [
    {
      header: 'スキーマ',
      accessorKey: 'schema',
    },
    {
      header: 'テーブル',
      accessorKey: 'table',
    },
    {
      header: 'サイズ(MB)',
      accessorKey: 'size',
    },
    {
      header: 'デッドタプル率(%)',
      accessorKey: 'deadTupleRatio',
    },
    {
      header: 'ANALYZE実行日時',
      accessorKey: 'lastAnalyzed',
    },
    {
      header: 'VACUUM実行日時',
      accessorKey: 'lastVacuumed',
    },
  ], []);

  const [tableData, setData] = useState<TableSizeData[]>([]);

  const table = useMaterialReactTable<TableSizeData>({
    columns: columns,
    data: tableData,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: true,
    enableSorting: true,
    muiTableBodyRowProps: { hover: false },
  });

  const tableTheme = useMemo(
      () =>
          createTheme({
            palette: {
              background: {
                default: 'rgb(240,244,249)',
              },
            },
          }),
      [],
  );

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const sortedData = data.sort((a, b) => {
          if (a.deadTupleRatio > b.deadTupleRatio) return -1;
          if (a.deadTupleRatio < b.deadTupleRatio) return  1;
          if (a.size > b.size) return -1;
          if (a.size < b.size) return 1;
          return 0;
        });
        setData(sortedData);
      }
    }
    void fetchData();
  }, [data]);

  return (
    <Card sx={{ width: '65vw', marginRight: 'auto', marginLeft: 'auto', marginTop: '2vh' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" align="left" >
            【参照】テーブルごとの自動ANALYZEおよび自動VACUUMの実行状況
          </Typography>
          <Box sx={{marginTop: '2vh'}}>
            <ThemeProvider theme={tableTheme}>
              <MRT_Table table={table} />
            </ThemeProvider>
          </Box>
          <Typography variant="body2" align="left" sx={{ marginTop: '2vh' }}>
            チェックポイント
          </Typography>
          <Divider />
          <Typography variant="body2" align="left" sx={{ marginLeft: '1vw' }}>
            <ul>
              <li>自動VACUUMの実行日時が古過ぎる場合、適切に自動VACUUMが実行されていない可能性があります。<br/>
                その場合、テーブルサイズの肥大化につながります。
              </li>
              <li>テーブルのサイズおよびデッドタプルの占有率が高いテーブルが存在する場合、ディスク使用率の改善余地があるかもしれません。</li>
              <li>自動ANALYZEの実行日時が古過ぎる場合、適切に自動ANALYZEが実行されていない可能性があります。<br/>
                その場合、SQL実行計画が適切に立案されずにパフォーマンス低下に繋がります。</li>
              <li>自動ANALYZEはディスクの診断結果と直接の関係はありませんが、自動VACUUMと合わせて管理することが多いためここに表示しています。</li>
            </ul>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
