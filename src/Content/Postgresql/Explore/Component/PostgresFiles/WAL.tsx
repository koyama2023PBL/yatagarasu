import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Component/Redux/StateStore';
import SvgExploreComponentFilesWal from '../../../SVGs/ReactComponent/Components/ExploreComponentFilesWal';

interface Props {
  starttime: Date;
  endtime: Date;
}

const WAL: React.FC<Props> = ({ starttime, endtime }) => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Card sx={{ width: '100%', maxWidth: '100vw' }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            WAL
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card sx={{ flexBasis: '45%', marginRight: '10px', marginLeft: '10pt'}}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                  <SvgExploreComponentFilesWal style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ flexBasis: '55%', marginLeft: '10px'}}>
              <CardContent>
                <Typography fontSize="14pt" gutterBottom>
                  WAL
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  Write Ahead Logの略称であり、PostgreSQLにおいて非常に重要な役割を持ちます。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  PostgreSQLではトランザクションがコミットされると、テーブル本体に書き込まれる前にクエリによる変更はこのWALファイルに書き込まれます。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  実はトランザクションがコミット完了するというのは、テーブルファイルを変更することではなくこのWALへの書き込みが完了することです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  これによりWALにより回復性の確保のほか、ファイルの書き込み回数が減りディスクI/Oの最適化を行えるようになります。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  WALファイル自体は"~/data/pg_wal"配下に保管されます。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  また、このWALファイルをセカンダリサーバ側で複製することで、データベースクラスタ間でのデータレプリケーションを実現できます。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  CHECKPOINT処理は、このWALファイルを実際のテーブルファイルに書き込む処理のことを指します。
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

export default WAL;
