import React from "react";
import {Box, Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";

interface ReportingInfoItems {
  createdAt: Date;
  from: Date;
  to: Date;
  period: string;
}

let reportingInfoItems: ReportingInfoItems | null = null;

export function reportCreated(): boolean {
  return reportingInfoItems != null;
}

export function setReportingInfoItems(createdAt: Date, from: Date, to: Date, period: string) {
  reportingInfoItems = {
    createdAt: createdAt,
    from: from,
    to: to,
    period: period,
  }
}

const ReportingInfo: React.FC = () => {
  return reportingInfoItems == null ? (<div/>) : (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' , marginTop: '-5px'}}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            診断情報
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' , marginTop: '1vh'}}>
            <Typography variant="body1" sx={{ marginLeft: '1vw', width: '6vw' }}>
              作成日時:
            </Typography>
            <Typography variant="body1" sx={{ marginLeft: '1vw' }}>
              {reportingInfoItems.createdAt.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <Typography variant="body1" sx={{ marginLeft: '1vw', width: '6vw' }}>
              診断開始日時:
            </Typography>
            <Typography variant="body1" sx={{ marginLeft: '1vw' }}>
              {reportingInfoItems.from.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <Typography variant="body1" sx={{ marginLeft: '1vw', width: '6vw' }}>
              診断終了日時:
            </Typography>
            <Typography variant="body1" sx={{ marginLeft: '1vw' }}>
              {reportingInfoItems.to.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <Typography variant="body1" sx={{ marginLeft: '1vw', width: '6vw' }}>
              診断期間:
            </Typography>
            <Typography variant="body1" sx={{ marginLeft: '1vw' }}>
              {reportingInfoItems.period.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReportingInfo;
