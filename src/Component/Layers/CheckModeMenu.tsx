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
import {PeriodSelector} from "../../Content/AnalysisReport/PeriodSelector";
import ReportingInfo, {reportCreated} from "../../Content/AnalysisReport/ReportingInfo";
import {TableSizeProvider} from "../../Content/AnalysisReport/DataProvider/TableSizeProvider";
import {TransactionCountProvider} from "../../Content/AnalysisReport/DataProvider/TransactionCountProvider";
import {LongTransactionProvider} from "../../Content/AnalysisReport/DataProvider/LongTransactionProvider";
import {HighLoadQueryProvider} from "../../Content/AnalysisReport/DataProvider/HighLoadQueryProvider";
import {QueryReport} from "../../Content/AnalysisReport/QueryReport";

/**
 * 診断レポート画面のメニューのJSX
 */
export const CheckModeMenu: React.FC = () => {
  const { from, to } = useSelector((state: RootState) => state.date);
  const starttime = new Date(from);
  const endtime   = new Date(to);

  return (
      <div>
        <Box sx={{p: 1, flexDirection: 'column', alignItems: 'center', marginTop: '0vh', width: '70vw', marginRight: 'auto', marginLeft: 'auto'}}>
          <PeriodSelector/>
        </Box>
        <Box sx={{p: 1, flexDirection: 'column', alignItems: 'center', marginTop: '0vh', width: '70vw', marginRight: 'auto', marginLeft: 'auto'}}>
          <ReportingInfo/>
        </Box>
        {reportCreated() ? (
          <MemorySwapIOProvider       starttime={starttime} endtime={endtime}>
          <CPUUsageRatioProvider      starttime={starttime} endtime={endtime}>
          <CheckpointProgressProvider starttime={starttime} endtime={endtime}>
          <DiskBusyRatioProvider      starttime={starttime} endtime={endtime}>
          <DiskUsageProvider          starttime={starttime} endtime={endtime}>
          <TableSizeProvider                                endtime={endtime}>
          <TransactionCountProvider   starttime={starttime} endtime={endtime}>
          <LongTransactionProvider    starttime={starttime} endtime={endtime}>
          <HighLoadQueryProvider      starttime={starttime} endtime={endtime}>
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
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'left', width: '70vw', marginRight: 'auto', marginLeft: 'auto'}}>
              <Box sx={{p: 1, display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: '-1vh'}}>
                <QueryReport />
              </Box>
            </Box>
          </HighLoadQueryProvider>
          </LongTransactionProvider>
          </TransactionCountProvider>
          </TableSizeProvider>
          </DiskUsageProvider>
          </DiskBusyRatioProvider>
          </CheckpointProgressProvider>
          </CPUUsageRatioProvider>
          </MemorySwapIOProvider>
        ) : (<div/>)}
    </div>
  );
}
