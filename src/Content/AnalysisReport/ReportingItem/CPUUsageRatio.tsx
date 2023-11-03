import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {StatusType} from "../ReportingOverview";

const getCPUUsageRatioStatus = (): StatusType => {
  return 'OK';
}

const CPUUsageRatio: React.FC = () => {
  return (
      <Card sx={{width: '95vw'}}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" align="left" sx={{marginRight: '0.3vw'}}>
              CPU使用率
            </Typography>
          </Box>
        </CardContent>
      </Card>
  );
}

export {CPUUsageRatio, getCPUUsageRatioStatus};
