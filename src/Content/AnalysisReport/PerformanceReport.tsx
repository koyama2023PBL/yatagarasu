import React from "react";
import {StatusType} from "./ReportingOverview";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {CPUUsageRatio} from "./ReportingItem/CPUUsageRatio";
import {MemorySwapIO} from "./ReportingItem/MemorySwapIO";
import {CheckPointProgress} from "./ReportingItem/CheckpointProgress";

const getPerformanceStatus = (): StatusType => {
  return 'OK';
}

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
