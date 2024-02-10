import React, {createContext, useContext, useEffect, useState} from "react";
import yatagarasuSettings from "../../../Component/Redux/YatagarasuSettings";
import {
  invokeQueryRange,
  QueryRangeResponse,
} from "../../../Component/Common/PrometheusClient";
import {unixTimeToDate} from "../../../Component/Common/Util";
import {prometheusSettings} from "../../../Component/Redux/PrometheusSettings";

/**
 * データプロバイダのプロパティ
 */
interface LongTransactionProviderProps {
  children: React.ReactNode;
  starttime: Date;
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
 * @param starttime
 * @param endtime
 */
const fetchDataFromAPI = async (starttime: Date, endtime: Date) => {
  const query = `pg_stat_activity_max_tx_duration{datname="${yatagarasuSettings?.dbname}"}>300`;
  const {status: status, data: res}
      = await invokeQueryRange<QueryRangeResponse<LongTransactionMetric>>(query, starttime, endtime, prometheusSettings?.postgresqlScrapeInterval);

  const data: LongTransactionData[] = [];

  res.data.result.forEach((result) => {
    let last_time = 0;
    let last_during = 0;
    result.values.forEach((value) => {
      const during = Number(value[1]);
      if (during > last_during) {
        last_time = value[0];
        last_during = during;
        return;
      }
      data.push({
        client: result.metric.server.split(':')[0],
        start_at: unixTimeToDate(last_time - last_during).toLocaleString(),
        duration: Math.round(Number(last_during)),
        state: result.metric.state
      });
      last_during = 0;
    });
    data.push({
      client: result.metric.server.split(':')[0],
      start_at: unixTimeToDate(last_time - last_during).toLocaleString(),
      duration: Math.round(Number(last_during)),
      state: result.metric.state
    });
  });

  res.data.result.map((result) => {
    const value = result.values[result.values.length - 1];
    return {
      client: result.metric.server.split(':')[0],
      start_at: unixTimeToDate(value[0] - Number(value[1])).toLocaleString(),
      duration: Math.round(Number(value[1])),
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
export const LongTransactionProvider: React.FC<LongTransactionProviderProps> = ({ children, starttime, endtime }) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<LongTransactionData[] | null>(null);

  useEffect(() => {
    setData(null);
    const fetchData = async () => {
      const {status, data} = await fetchDataFromAPI(starttime, endtime);
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
