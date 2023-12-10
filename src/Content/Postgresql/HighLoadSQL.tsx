import {Card, CardContent} from "@mui/material";
import {invokeQuery, QueryResponse, QueryResult} from "../../Component/Common/PrometheusClient";
import yatagarasuSettings from "../../Component/Redux/YatagarasuSettings";
import {MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import React, {useEffect, useMemo, useState} from "react";

interface StatStatementsMetrics {
  queryid: number;
  user: string;
}

interface SQLMetrics {
  queryid: number;
  query: string;
}

interface HighLoadSQLProps {
  starttime: Date;
  endtime: Date;
}

type HighLoadSQLData = {
  queryid: number;
  query: string;
  calls: number;
  total_time: number;
  mean_time: number;
}

const getData = async (starttime: Date, endtime: Date) => {
  const duringSeconds = Math.floor((endtime.getTime() - starttime.getTime()) / 1000);
  const datname = yatagarasuSettings?.dbname;
  const callsQuery = `increase(pg_stat_statements_calls_total{datname="${datname}"}[${duringSeconds}s])>0`;
  const timeQuery  = `increase(pg_stat_statements_seconds_total{datname="${datname}"}[${duringSeconds}s])>0`;

  const { data: callsData } = await invokeQuery<QueryResponse<StatStatementsMetrics>>(callsQuery, endtime);
  const { data: timeData }  = await invokeQuery<QueryResponse<StatStatementsMetrics>>(timeQuery, endtime);
  const { data: sqlData } = await invokeQuery<QueryResponse<SQLMetrics>>('pg_stat_statements_queries', endtime);

  const callsObj: { [key: string]: number } = {}
  const timeObj: { [key: string]: number } = {}
  const sqlObj: { [key: string]: string } = {}
  callsData.data.result.forEach((item: QueryResult<StatStatementsMetrics>) => callsObj[item.metric.queryid] = Number(item.value[1]));
  timeData.data.result.forEach((item: QueryResult<StatStatementsMetrics>) => timeObj[item.metric.queryid] = Number(item.value[1]));
  sqlData.data.result.forEach((item: QueryResult<SQLMetrics>) => sqlObj[item.metric.queryid] = item.metric.query);

  const response: HighLoadSQLData[] = [];
  Object.keys(callsObj).forEach((queryid) => {
    response.push({
      queryid: Number(queryid),
      query: sqlObj[queryid],
      calls: callsObj[queryid],
      total_time: timeObj[queryid],
      mean_time: timeObj[queryid] / callsObj[queryid],
    });
  });
  return response;
}

export const HighLoadSQL: React.FC<HighLoadSQLProps> = ({ starttime, endtime }) => {
  const columns = useMemo<MRT_ColumnDef<HighLoadSQLData>[]>(() => [
    {
      header: 'Query',
      accessorKey: 'query',
    },
    {
      header: 'Calls',
      accessorKey: 'calls',
      muiTableHeadCellProps:{
        sx: {width: '70%'},
      },
      muiTableBodyCellProps: {
        sx: {width: '70%'},
      },
    },
    {
      header: 'Total Time',
      accessorKey: 'total_time',
      size: 150,
    },
    {
      header: 'Mean Time',
      accessorKey: 'mean_time',
      size: 150,
    },
  ], []);

  const [data, setData] = useState<HighLoadSQLData[]>([]);

  const table = useMaterialReactTable<HighLoadSQLData>({
    columns: columns,
    data: data,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(starttime, endtime);
      setData(data);
    };
    void fetchData();
  }, [starttime, endtime]);

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent sx={{ width: '100%' }}>
        <MaterialReactTable table={table} />
      </CardContent>
    </Card>
  );
}
