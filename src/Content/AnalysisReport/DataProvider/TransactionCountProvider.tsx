import React, {createContext, useContext, useEffect, useState} from "react";
import yatagarasuSettings from "../../../Component/Redux/YatagarasuSettings";
import {
  invokeQuery,
  invokeQueryRange,
  QueryRangeResponse,
  QueryResponse
} from "../../../Component/Common/PrometheusClient";
import {prometheusSettings} from "../../../Component/Redux/PrometheusSettings";
import {unixTimeToDate} from "../../../Component/Common/Util";

/**
 * データプロバイダのプロパティ
 */
interface TransactionCountProviderProps {
  children: React.ReactNode;
  starttime: Date;
  endtime: Date;
}

/**
 * トランザクション数のデータ
 */
export interface TransactionCountData {
  datetime: string;
  max_transaction: number;
  transaction_count: number
}

/**
 * トランザクション数のデータプロバイダ
 */
const DataContext: React.Context<any> = createContext<TransactionCountData[] | null>(null);

/**
 * APIにリクエストを送信する
 * @param starttime
 * @param endtime
 */
const fetchDataFromAPI = async (starttime: Date, endtime: Date) => {
  const queryMax  = 'pg_settings_max_connections';
  const queryCount = `pg_stat_activity_count{datname="${yatagarasuSettings?.dbname}",state="active"}`;

  const { status: statusMax,   data: resMax }   = await invokeQuery<QueryResponse<any>>(queryMax, endtime);
  const { status: statusCount, data: resCount } = await invokeQueryRange<QueryRangeResponse<any>>(queryCount, starttime, endtime, prometheusSettings?.postgresqlScrapeInterval);

  const maxConnections = Number(resMax.data.result[0].value[1]);
  const data: TransactionCountData[] = resCount.data.result[0].values.map(([timestamp, value]) => {
    return {
      datetime: unixTimeToDate(timestamp).toLocaleString(),
      max_transaction: maxConnections,
      transaction_count: Number(value)
    };
  });

  return {status: Math.max(statusMax, statusCount), data: data};
}

/**
 * トランザクション数のデータプロバイダ
 * @param children
 * @param starttime
 * @param endtime
 */
export const TransactionCountProvider: React.FC<TransactionCountProviderProps> = ({ children, starttime, endtime }) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<TransactionCountData[] | null>(null);

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

export const useTransactionCount = (): TransactionCountData[] => useContext(DataContext);
