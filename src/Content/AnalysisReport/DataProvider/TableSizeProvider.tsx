import React, {createContext, useContext, useEffect, useState} from "react";
import {invokeQuery, QueryResponse} from "../../../Component/Common/PrometheusClient";
import yatagarasuSettings from "../../../Component/Redux/YatagarasuSettings";
import {DateTostring, unixTimeToDate} from "../../../Component/Common/Util";

/**
 * データプロバイダのプロパティ
 */
interface TableSizeProviderProps {
  children: React.ReactNode;
  endtime: Date;
}

/**
 * pg_stat_user_tablesのメトリクス
 */
interface PgStatUserTableMetrics {
  relname: string;
  schemaname: string;
}

/**
 * ディスク使用率のデータ
 */
export interface TableSizeData {
  table: string;
  schema: string;
  size: number;
  deadTupleRatio: number;
  lastAnalyzed: string;
  lastVacuumed: string;
}

/**
 * ディスク使用率のデータプロバイダ
 */
const DataContext: React.Context<any> = createContext<TableSizeData[] | null>(null);

/**
 * APIにリクエストを送信する
 * @param endtime
 */
const fetchDataFromApi = async (endtime: Date) => {
  const datname = yatagarasuSettings?.dbname;

  // 投げるクエリ
  const sizeQuery = `pg_stat_user_tables_size_bytes{datname="${datname}"}/1048576`;
  const deadTupleRatioQuery = `pg_stat_user_tables_n_dead_tup{datname="${datname}"}/(pg_stat_user_tables_n_dead_tup{datname="${datname}"}+pg_stat_user_tables_n_live_tup{datname="${datname}"})*100`;
  const lastAnalyzedQuery = `pg_stat_user_tables_last_autoanalyze{datname="${datname}"}`;
  const lastVacuumedQuery = `pg_stat_user_tables_last_autovacuum{datname="${datname}"}`;

  // データ取得
  const { status: sizeStatus, data: sizeData } = await invokeQuery<QueryResponse<PgStatUserTableMetrics>>(sizeQuery, endtime);
  const { status: deadTupleRatioStatus, data: deadTupleRatioData } = await invokeQuery<QueryResponse<PgStatUserTableMetrics>>(deadTupleRatioQuery, endtime);
  const { status: lastAnalyzedStatus, data: lastAnalyzedData } = await invokeQuery<QueryResponse<PgStatUserTableMetrics>>(lastAnalyzedQuery, endtime);
  const { status: lastVacuumedStatus, data: lastVacuumedData } = await invokeQuery<QueryResponse<PgStatUserTableMetrics>>(lastVacuumedQuery, endtime);

  // ステータスコードの判定
  const status = Math.max(sizeStatus, deadTupleRatioStatus, lastAnalyzedStatus, lastVacuumedStatus);

  // データの整形
  const sizeObj = sizeData.data.result.reduce((acc: { [key: string]: { table: string, schema: string; size: number } }, item) => {
    acc[item.metric.relname] = { table: item.metric.relname, schema: item.metric.schemaname, size: Number(item.value[1]) };
    return acc;
  }, {});

  const deadTupleRatioObj = deadTupleRatioData.data.result.reduce((acc: { [key: string]: { table: string, schema: string; deadTupleRatio: number } }, item) => {
    acc[item.metric.relname] = { table: item.metric.relname, schema: item.metric.schemaname, deadTupleRatio: Number(item.value[1]) };
    return acc;
  }, {});

  const lastAnalyzedObj = lastAnalyzedData.data.result.reduce((acc: { [key: string]: { table: string, schema: string; lastAnalyzed: string } }, item) => {
    const lastAnalyzed = item.value[1] === '0' ? '未実行' : DateTostring(unixTimeToDate(Number(item.value[1])));
    acc[item.metric.relname] = { table: item.metric.relname, schema: item.metric.schemaname, lastAnalyzed: lastAnalyzed };
    return acc;
  }, {});

  const lastVacuumedObj = lastVacuumedData.data.result.reduce((acc: { [key: string]: { table: string, schema: string; lastVacuumed: string } }, item) => {
    const lastVacuumed = item.value[1] === '0' ? '未実行' : DateTostring(unixTimeToDate(Number(item.value[1])));
    acc[item.metric.relname] = { table: item.metric.relname, schema: item.metric.schemaname, lastVacuumed: lastVacuumed };
    return acc;
  }, {});

  const data: TableSizeData[] = [];
  Object.keys(sizeObj).forEach((table) => {
    data.push({ ...sizeObj[table], ...deadTupleRatioObj[table], ...lastAnalyzedObj[table], ...lastVacuumedObj[table] });
  });

  return { status: status, data: data };
}

/**
 * テーブルサイズのデータプロバイダ
 * @param children
 * @param endtime
 */
export const TableSizeProvider: React.FC<TableSizeProviderProps> = ({ children, endtime }) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<TableSizeData[] | null>(null);

  useEffect(() => {
    setData(null);
    const fetchData = async () => {
      const { status, data } = await fetchDataFromApi(endtime);
      setStatusCode(status);
      setData(data);
    }
    void fetchData();
  }, [endtime]);

  return (
      <DataContext.Provider value={data}>
        {children}
      </DataContext.Provider>
  );
}

export const useTableSize = (): TableSizeData[] => useContext(DataContext);
