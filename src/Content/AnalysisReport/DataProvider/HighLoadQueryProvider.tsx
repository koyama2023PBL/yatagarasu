import React, {createContext, useContext, useEffect, useState} from "react";

/**
 * データプロバイダのプロパティ
 */
interface HighLoadQueryProviderProps {
  children: React.ReactNode;
  starttime: Date;
  endtime: Date;
}

/**
 * 高負荷クエリのデータ
 */
export interface HighLoadQueryData {
  queryid: number;
  query: string;
  calls: number;
  total_time: number;
  mean_time: number;
}

/**
 * 高負荷クエリのデータプロバイダ
 */
const DataContext: React.Context<any> = createContext<HighLoadQueryData | null>(null);

/**
 * APIにリクエストを送信する
 * @param starttime
 * @param endtime
 */
const fetchDataFromAPI = async (starttime: Date, endtime: Date) => {
  return {status: 0, data: null};
}

/**
 * 高負荷クエリのデータプロバイダ
 * @param children
 * @param starttime
 * @param endtime
 */
export const HighLoadQueryProvider: React.FC<HighLoadQueryProviderProps> = ({ children, starttime, endtime }) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<HighLoadQueryData[] | null>(null);

  useEffect(() => {
    setData(null);
    const fetchData = async () => {
      const {status, data} = await fetchDataFromAPI(starttime, endtime);
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

export const useHighLoadQuery = (): HighLoadQueryData[] => useContext(DataContext);
