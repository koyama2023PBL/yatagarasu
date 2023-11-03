import React from "react";
import {StatusType} from "../ReportingOverview";
import {Box, Card, CardContent, Typography} from "@mui/material";

const getMemorySwapIOStatus = (): StatusType => {
  return 'OK';
}

const MemorySwapIO: React.FC = () => {
  return (
    <Card sx={{width: '95vw', marginTop: '1vh'}}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" align="left" sx={{marginRight: '0.3vw'}}>
            メモリ使用率
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export {MemorySwapIO, getMemorySwapIOStatus};
