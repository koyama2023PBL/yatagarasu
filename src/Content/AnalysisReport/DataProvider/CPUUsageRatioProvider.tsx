/**
 * CPU使用率のデータプロバイダ
 */
import React, {createContext, useContext, useEffect, useState} from "react";
import {getRange, unixTimeToDate} from "../../../Component/Common/Util";
import instance from "../../../Axios/AxiosInstance";


/**
 * データプロバイダのプロパティ
 */
interface CPUUsageRatioProps {
  children: React.ReactNode;
  starttime: Date;
  endtime: Date;
  scrapeInterval: string;
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
 * メトリクスのアイテム
 */
interface MetricItem {
  metric: {
    mode: string;
  };
  values: [];
}

/**
 *
 */
const DataContext: React.Context<any> = createContext<CPUUsageRatioData[] | null>(null);

/**
 * APIでデータを取得して整形します。
 * @param starttime
 * @param endtime
 * @param scrapeInterval
 */
const fetchFromAPIwithRequest = async (starttime: Date, endtime: Date, scrapeInterval: string) => {
  // APIからデータを取得
  const startTimeRfc3339 = starttime.toISOString();
  const endTimeRfc3339 = endtime.toISOString();
  const range = getRange(scrapeInterval);
  const endpoint  = `/api/v1/query_range?query=node_cpu_seconds_total&start=${startTimeRfc3339}&end=${endTimeRfc3339}&step=${range}`
  const response = await instance.get(endpoint);

  // データを取得日時で束ねる
  const result: { [key: string]: any } = {};  // <datetime: {mode: usage}>
  response.data.data.result.forEach((item: MetricItem) => {
    const mode: string = item.metric.mode;

    item.values.forEach((value: [timestamp: number, usage: string]) => {
      const datetime = unixTimeToDate(value[0]).toLocaleString();
      const usage = Number(value[1]);

      if (!result[datetime]) {
        result[datetime] = {};
      }

      if (!result[datetime][mode]) {
        result[datetime][mode] = 0;
      }

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

  return { status: response.status, data: data};
}

export const CPUUsageRatioProvider: React.FC<CPUUsageRatioProps> = ({children, starttime, endtime, scrapeInterval}) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<CPUUsageRatioData[] | null>(null);

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

export const userCPUUsageRatio = () => useContext(DataContext);
