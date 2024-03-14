import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import SvgExploreComponentBackendprocess from '../../../SVGs/ReactComponent/Components/ExploreComponentBackendprocess';
import SvgExploreComponentBackendprocessMemory from '../../../SVGs/ReactComponent/Components/ExploreComponentBackendprocessMemory';


interface Props {
  starttime: Date;
  endtime: Date;
}

const BackendMemory: React.FC<Props> = ({ starttime, endtime }) => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Card sx={{ width: '100%', maxWidth: '100vw' }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            #2 Backendメモリ
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card sx={{ flexBasis: '45%', marginRight: '10px', marginLeft: '10pt'}}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                  <SvgExploreComponentBackendprocessMemory style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ flexBasis: '55%', marginLeft: '10px'}}>
              <CardContent>
                <Typography fontSize="14pt" gutterBottom>
                  Backendメモリの役割
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  Backendメモリは、Backendプロセスが使用するメモリ領域です。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  Backendプロセスが行うクエリの実行やトランザクション制御のためのデータ保管領域であり、一時的なキャッシュ領域としても使用されます。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  具体的には、データ並び替えのためのソート・ハッシュなどをメモリ上に配置して使用したりする場合があります。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  特定のBackendプロセスと対になっており、そのプロセスが占有するメモリになります。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  このBackendメモリの大きさは設定ファイルにてカスタマイズすることが可能です。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  デフォルトだと4MBですが、'postgresql.conf'ファイルで実行したいSQLクエリやアプリケーションの特性からより大きなサイズにすることが可能です。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  Backendプロセスと並び、PostgreSQLのマルチプロセスアーキテクチャの中核を担います。
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default BackendMemory;


