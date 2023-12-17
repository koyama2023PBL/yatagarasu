import {getDiskUsageStatus, DiskUsage} from "./ReportingItem/DiskUsage";
import {DiskBusyRatio, getDiskBusyRatioStatus} from "./ReportingItem/DiskBusyRatio";
import {CPUIOWaitRatio, getCPUIOWaitRatioStatus} from "./ReportingItem/CPUIOWaitRatio";
import {Box, Card, CardContent, Typography} from "@mui/material";
import React from "react";
import {StatusType} from "./AnalysisReportUtil";
import {useSettings} from "../../settingContext";

/**
 * ディスク診断のステータスを取得する
 */
export const getDiskStatus = (): StatusType | null => {
  const statusList: (StatusType | null)[] = [
    getCPUIOWaitRatioStatus(),
    getDiskBusyRatioStatus(),
    getDiskUsageStatus(),
  ];

  if (statusList.includes(null))      return null;
  if (statusList.includes('ERROR'))   return 'ERROR';
  if (statusList.includes('WARNING')) return 'WARNING';
  return 'OK';
}

/**
 * ディスク診断部分のコンポーネント
 */
export const DiskReport: React.FC = () => {
  const settings = useSettings();
  return (
    <Card sx={{ marginTop: '1vh' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            {settings?.baseURL}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', p: '1.5', marginTop: '1vh', marginLeft: '1vw' }}>
          <CPUIOWaitRatio />
          <DiskBusyRatio />
          <DiskUsage />
        </Box>
      </CardContent>
    </Card>
  );
}
