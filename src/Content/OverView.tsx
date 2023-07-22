import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { green, yellow, red } from '@mui/material/colors';

interface OverViewProps {
  starttime: Date;
  endtime: Date;
}

const OverView: React.FC<OverViewProps> = ({ starttime, endtime }) => {

  //仮の値
  //バックエンドAPIの要件定義、実装後に再度実装
  var dbStatus = "OK";
  var rdbmsStatus = "STABLE";
  var queryStatus = "ERROR";

  return (
  <Card sx={{ height: '16vh'}}>
    <CardContent>
      <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
        OverView
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', p: '1.5', marginTop: '1vh',marginLeft: '2vw' }}>
        <Card sx={{backgroundColor: dbStatus === "OK" ? '#e8f5e9' : dbStatus === "STABLE" ? '#fffde7' : '#ffebee'}}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '3vh' }}>
              <Typography variant="h6">
                DBサーバの稼働状態 : 
              </Typography>
              {dbStatus === "OK" ? 
                <CheckCircleIcon style={{ color: green[500] }} /> 
                : dbStatus === "STABLE" ? 
                <WarningIcon style={{ color: yellow[700] }} /> 
                : 
                <ErrorIcon style={{ color: red[500] }} />
              }
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ width: '1.5vh'}}></Box>
        <Card sx={{backgroundColor: rdbmsStatus === "OK" ? '#e8f5e9' : rdbmsStatus === "STABLE" ? '#fffde7' : '#ffebee'}}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '3vh' }}>
              <Typography variant="h6">
                RDBMSの稼働状態 :   
              </Typography>
              {rdbmsStatus === "OK" ? 
                <CheckCircleIcon style={{ color: green[500] }} /> 
                : rdbmsStatus === "STABLE" ? 
                <WarningIcon style={{ color: yellow[700] }} /> 
                : 
                <ErrorIcon style={{ color: red[500] }} />
              }
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ width: '1.5vh'}}></Box>
        <Card sx={{backgroundColor: queryStatus === "OK" ? '#e8f5e9' : queryStatus === "STABLE" ? '#fffde7' : '#ffebee'}}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '3vh' }}>
              <Typography variant="h6">
                クエリの処理状態 : 
              </Typography>
              {queryStatus === "OK" ? 
                <CheckCircleIcon style={{ color: green[500] }} /> 
                : queryStatus === "STABLE" ? 
                <WarningIcon style={{ color: yellow[700] }} /> 
                : 
                <ErrorIcon style={{ color: red[500] }} />
              }
            </Box>
          </CardContent>
        </Card>
      </Box>
    </CardContent>
  </Card>
  );
}

export default OverView;
