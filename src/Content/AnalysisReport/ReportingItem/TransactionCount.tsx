import {ReportingItemProps, StatusType} from "../AnalysisReportUtil";
import {TransactionCountData} from "../DataProvider/TransactionCountProvider";
import React from "react";

/**
 * トランザクション数のステータスを取得する
 */
export const getTransactionCountStatus = (): StatusType | null => {
  return null;
}

/**
 * トランザクション数のコンポーネント
 * @param data
 */
export const TransactionCount: React.FC<ReportingItemProps<TransactionCountData[]>> = ({data}) => {
  return (<div/>);
}
