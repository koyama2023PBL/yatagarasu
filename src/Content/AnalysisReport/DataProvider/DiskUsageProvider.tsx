import React, {createContext, useContext, useEffect, useState} from "react";
import {unixTimeToDate} from "../../../Component/Common/Util";
import {invokeQueryRange, QueryRangeResponse} from "../../../Component/Common/PrometheusClient";
import {prometheusSettings} from "../../../Component/Redux/PrometheusSettings";

/**
 * データプロバイダのプロパティ
 */
interface DiskUsageProviderProps {
  children: React.ReactNode;
  starttime: Date;
  endtime: Date;
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
 */
const fetchFromAPIwithRequest = async (starttime: Date, endtime: Date) => {
  const query  = `100-SUM(node_filesystem_avail_bytes)\/SUM(node_filesystem_size_bytes)*100`;
  const { status: status, data: response }
      = await invokeQueryRange<QueryRangeResponse<any>>(query, starttime, endtime, prometheusSettings?.nodeScrapeInterval);

  const data: DiskUsageData[] = response.data.result[0].values.map(([timestamp, value]) => {
    return {
      datetime: unixTimeToDate(timestamp).toLocaleString(),
      usage: Number(value)
    };
  });
  return {status: status, data: data};
}

/**
 * ディスク使用率のデータプロバイダ
 * @param children
 * @param starttime
 * @param endtime
 */
export const DiskUsageProvider: React.FC<DiskUsageProviderProps> = ({ children, starttime, endtime }) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<DiskUsageData[] | null>(null);

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

export const useDiskUsage = (): DiskUsageData[] => useContext(DataContext);
