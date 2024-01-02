import React from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {green, red, yellow} from "@mui/material/colors";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import {getPerformanceStatus} from "./PerformanceReport";
import {StatusType} from "./AnalysisReportUtil";
import {getDiskStatus} from "./DiskReport";


/**
 * ステータスに応じたアイコンを返す
 * @param status
 */
export const getStatusIcon = (status: StatusType | null): React.JSX.Element => {
  if (status === null) {
    return <CircularProgress style={{ marginTop: '3vh' }}/>;
  }
  switch (status) {
    case 'OK':
      return <CheckCircleIcon style={{ width: "50%", height: "50%" }} sx={{ color: green[500] }} />;
    case 'WARNING':
      return <WarningIcon style={{ width: "50%", height: "50%" }} sx={{ color: yellow[700] }} />;
    case 'ERROR':
      return <ErrorIcon style={{ width: "50%", height: "50%" }} sx={{ color: red[500] }} />;
  }
};

/**
 * 診断レポートの概況を表示するコンポーネント
 */
export const ReportingOverview: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            概況
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: '1.5', marginTop: '1vh', marginLeft: '2vw' }}>
          <Card sx={{width: '15vw', height: '20vh'}}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" sx={{marginRight: '0.3vw'}}>
                  パフォーマンス
                </Typography>
                {getStatusIcon(getPerformanceStatus())}
              </Box>
            </CardContent>
          </Card>
          <Card sx={{width: '15vw', height: '20vh', marginLeft: '2vw' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" sx={{marginRight: '0.3vw'}}>
                  ディスク
                </Typography>
                {getStatusIcon(getDiskStatus())}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </CardContent>
    </Card>
  );
};
