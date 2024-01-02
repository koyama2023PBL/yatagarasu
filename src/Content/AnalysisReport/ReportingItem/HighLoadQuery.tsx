import React from "react";
import {ReportingItemProps, StatusType} from "../AnalysisReportUtil";
import {HighLoadQueryData} from "../DataProvider/HighLoadQueryProvider";

/**
 * 高負荷クエリのステータスを取得する
 */
export const getHighLoadQueryStatus = (): StatusType | null => {
  return null;
}

/**
 * 高負荷クエリのコンポーネント
 * @param data
 */
export const HighLoadQuery: React.FC<ReportingItemProps<HighLoadQueryData[]>> = ({data}) => {
  return (<div/>);
}
