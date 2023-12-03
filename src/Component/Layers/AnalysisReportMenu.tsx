import * as React from 'react';
import Box from '@mui/material/Box';
import {useSelector} from "react-redux";
import {RootState} from "../Redux/StateStore";
import {ReportingOverview} from "../../Content/AnalysisReport/ReportingOverview";
import {PerformanceReport} from "../../Content/AnalysisReport/PerformanceReport";
import {MemorySwapIOProvider} from "../../Content/AnalysisReport/DataProvider/MemorySwapIOProvider";
import {CPUUsageRatioProvider} from "../../Content/AnalysisReport/DataProvider/CPUUsageRatioProvider";
import {CheckpointProgressProvider} from "../../Content/AnalysisReport/DataProvider/CheckpointProgressProvider";
import {DiskBusyRatioProvider} from "../../Content/AnalysisReport/DataProvider/DiskBusyRatioProvider";
import {DiskUsageProvider} from "../../Content/AnalysisReport/DataProvider/DiskUsageProvider";
import {DiskReport} from "../../Content/AnalysisReport/DiskReport";

/**
 * 診断レポート画面のメニューのJSX
 */
export const AnalysisReportMenu: React.FC = () => {
  const { from, to } = useSelector((state: RootState) => state.date);
  const starttime = new Date(from);
  const endtime   = new Date(to);

  return (
      <div>
        <MemorySwapIOProvider       starttime={starttime} endtime={endtime}>
        <CPUUsageRatioProvider      starttime={starttime} endtime={endtime}>
        <CheckpointProgressProvider starttime={starttime} endtime={endtime}>
        <DiskBusyRatioProvider      starttime={starttime} endtime={endtime}>
        <DiskUsageProvider          starttime={starttime} endtime={endtime}>
          <Box sx={{p: 1, flexDirection: 'column', alignItems: 'center', marginTop: '0vh', width: '70vw', marginRight: 'auto', marginLeft: 'auto'}}>
            <ReportingOverview />
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', width: '70vw', marginRight: 'auto', marginLeft: 'auto'}}>
            <Box sx={{p: 1, display: 'flex', flexDirection: 'column', marginTop: '-1vh'}}>
              <PerformanceReport />
            </Box>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'left', width: '70vw', marginRight: 'auto', marginLeft: 'auto'}}>
            <Box sx={{p: 1, display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: '-1vh'}}>
              <DiskReport />
            </Box>
          </Box>
        </DiskUsageProvider>
        </DiskBusyRatioProvider>
        </CheckpointProgressProvider>
        </CPUUsageRatioProvider>
        </MemorySwapIOProvider>
    </div>
  );
}
