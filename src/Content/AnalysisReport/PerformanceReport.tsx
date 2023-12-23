import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {CPUUsageRatio, getCPUUsageRatioStatus} from "./ReportingItem/CPUUsageRatio";
import {MemorySwapIO, getMemorySwapIOStatus} from "./ReportingItem/MemorySwapIO";
import {CheckPointProgress, getCheckPointProgressStatus} from "./ReportingItem/CheckpointProgress";
import {StatusType} from "./AnalysisReportUtil";
import {useCPUUsageRatio} from "./DataProvider/CPUUsageRatioProvider";
import {useMemorySwapIO} from "./DataProvider/MemorySwapIOProvider";
import {useCheckpointProgress} from "./DataProvider/CheckpointProgressProvider";

/**
 * パフォーマンスのステータスを取得する
 */
export const getPerformanceStatus = (): StatusType | null => {
  const statusList: (StatusType | null)[] = [
    getMemorySwapIOStatus(),
    getCPUUsageRatioStatus(),
    getCheckPointProgressStatus(),
  ];

  if (statusList.includes(null))      return null;
  if (statusList.includes('ERROR'))   return 'ERROR';
  if (statusList.includes('WARNING')) return 'WARNING';
  return 'OK';
}

/**
 * パフォーマンス診断部分のJSX
 */
export const PerformanceReport: React.FC = () => {
  return (
    <Card sx={{ marginTop: '1vh' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            パフォーマンス
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', p: '1.5', marginTop: '1vh', marginLeft: '1vw' }}>
          <CPUUsageRatio data={useCPUUsageRatio()}/>
          <MemorySwapIO data={useMemorySwapIO()}/>
          <CheckPointProgress data={useCheckpointProgress()}/>
        </Box>
      </CardContent>
    </Card>
  );
};
