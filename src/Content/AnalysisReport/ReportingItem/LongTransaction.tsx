import {ReportingItemProps, StatusType} from "../AnalysisReportUtil";
import {LongTransactionData} from "../DataProvider/LongTransactionProvider";
import React from "react";

/**
 * 長時間トランザクションのステータスを取得する
 */
export const getLongTransactionStatus = (): StatusType | null => {
  return null;
}

/**
 * 長時間トランザクションのコンポーネント
 * @param data
 */
export const LongTransaction: React.FC<ReportingItemProps<LongTransactionData[]>> = ({data}) => {
  return (<div/>);
}
