/**
 * 診断レポート機能のパフォーマンス診断部分のコンポーネント
 */
import React from "react";
import {StatusType} from "./ReportingOverview";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {CPUUsageRatio} from "./ReportingItem/CPUUsageRatio";
import {MemorySwapIO, getMemorySwapIOStatus} from "./ReportingItem/MemorySwapIO";
import {CheckPointProgress} from "./ReportingItem/CheckpointProgress";


/**
 * パフォーマンスのステータスを取得する
 */
const getPerformanceStatus = (): StatusType | null => {
  const memorySwapIOStatus: StatusType | null = getMemorySwapIOStatus();

  if ([memorySwapIOStatus].includes(null)) {
    return null;
  }

  if ([memorySwapIOStatus].includes('ERROR')) {
    return 'ERROR';
  }

  if ([memorySwapIOStatus].includes('WARNING')) {
    return 'WARNING';
  }

  return 'OK';
}

/**
 * パフォーマンス診断部分のJSX
 */
const PerformanceReport: React.FC = () => {
  return (
    <Card sx={{ marginTop: '1vh' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            パフォーマンス
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', p: '1.5', marginTop: '1vh', marginLeft: '2vw' }}>
          <CPUUsageRatio />
          <MemorySwapIO />
          <CheckPointProgress />
        </Box>
      </CardContent>
    </Card>
  );
};

export {PerformanceReport, getPerformanceStatus};
