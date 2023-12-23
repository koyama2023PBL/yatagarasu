import React, {createContext, useContext, useEffect, useState} from "react";
import {calcMaxStep, getRange, unixTimeToDate} from "../../../Component/Common/Util";
import instance from "../../../Axios/AxiosInstance";
import {invokeQueryRange, QueryRangeResponse} from "../../../Component/Common/PrometheusClient";
import {prometheusSettings} from "../../../Component/Redux/PrometheusSettings";

/**
 * データプロバイダのプロパティ
 */
interface DiskBusyRatioProviderProps {
  children: React.ReactNode;
  starttime: Date;
  endtime: Date;
}

/**
 * ディスクのビジー率のデータ
 */
export interface DiskBusyRatioData {
  datetime: string;
  ratio: number;
}

/**
 * メトリクスのアイテム
 */
interface MetricItem {
  metric: {
    device: string;
  };
  value: [number, string];
}

/**
 *
 */
const DataContext: React.Context<DiskBusyRatioData[] | null> = createContext<DiskBusyRatioData[] | null>(null);

/**
 * 集計対象のディスクを取得します。
 * IO量の大きい順で、累計値が90%を超えるまでのディスクを集計対象とします。
 * @param datetime 集計する日時
 */
const getTargetDisks = async (datetime: Date) => {
  const response = await instance.get(`/api/v1/query?query=node_disk_io_time_seconds_total&time=${datetime.toISOString()}`);
  const ioObject: {[key: string]: number;} = {};
  response.data.data.result.forEach((item: MetricItem) => {
    const device: string = item.metric.device;
    if (!(device in ioObject)) ioObject[device] = 0;
    ioObject[device] += Number(item.value[1]);
  });
  const total = Object.values(ioObject).reduce((sum, value) => sum + value, 0);
  const sortedEntries = Object.entries(ioObject).sort((a, b) => b[1] - a[1]);
  const targetDisks: string[] = [];
  let cumulative = 0;
  for (const [disk, io] of sortedEntries) {
    cumulative += io;
    targetDisks.push(disk);
    if (cumulative / total > 0.9) {
      break;
    }
  }
  return targetDisks;
}

/**
 * APIにリクエストを送信する
 * @param starttime
 * @param endtime
 */
const fetchFromAPIwithRequest = async (starttime: Date, endtime: Date) => {
  const targetDisks = await getTargetDisks(endtime);
  const range = getRange(calcMaxStep(starttime, endtime, prometheusSettings?.nodeScrapeInterval?? '15s')?? '30s');
  const targetDisksString = targetDisks.join('|');
  const query = `sum(rate(node_disk_io_time_seconds_total{device=~"${targetDisksString}"}[${range}]))`
                     + `\/count(node_disk_io_time_seconds_total{device=~"${targetDisksString}"})*100`;

  const { status: status, data: response }
      = await invokeQueryRange<QueryRangeResponse<any>>(query, starttime, endtime, prometheusSettings?.nodeScrapeInterval);

  const data = response.data.result[0].values.map(([timestamp, value]): DiskBusyRatioData => {
    return {
      datetime: unixTimeToDate(timestamp).toLocaleString(),
      ratio: Number(value)
    };
  });
  return {status: status, data: data};
}

/**
 * ディスクのビジー率のデータプロバイダ
 * @param children
 * @param starttime
 * @param endtime
 * @param scrapeInterval
 */
export const DiskBusyRatioProvider: React.FC<DiskBusyRatioProviderProps> = ({ children, starttime, endtime }) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<DiskBusyRatioData[] | null>(null);

  useEffect(() => {
    setData(null);
    const fetchData = async () => {
      const {status, data} = await fetchFromAPIwithRequest(starttime, endtime);
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

export const useDiskBusyRatio = (): DiskBusyRatioData[] | null => useContext(DataContext);
