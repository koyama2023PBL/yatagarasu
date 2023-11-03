import * as React from 'react';
import Box from '@mui/material/Box';
import {useSelector} from "react-redux";
import {RootState} from "../Redux/StateStore";
import ReportingOverview from "../../Content/AnalysisReport/ReportingOverview";
import {PerformanceReport} from "../../Content/AnalysisReport/PerformanceReport";

const AnalysisReportMenu: React.FC = () => {

  const { from, to } = useSelector((state: RootState) => state.date);

  const starttime = new Date(from);
  const endtime = new Date(to);

  return (
      <div>
        <Box sx={{p: 1, flexDirection: 'column', alignItems: 'center', marginTop: '0vh'}}>
          <ReportingOverview/>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'left', width: '95vw', marginRight: 'auto', marginLeft: 'auto'}}>
          <Box sx={{p: 1, display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: '-1vh'}}>
            <PerformanceReport/>
          </Box>
        </Box>
    </div>
  );
}

export default AnalysisReportMenu;
