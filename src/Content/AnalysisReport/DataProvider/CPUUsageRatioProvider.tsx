import React, {createContext, useContext, useEffect, useState} from "react";
import {unixTimeToDate} from "../../../Component/Common/Util";
import {invokeQueryRange, QueryRangeResponse, QueryRangeResult} from "../../../Component/Common/PrometheusClient";
import {prometheusSettings} from "../../../Component/Redux/PrometheusSettings";

/**
 * データプロバイダのプロパティ
 */
interface CPUUsageRatioProps {
  children: React.ReactNode;
  starttime: Date;
  endtime: Date;
}

/**
 * CPU使用率のデータ
 */
export interface CPUUsageRatioData {
  datetime: string;
  user: number;
  system: number;
  ioWait: number;
  idle: number;
}

/**
 * メトリクス
 */
interface CPUUsageRatioMetric {
  mode: string;
}

/**
 *
 */
const DataContext: React.Context<any> = createContext<CPUUsageRatioData[] | null>(null);

/**
 * APIでデータを取得して整形します。
 * @param starttime
 * @param endtime
 */
const fetchFromAPIwithRequest = async (starttime: Date, endtime: Date) => {
  // APIからデータを取得
  const { status: status, data: response }
      = await invokeQueryRange<QueryRangeResponse<CPUUsageRatioMetric>>('node_cpu_seconds_total', starttime, endtime, prometheusSettings?.nodeScrapeInterval);

  // データを取得日時で束ねる
  const result: { [key: string]: any } = {};  // <datetime: {mode: usage}>
  response.data.result.forEach((item: QueryRangeResult<CPUUsageRatioMetric>) => {
    const mode: string = item.metric.mode;

    item.values.forEach((value: [timestamp: number, usage: string]) => {
      const datetime = unixTimeToDate(value[0]).toLocaleString();
      const usage = Number(value[1]);
      if (!result[datetime]) result[datetime] = {};
      if (!result[datetime][mode]) result[datetime][mode] = 0;
      result[datetime][mode] += usage;
    });
  });

  // データを集計
  const data: CPUUsageRatioData[] = [];
  Object.entries(result).forEach(([datetime, usage]) => {
    const dataItem: CPUUsageRatioData = {
      datetime: datetime,
      user: 0,
      system: 0,
      ioWait: 0,
      idle: 0,
    };

    let total = 0;

    Object.entries(usage).forEach(([mode, usage]) => {
      total += Number(usage);
      if (['user', 'nice'].includes(mode)) {
        dataItem.user += Number(usage);
      } else if (['system', 'irq', 'softirq'].includes(mode)) {
        dataItem.system += Number(usage);
      } else if (['iowait'].includes(mode)) {
        dataItem.ioWait += Number(usage);
      } else if (['idle', 'steal'].includes(mode)) {
        dataItem.idle += Number(usage);
      }
    });

    dataItem.user   = Math.round(dataItem.user   / total * 10000) / 100;
    dataItem.system = Math.round(dataItem.system / total * 10000) / 100;
    dataItem.ioWait = Math.round(dataItem.ioWait / total * 10000) / 100;
    dataItem.idle   = Math.round(dataItem.idle   / total * 10000) / 100;

    data.push(dataItem);
  });
  return { status: status, data: data };
}

export const CPUUsageRatioProvider: React.FC<CPUUsageRatioProps> = ({children, starttime, endtime}) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<CPUUsageRatioData[] | null>(null);

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

export const useCPUUsageRatio = () => useContext(DataContext);
