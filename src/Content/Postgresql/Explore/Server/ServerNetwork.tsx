import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import SvgExploreComponent3Network from '../../SVGs/ReactComponent/Server/ExploreServerNetwork';
import NetworkTransmitBytes from '../../NetworkTransmitBytes';
import NetworkReceiveBytes from '../../NetworkReceiveBytes';

interface ServerNetworkProps {
  starttime: Date;
  endtime: Date;
}

const ServerNetwork: React.FC<ServerNetworkProps> = ({ starttime, endtime }) => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Card sx={{ width: '100%', maxWidth: '100vw' }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            #3 Network
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card sx={{ flexBasis: '45%', marginRight: '10px', marginLeft: '10pt'}}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                  <SvgExploreComponent3Network style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ flexBasis: '55%', marginLeft: '10px'}}>
              <CardContent>
                <Typography fontSize="14pt" gutterBottom>
                  ネットワーク
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  ネットワークについては、セッションの数や通信量そのものについての注意が必要です。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  異常に増えたセッション数や通信量は何らかの問題を示していることがほとんどです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '20pt', marginBottom: '4px' }}>
                  → ex. トラフィックの急増、アプリケーションの不具合、サイバー攻撃
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  なお、ブラウザなどで使われるHTTPや、DBコネクションを行うセッションなどもTCP通信になります。
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10pt' }}>
            <Typography fontSize="10pt" sx={{ marginBottom: '6px' }}>
              関連のあるメトリクス
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card sx={{ flexBasis: '50%', marginRight: '10px', marginLeft: '10pt'}}>
              <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                <NetworkTransmitBytes starttime={starttime} endtime={endtime}/>
              </Box>
            </Card>
            <Card sx={{ flexBasis: '50%', marginRight: '10px', marginLeft: '10pt'}}>
              <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                <NetworkReceiveBytes starttime={starttime} endtime={endtime}/>
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ServerNetwork;


