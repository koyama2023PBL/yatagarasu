import React, {createContext, useContext, useEffect, useState} from "react";
import yatagarasuSettings from "../../../Component/Redux/YatagarasuSettings";
import {invokeQuery, QueryResponse, QueryResult} from "../../../Component/Common/PrometheusClient";

/**
 * データプロバイダのプロパティ
 */
interface HighLoadQueryProviderProps {
  children: React.ReactNode;
  starttime: Date;
  endtime: Date;
}

/**
 * 高負荷クエリのデータ
 */
export interface HighLoadQueryData {
  queryid: number;
  query: string;
  calls: number;
  total_time: number;
  mean_time: number;
}

/**
 * pg_stat_statementsのメトリクス
 */
interface StatStatementsMetrics {
  queryid: number;
  user: string;
}

/**
 * クエリのメトリクス
 */
interface SQLMetrics {
  queryid: number;
  query: string;
}

/**
 * 高負荷クエリのデータプロバイダ
 */
const DataContext: React.Context<any> = createContext<HighLoadQueryData | null>(null);

/**
 * APIにリクエストを送信する
 * @param starttime
 * @param endtime
 */
const fetchDataFromAPI = async (starttime: Date, endtime: Date) => {
  const duringSeconds = Math.floor((endtime.getTime() - starttime.getTime()) / 1000);
  const datname = yatagarasuSettings?.dbname;
  const callsQuery = `increase(pg_stat_statements_calls_total{datname="${datname}"}[${duringSeconds}s])>0`;
  const timeQuery  = `increase(pg_stat_statements_seconds_total{datname="${datname}"}[${duringSeconds}s])>0`;
  const sqlQuery   = `pg_stat_statements_queries{datname="${datname}"}`;

  const { status: statusCalls, data: callsData } = await invokeQuery<QueryResponse<StatStatementsMetrics>>(callsQuery, endtime);
  const { status: statusTime, data: timeData }  = await invokeQuery<QueryResponse<StatStatementsMetrics>>(timeQuery, endtime);
  const { status: statusSql, data: sqlData } = await invokeQuery<QueryResponse<SQLMetrics>>(sqlQuery, endtime);

  const callsObj: { [key: string]: number } = {}
  const timeObj:  { [key: string]: number } = {}
  const sqlObj:   { [key: string]: string } = {}
  callsData.data.result.forEach((item: QueryResult<StatStatementsMetrics>) => callsObj[item.metric.queryid] = Number(item.value[1]));
  timeData.data.result.forEach((item: QueryResult<StatStatementsMetrics>) => timeObj[item.metric.queryid] = Number(item.value[1]));
  sqlData.data.result.forEach((item: QueryResult<SQLMetrics>) => sqlObj[item.metric.queryid] = item.metric.query);

  const response: HighLoadQueryData[] = [];
  Object.keys(callsObj).forEach((queryid) => {
    const mean_time = Math.round(timeObj[queryid] / callsObj[queryid] * 1000) / 1000;
    if (mean_time < 0.1) return;
    response.push({
      queryid: Number(queryid),
      query: sqlObj[queryid] ?? queryid,
      calls: Math.round(callsObj[queryid]),
      total_time: Math.round(timeObj[queryid] * 100) / 100,
      mean_time: Math.round(timeObj[queryid] / callsObj[queryid] * 1000) / 1000,
    });
  });

  return {status: Math.max(statusCalls, statusTime, statusSql), data: response};
}

/**
 * 高負荷クエリのデータプロバイダ
 * @param children
 * @param starttime
 * @param endtime
 */
export const HighLoadQueryProvider: React.FC<HighLoadQueryProviderProps> = ({ children, starttime, endtime }) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<HighLoadQueryData[] | null>(null);

  useEffect(() => {
    setData(null);
    const fetchData = async () => {
      const {status, data} = await fetchDataFromAPI(starttime, endtime);
      setStatusCode(status);
      setData(data);
    }
    void fetchData();
  }, [starttime, endtime]);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
}

export const useHighLoadQuery = (): HighLoadQueryData[] => useContext(DataContext);
