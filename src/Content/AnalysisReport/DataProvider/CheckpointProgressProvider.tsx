import React, {createContext, useContext, useEffect, useState} from "react";
import yatagarasuSettings from "../../../Component/Redux/YatagarasuSettings";
import {invokeQueryRange, QueryRangeResponse} from "../../../Component/Common/PrometheusClient";
import {prometheusSettings} from "../../../Component/Redux/PrometheusSettings";

/**
 * データプロバイダのプロパティ
 */
interface CheckpointProgressProps {
  children: React.ReactNode;
  starttime: Date;
  endtime: Date;
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
 */
const fetchFromAPIwithRequest = async (starttime: Date, endtime: Date) => {
  const queryTimed  = `pg_stat_bgwriter_checkpoints_timed_total{job="${yatagarasuSettings.postgresExporterJobName}"}`
  const queryReq    = `pg_stat_bgwriter_checkpoints_req_total{job="${yatagarasuSettings.postgresExporterJobName}"}`

  const { status: statusTimed, data: dataTimed } = await invokeQueryRange<QueryRangeResponse<any>>(queryTimed, starttime, endtime, prometheusSettings?.postgresqlScrapeInterval);
  const { status: statusReq,   data: dataReq   } = await invokeQueryRange<QueryRangeResponse<any>>(queryReq,   starttime, endtime, prometheusSettings?.postgresqlScrapeInterval);

  const countsTimed: number[] = dataTimed.data.result[0].values.map(([_timestamp, value]) => Number(value));
  const countsReq  : number[] = dataReq.data.result[0].values.map(([_timestamp, value]) => Number(value));

  return {
    status: Math.max(statusTimed, statusReq),
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
export const CheckpointProgressProvider: React.FC<CheckpointProgressProps> = ({ children, starttime, endtime }) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<CheckpointProgressData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const {status, data} = await fetchFromAPIwithRequest(new Date(starttime), new Date(endtime));
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

export const useCheckpointProgress = () => useContext(DataContext);
