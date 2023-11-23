import React, {createContext, useContext, useEffect, useState} from "react";
import yatagarasuSettings from "../../../Component/Redux/YatagarasuSettings";
import instance from "../../../Axios/AxiosInstance";
import {getRange} from "../../../Component/Common/Util";

/**
 * データプロバイダのプロパティ
 */
interface CheckpointProgressProps {
  children: React.ReactNode;
  starttime: Date;
  endtime: Date;
  scrapeInterval: string;
}

/**
 * チェックポイント実行状況のデータ
 */
export interface CheckpointProgressData {
  timed: number;
  req: number;
}

/**
 *
 */
const DataContext: React.Context<CheckpointProgressData | null> = createContext<CheckpointProgressData | null>(null);

/**
 * APIでデータを取得して整形します。
 * @param starttime
 * @param endtime
 * @param scrapeInterval
 */
const fetchFromAPIwithRequest = async (starttime: Date, endtime: Date, scrapeInterval: string) => {
  const startTimeRfc3339 = starttime.toISOString();
  const endTimeRfc3339 = endtime.toISOString();
  const range = getRange(scrapeInterval);
  const endpointTimed  = `/api/v1/query_range?query=pg_stat_bgwriter_checkpoints_timed_total{job="${yatagarasuSettings.postgresExporterJobName}"}&start=${startTimeRfc3339}&end=${endTimeRfc3339}&step=${range}`
  const endpointReq  = `/api/v1/query_range?query=pg_stat_bgwriter_checkpoints_req_total{job="${yatagarasuSettings.postgresExporterJobName}"}&start=${startTimeRfc3339}&end=${endTimeRfc3339}&step=${range}`
  const responseTimed = await instance.get(endpointTimed);
  const responseReq = await instance.get(endpointReq);

  const countsTimed: number[] = responseTimed.data.data.result[0].values.map((item: [string, number]) => Number(item[1]));
  const countsReq  : number[] = responseReq.data.data.result[0].values.map((item: [string, number]) => Number(item[1]));

  return {
    status: responseTimed.status,
    data: {
      timed: Math.max(...countsTimed) - Math.min(...countsTimed),
      req:   Math.max(...countsReq)   - Math.min(...countsReq),
    }
  };
}

/**
 * チェックポイント実行状況のデータプロバイダ
 * @param children
 * @param starttime
 * @param endtime
 */
export const CheckpointProgressProvider: React.FC<CheckpointProgressProps> = ({ children, starttime, endtime , scrapeInterval}) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<CheckpointProgressData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const {status, data} = await fetchFromAPIwithRequest(new Date(starttime), new Date(endtime), scrapeInterval);
      setStatusCode(status);
      setData(data);
    }
    void fetchData();
  }, [starttime, endtime, scrapeInterval]);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
}

export const useCheckpointProgress = () => useContext(DataContext);
