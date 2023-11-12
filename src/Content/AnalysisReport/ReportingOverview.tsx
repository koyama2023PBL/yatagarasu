/**
 * 診断レポートの概況を表示するコンポーネント
 */
import React from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {green, red, yellow} from "@mui/material/colors";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import {getPerformanceStatus} from "./PerformanceReport";


/**
 * 診断レポート内共通のステータス
 */
type StatusType = 'OK' | 'WARNING' | 'ERROR';

/**
 * ステータスに応じたアイコンを返す
 * @param status
 */
const getStatusIcon = (status: StatusType | null): React.JSX.Element => {
  if (status === null) {
    return <CircularProgress sx={{marginTop: '7vh'}}/>;
  }
  switch (status) {
    case 'OK':
      return <CheckCircleIcon sx={{ color: green[500], height: '10vh' }} />;
    case 'WARNING':
      return <WarningIcon sx={{ color: yellow[700], height: '10vh'}} />;
    case 'ERROR':
      return <ErrorIcon sx={{ color: red[500], height: '10vh'}} />;
  }
};

/**
 * 診断レポートの概況を表示するコンポーネント
 */
const ReportingOverview: React.FC = () => {
  return (
    <Card sx={{ height: '24vh' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            概況
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: '1.5', marginTop: '1vh',marginLeft: '2vw' }}>
          <Card sx={{width: '15vw'}}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '10vh' }}>
                <Typography variant="h6" sx={{marginRight: '0.3vw'}}>
                  パフォーマンス
                </Typography>
                {getStatusIcon(getPerformanceStatus())}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReportingOverview;
export type { StatusType };
