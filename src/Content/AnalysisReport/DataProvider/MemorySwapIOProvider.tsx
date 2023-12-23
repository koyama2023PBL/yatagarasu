import React, { createContext, useState, useContext, useEffect } from 'react';
import {unixTimeToDate} from "../../../Component/Common/Util";
import {invokeQueryRange, QueryRangeResponse} from "../../../Component/Common/PrometheusClient";
import {prometheusSettings} from "../../../Component/Redux/PrometheusSettings";

/**
 * データプロバイダのプロパティ
 */
interface MemorySwapIOProviderProps {
  children: React.ReactNode;
  starttime: Date;
  endtime: Date;
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
 */
const fetchFromAPIwithRequest = async (starttime: Date, endtime: Date) => {
  const { status: statusIn , data: dataIn  } = await invokeQueryRange<QueryRangeResponse<any>>('node_vmstat_pswpin',  starttime, endtime, prometheusSettings?.nodeScrapeInterval);
  const { status: statusOut, data: dataOut } = await invokeQueryRange<QueryRangeResponse<any>>('node_vmstat_pswpout', starttime, endtime, prometheusSettings?.nodeScrapeInterval);

  const mergedResponse: MemorySwapIOData[] = dataIn.data.result[0].values.map(([timestamp, value], i: number) => ({
    datetime: unixTimeToDate(timestamp).toLocaleString(),
    swapIn  : Number(value),
    swapOut : Number(dataOut.data.result[0].values[i][1]),
  }));

  return { status: Math.max(statusIn, statusOut), data: mergedResponse };
}

/**
 * メモリスワップI/Oのデータプロバイダ
 * @param children
 * @param starttime
 * @param endtime
 * @param scrapeInterval
 * @constructor
 */
export const MemorySwapIOProvider: React.FC<MemorySwapIOProviderProps> = ({children, starttime, endtime}) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<MemorySwapIOData[] | null>(null);

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

export const useMemorySwapIO = () => useContext(DataContext);
