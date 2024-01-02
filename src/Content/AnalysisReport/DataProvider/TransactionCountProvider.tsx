import React, {createContext, useContext, useEffect, useState} from "react";

/**
 * データプロバイダのプロパティ
 */
interface TransactionCountProviderProps {
  children: React.ReactNode;
  starttime: Date;
  endtime: Date;
}

/**
 * トランザクション数のデータ
 */
export interface TransactionCountData {
  datetime: string;
  max_transaction: number;
  transaction_count: number
}

/**
 * トランザクション数のデータプロバイダ
 */
const DataContext: React.Context<any> = createContext<TransactionCountData[] | null>(null);

/**
 * APIにリクエストを送信する
 * @param starttime
 * @param endtime
 */
const fetchDataFromAPI = async (starttime: Date, endtime: Date) => {
  return {status: 0, data: null};
}

/**
 * トランザクション数のデータプロバイダ
 * @param children
 * @param starttime
 * @param endtime
 */
export const TransactionCountProvider: React.FC<TransactionCountProviderProps> = ({ children, starttime, endtime }) => {
  const [, setStatusCode] = useState<number | null>(null);
  const [data, setData] = useState<TransactionCountData[] | null>(null);

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

export const useTransactionCount = (): TransactionCountData[] => useContext(DataContext);
