import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import SvgExploreComponentPostgresprocessSharedbuffers from '../../../SVGs/ReactComponent/Components/ExploreComponentPostgresprocessSharedbuffers';

interface Props {
  starttime: Date;
  endtime: Date;
}

const SharedBuffers: React.FC<Props> = ({ starttime, endtime }) => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Card sx={{ width: '100%', maxWidth: '100vw' }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
          SharedBuffers
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card sx={{ flexBasis: '45%', marginRight: '10px', marginLeft: '10pt'}}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                  <SvgExploreComponentPostgresprocessSharedbuffers style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ flexBasis: '55%', marginLeft: '10px'}}>
              <CardContent>
                <Typography fontSize="14pt" gutterBottom>
                  SharedBuffers
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  SharedBuffers(共有メモリ)とは、複数のBackendプロセスが共有するメモリ空間のことです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  例えば、同じテーブルのデータを参照するようなBackendプロセスが複数ある場合、別々にデータを読み込みに行くのは無駄です。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  このような重複した処理を避けるため、SharedBuffersにデータをキャッシュしたりすることでディスクI/Oを避け、処理の高速化を行います。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  キャッシュヒット率とはまさにこういったキャッシュされたデータを参照できたかどうかを示す指標値です。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  PostgreSQLではデータをメモリ空間でもパフォーマンス目的で保持していますが、これはいわゆるダーティページ(*1)を含みます。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  無論、この場合でもWAL・CHECKPOINTなどのアーキテクチャによって整合性は保たれています。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  SharedBuffersのサイズは'postgresql.conf'にて設定することができます。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  扱うビジネスやアプリケーション処理に応じて柔軟に変更するとより良いパフォーマンスを得られるかもしれません。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '8px' }}>
                  なお、デフォルトでは128MBとなっています。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  *1...ダーティページとは、メモリ上のデータに変更が加わり、実データファイルとの差分が生じている状態のデータのこと。
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
                {/* <CacheHitRate starttime={starttime} endtime={endtime}/> */}
              </Box>
            </Card>
            <Card sx={{ flexBasis: '50%', marginLeft: '10px'}}>
              <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                {/* <DeadLocks starttime={starttime} endtime={endtime}/> */}
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SharedBuffers;
