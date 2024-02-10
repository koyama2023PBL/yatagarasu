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
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    // getMonth()は0から始まるため、1を加える
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // フォーマットした文字列を組み立てる
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }

  return reportingInfoItems == null ? (<div/>) : (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' , marginTop: '-5px'}}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            診断情報
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' , marginTop: '1vh'}}>
            <Typography variant="body1" sx={{ marginLeft: '1vw', width: '10vw' }}>
              作成日時
            </Typography>
            <Typography variant="body1" sx={{ marginLeft: '1vw' }}>
              {formatDate(reportingInfoItems.createdAt)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <Typography variant="body1" sx={{ marginLeft: '1vw', width: '10vw' }}>
              診断開始日時
            </Typography>
            <Typography variant="body1" sx={{ marginLeft: '1vw' }}>
              {formatDate(reportingInfoItems.from)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <Typography variant="body1" sx={{ marginLeft: '1vw', width: '10vw' }}>
              診断終了日時
            </Typography>
            <Typography variant="body1" sx={{ marginLeft: '1vw' }}>
              {formatDate(reportingInfoItems.to)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <Typography variant="body1" sx={{ marginLeft: '1vw', width: '10vw' }}>
              診断期間
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
