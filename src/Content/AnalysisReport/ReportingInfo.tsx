import React from "react";
import {Box, Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";

const ReportingInfo: React.FC = () => {
  return (
    <Card sx={{ width: '60%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' , marginTop: '-5px'}}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            診断情報
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReportingInfo;
