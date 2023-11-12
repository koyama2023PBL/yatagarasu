/**
 * 診断レポート画面のメニューを表示するコンポーネント
 */
import * as React from 'react';
import Box from '@mui/material/Box';
import {useSelector} from "react-redux";
import {RootState} from "../Redux/StateStore";
import ReportingOverview from "../../Content/AnalysisReport/ReportingOverview";
import {PerformanceReport} from "../../Content/AnalysisReport/PerformanceReport";
import {MemorySwapIOProvider} from "../../Content/AnalysisReport/DataProvider/MemorySwapIOProvider";
import {prometheusSettings} from "../Redux/PrometheusSettings";
import {CPUUsageRatioProvider} from "../../Content/AnalysisReport/DataProvider/CPUUsageRatioProvider";
import {CheckpointProgressProvider} from "../../Content/AnalysisReport/DataProvider/CheckpointProgressProvider";

/**
 * 診断レポート画面のメニューのJSX
 */
const AnalysisReportMenu: React.FC = () => {
  const { from, to } = useSelector((state: RootState) => state.date);
  const starttime = new Date(from);
  const endtime = new Date(to);
  const nodeScrapeInterval = prometheusSettings?.nodeScrapeInterval ?? '15s';
  const postgresScrapeInterval = prometheusSettings?.postgresqlScrapeInterval ?? '15s';

  return (
      <div>
        <MemorySwapIOProvider  starttime={starttime} endtime={endtime} scrapeInterval={nodeScrapeInterval}>
        <CPUUsageRatioProvider starttime={starttime} endtime={endtime} scrapeInterval={nodeScrapeInterval}>
        <CheckpointProgressProvider starttime={starttime} endtime={endtime} scrapeInterval={postgresScrapeInterval}>
          <Box sx={{p: 1, flexDirection: 'column', alignItems: 'center', marginTop: '0vh'}}>
            <ReportingOverview />
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'left', width: '95vw', marginRight: 'auto', marginLeft: 'auto'}}>
            <Box sx={{p: 1, display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: '-1vh'}}>
              <PerformanceReport />
            </Box>
          </Box>
        </CheckpointProgressProvider>
        </CPUUsageRatioProvider>
        </MemorySwapIOProvider>
    </div>
  );
}

export default AnalysisReportMenu;
