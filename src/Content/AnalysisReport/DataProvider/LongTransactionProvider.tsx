import React, {createContext, useContext, useEffect, useState} from "react";
import yatagarasuSettings from "../../../Component/Redux/YatagarasuSettings";
import {invokeQuery, QueryResponse} from "../../../Component/Common/PrometheusClient";
import {unixTimeToDate} from "../../../Component/Common/Util";

/**
 * データプロバイダのプロパティ
 */
interface LongTransactionProviderProps {
  children: React.ReactNode;
  endtime: Date;
}

/**
 * 長時間トランザクションのデータ
 */
export interface LongTransactionData {
  client: string;
  start_at: string;
  duration: number;
  state: string;
}

interface LongTransactionMetric {
  server: string;
  state: string;
}

/**
 * 長時間トランザクションのデータプロバイダ
 */
const DataContext: React.Context<any> = createContext<LongTransactionData[] | null>(null);

/**
 * APIにリクエストを送信する
 * @param endtime
 */
const fetchDataFromAPI = async (endtime: Date) => {
  const query = `pg_stat_activity_max_tx_duration{datname="${yatagarasuSettings?.dbname}"}>300`;
  const {status: status, data: res } = await invokeQuery<QueryResponse<LongTransactionMetric>>(query, endtime);

  const data: LongTransactionData[] = res.data.result.map((result) => {
    return {
      client: result.metric.server.split(':')[0],
      start_at: unixTimeToDate(endtime.getTime() / 1000 - Number(result.value[1])).toLocaleString(),
      duration: Math.round(Number(result.value[1])),
      state: result.metric.state
    };
  });

  return {status: status, data: data};
}

/**
 * 長時間トランザクションのデータプロバイダ
 * @param children
 * @param starttime
 * @param endtime
 */
export const LongTransactionProvider: React.FC<LongTransactionProviderProps> = ({ children, endtime }) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<LongTransactionData[] | null>(null);

  useEffect(() => {
    setData(null);
    const fetchData = async () => {
      const {status, data} = await fetchDataFromAPI(endtime);
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

export const useLongTransaction = (): LongTransactionData[] => useContext(DataContext);
