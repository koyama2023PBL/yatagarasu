/**
 * メモリスワップI/Oのデータプロバイダ
 */
import React, { createContext, useState, useContext, useEffect } from 'react';
import {getRange, unixTimeToDate} from "../../../Component/Common/Util";
import instance from "../../../Axios/AxiosInstance";

/**
 * データプロバイダのプロパティ
 */
interface MemorySwapIOProviderProps {
  children: React.ReactNode;
  starttime: Date;
  endtime: Date;
  scrapeInterval: string;
}

/**
 * メモリスワップI/Oのデータ
 */
export interface MemorySwapIOData {
  datetime: string;
  swapIn: number;
  swapOut: number;
}

/**
 *
 */
const DataContext: React.Context<any> = createContext<MemorySwapIOData[] | null>(null);

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
  const endpointIn  = `/api/v1/query_range?query=node_vmstat_pswpin&start=${startTimeRfc3339}&end=${endTimeRfc3339}&step=${range}`
  const endpointOut = `/api/v1/query_range?query=node_vmstat_pswpout&start=${startTimeRfc3339}&end=${endTimeRfc3339}&step=${range}`
  const responseIn  = await instance.get(endpointIn);
  const responseOut = await instance.get(endpointOut);

  const mergedResponse: MemorySwapIOData[] = responseIn.data.data.result[0].values.map((e: [number, string], i: number) => ({
    datetime: unixTimeToDate(e[0]).toLocaleString(),
    swapIn  : Number(e[1]),
    swapOut : Number(responseOut.data.data.result[0].values[i][1]),
  }));

  return { status: responseIn.status, data: mergedResponse };
}

/**
 * メモリスワップI/Oのデータプロバイダ
 * @param children
 * @param starttime
 * @param endtime
 * @param scrapeInterval
 * @constructor
 */
export const MemorySwapIOProvider: React.FC<MemorySwapIOProviderProps> = ({children, starttime, endtime, scrapeInterval}) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<MemorySwapIOData[] | null>(null);

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

export const useMemorySwapIO = () => useContext(DataContext);
