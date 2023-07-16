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
  var dbStatus = "OK";
  var rdbmsStatus = "STABLE";
  var queryStatus = "ERROR";

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%',
      }}
    >
      <div style={{ height: '100%', width: '100%' }}>
      <Card style={{height: '100%', width: '100%'}}>
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '-35px',marginTop: '-25px', width: '100%' }}>
            <h5>OverView -全体概況- </h5>
          </div>
          <div>
            <ul></ul>
            <ul></ul>
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '75pt'}}>
            <Box marginLeft={2} marginRight={2} sx={{ flex: 1 , marginBottom: '-10px', marginTop: '-30px'}}>
              <Card sx={{backgroundColor: dbStatus === "OK" ? '#e8f5e9' : dbStatus === "STABLE" ? '#fffde7' : '#ffebee'}}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography variant="h6">
                      DBサーバの稼働状態 : 
                    </Typography>
                    {dbStatus === "OK" ? 
                      <CheckCircleIcon style={{ color: green[500] }} /> 
                      : dbStatus === "STABLE" ? 
                      <WarningIcon style={{ color: yellow[500] }} /> 
                      : 
                      <ErrorIcon style={{ color: red[500] }} />
                    }
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box marginLeft={2} marginRight={2} sx={{ flex: 1 , marginBottom: '-10px', marginTop: '-30px'}}>
              <Card sx={{backgroundColor: rdbmsStatus === "OK" ? '#e8f5e9' : rdbmsStatus === "STABLE" ? '#fffde7' : '#ffebee'}}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography variant="h6">
                      RDBMSの稼働状態 :   
                    </Typography>
                    {rdbmsStatus === "OK" ? 
                      <CheckCircleIcon style={{ color: green[500] }} /> 
                      : rdbmsStatus === "STABLE" ? 
                      <WarningIcon style={{ color: yellow[500] }} /> 
                      : 
                      <ErrorIcon style={{ color: red[500] }} />
                    }
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box marginLeft={2} marginRight={2} sx={{ flex: 1 , marginBottom: '-10px', marginTop: '-30px'}}>
              <Card sx={{backgroundColor: queryStatus === "OK" ? '#e8f5e9' : queryStatus === "STABLE" ? '#fffde7' : '#ffebee'}}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography variant="h6">
                      クエリの処理状態 : 
                    </Typography>
                    {queryStatus === "OK" ? 
                      <CheckCircleIcon style={{ color: green[500] }} /> 
                      : queryStatus === "STABLE" ? 
                      <WarningIcon style={{ color: yellow[500] }} /> 
                      : 
                      <ErrorIcon style={{ color: red[500] }} />
                    }
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </CardContent>
      </Card>
      </div>
    </Box>
  );
}

export default OverView;
