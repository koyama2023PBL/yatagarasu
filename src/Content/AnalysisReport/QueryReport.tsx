import {StatusType} from "./AnalysisReportUtil";
import {getTransactionCountStatus, TransactionCount} from "./ReportingItem/TransactionCount";
import {getLongTransactionStatus, LongTransaction} from "./ReportingItem/LongTransaction";
import {getHighLoadQueryStatus, HighLoadQuery} from "./ReportingItem/HighLoadQuery";
import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {useTransactionCount} from "./DataProvider/TransactionCountProvider";
import {useLongTransaction} from "./DataProvider/LongTransactionProvider";
import {useHighLoadQuery} from "./DataProvider/HighLoadQueryProvider";

export const getQueryStatus = (): StatusType | null => {
  const statusList: (StatusType | null)[] = [
    getTransactionCountStatus(),
    getLongTransactionStatus(),
    getHighLoadQueryStatus(),
  ];

  if (statusList.includes(null)) return null;
  if (statusList.includes('ERROR')) return 'ERROR';
  if (statusList.includes('WARNING')) return 'WARNING';
  return 'OK';
}

/**
 * クエリ診断部分のコンポーネント
 */
export const QueryReport: React.FC = () => {
  return (
    <Card sx={{ marginTop: '1vh' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            クエリ
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', p: '1.5', marginTop: '1vh', marginLeft: '1vw' }}>
          <TransactionCount data={useTransactionCount()}/>
          <LongTransaction  data={useLongTransaction()} />
          <HighLoadQuery    data={useHighLoadQuery()}   />
        </Box>
      </CardContent>
    </Card>
  );
}
