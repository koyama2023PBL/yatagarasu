import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {CPUUsageRatio, getCPUUsageRatioStatus} from "./ReportingItem/CPUUsageRatio";
import {MemorySwapIO, getMemorySwapIOStatus} from "./ReportingItem/MemorySwapIO";
import {CheckPointProgress, getCheckPointProgressStatus} from "./ReportingItem/CheckpointProgress";
import {StatusType} from "./AnalysisReportUtil";

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
          <CPUUsageRatio />
          <MemorySwapIO />
          <CheckPointProgress />
        </Box>
      </CardContent>
    </Card>
  );
};
