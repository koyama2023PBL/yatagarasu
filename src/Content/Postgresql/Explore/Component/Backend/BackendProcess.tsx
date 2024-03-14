import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import SvgExploreComponentBackendprocess from '../../../SVGs/ReactComponent/Components/ExploreComponentBackendprocess';
import SvgExploreComponentBackendprocessProcess from '../../../SVGs/ReactComponent/Components/ExploreComponentBackendprocessProcess';

interface Props {
  starttime: Date;
  endtime: Date;
}

const BackendProcess: React.FC<Props> = ({ starttime, endtime }) => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Card sx={{ width: '100%', maxWidth: '100vw' }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            #1 Backendプロセス
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card sx={{ flexBasis: '45%', marginRight: '10px', marginLeft: '10pt'}}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                  <SvgExploreComponentBackendprocessProcess style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ flexBasis: '55%', marginLeft: '10px'}}>
              <CardContent>
                <Typography fontSize="14pt" gutterBottom>
                  Backendプロセスの役割
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  Backendプロセスは、アプリケーションからの接続要求を受け付けたPostmasterプロセスにより作成されます。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  OS上のPIDを持つ1プロセスとして稼働します。このプロセスにより接続元とのセッション・コンテキスト管理が行われます。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '8px' }}>
                  1コネクション=1プロセスで稼働し、以下のような役割も担います。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '20pt', marginBottom: '4px' }}>
                  ・クエリの実行...SQLクエリの解釈・実行・結果のレスポンス
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '20pt', marginBottom: '4px' }}>
                  ・トランザクションの管理...発行するトランザクションの管理・制御
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '20pt', marginBottom: '8px' }}>
                  ・リソース管理...使用するシステムリソースの管理・制御
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  また、SharedBuffers(共有メモリ)やWALログについても、参照・編集を必要な場合は行います。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  BackendプロセスはPostgreSQLがクライアントから操作や接続を受け付ける際のインタフェースプロセスであり、
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  高いパフォーマンスを実現するPostgreSQLのマルチプロセスアーキテクチャの中核です。
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default BackendProcess;


