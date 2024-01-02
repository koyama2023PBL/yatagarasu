import React, {createContext, useContext, useEffect, useState} from "react";

/**
 * データプロバイダのプロパティ
 */
interface LongTransactionProviderProps {
  children: React.ReactNode;
  endtime: Date;
}

/**
 * 長時間トランザクションのデータ
 */
export interface LongTransactionData {
  client: string;
  start_at: string;
  duration: number;
  state: string;
}

/**
 * 長時間トランザクションのデータプロバイダ
 */
const DataContext: React.Context<any> = createContext<LongTransactionData[] | null>(null);

/**
 * APIにリクエストを送信する
 * @param endtime
 */
const fetchDataFromAPI = async (endtime: Date) => {
  return {status: 0, data: null};
}

/**
 * 長時間トランザクションのデータプロバイダ
 * @param children
 * @param starttime
 * @param endtime
 */
export const LongTransactionProvider: React.FC<LongTransactionProviderProps> = ({ children, endtime }) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<LongTransactionData | null>(null);

  useEffect(() => {
    setData(null);
    const fetchData = async () => {
      const {status, data} = await fetchDataFromAPI(endtime);
      setStatusCode(status);
      setData(data);
    }
    void fetchData();
  }, [endtime]);

  return (
      <DataContext.Provider value={data}>
        {children}
      </DataContext.Provider>
  );
}

export const useLongTransaction = (): LongTransactionData[] => useContext(DataContext);
