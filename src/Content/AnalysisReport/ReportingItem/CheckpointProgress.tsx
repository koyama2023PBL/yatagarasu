import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {StatusType} from "../ReportingOverview";

const getCheckPointProgressStatus = (): StatusType => {
  return 'OK';
}

const CheckPointProgress: React.FC = () => {
  return (
      <Card sx={{width: '95vw', marginTop: '1vh'}}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" align="left" sx={{marginRight: '0.3vw'}}>
              チェックポイント実行状況
            </Typography>
          </Box>
        </CardContent>
      </Card>
  );
};

export {CheckPointProgress, getCheckPointProgressStatus};
