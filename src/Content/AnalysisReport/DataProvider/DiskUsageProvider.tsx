import React, {createContext, useContext, useEffect, useState} from "react";
import {getRange, unixTimeToDate} from "../../../Component/Common/Util";
import instance from "../../../Axios/AxiosInstance";

/**
 * データプロバイダのプロパティ
 */
interface DiskUsageProviderProps {
  children: React.ReactNode;
  starttime: Date;
  endtime: Date;
  scrapeInterval: string;
}

/**
 * ディスク使用率のデータ
 */
export interface DiskUsageData {
  datetime: string;
  usage: number;
}

/**
 *
 */
const DataContext: React.Context<any> = createContext<DiskUsageData[] | null>(null);

/**
 * APIにリクエストを送信する
 * @param starttime
 * @param endtime
 * @param scrapeInterval
 */
const fetchFromAPIwithRequest = async (starttime: Date, endtime: Date, scrapeInterval: string) => {
  const startTimeRfc3339 = starttime.toISOString();
  const endTimeRfc3339 = endtime.toISOString();
  const range = getRange(scrapeInterval);
  const endpoint  = `/api/v1/query_range`
                         + `?query=100-SUM(node_filesystem_avail_bytes)\/SUM(node_filesystem_size_bytes)*100`
                         + `&start=${startTimeRfc3339}&end=${endTimeRfc3339}&step=${range}`
  const response = await instance.get(endpoint);
  const data: DiskUsageData[] = response.data.data.result[0].values.map((item: [number, string]) => {
    return {
      datetime: unixTimeToDate(item[0]).toLocaleString(),
      usage: Number(item[1])
    };
  });
  return {status: response.status, data: data};
}

/**
 * ディスク使用率のデータプロバイダ
 * @param children
 * @param starttime
 * @param endtime
 * @param scrapeInterval
 */
export const DiskUsageProvider: React.FC<DiskUsageProviderProps> = ({ children, starttime, endtime, scrapeInterval }) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<DiskUsageData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const {status, data} = await fetchFromAPIwithRequest(starttime, endtime, scrapeInterval);
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

export const useDiskUsage = (): DiskUsageData[] => useContext(DataContext);
