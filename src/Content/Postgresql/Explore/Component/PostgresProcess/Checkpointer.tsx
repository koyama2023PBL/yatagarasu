import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import SvgExploreComponentPostgresprocessCheckpointer from '../../../SVGs/ReactComponent/Components/ExploreComponentPostgresprocessCheckpointer';

interface Props {
  starttime: Date;
  endtime: Date;
}

const Checkpointer: React.FC<Props> = ({ starttime, endtime }) => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Card sx={{ width: '100%', maxWidth: '100vw' }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
          Checkpointer
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card sx={{ flexBasis: '45%', marginRight: '10px', marginLeft: '10pt'}}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                  <SvgExploreComponentPostgresprocessCheckpointer style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ flexBasis: '55%', marginLeft: '10px'}}>
              <CardContent>
                <Typography fontSize="14pt" gutterBottom>
                  Checkpointer
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  CheckpointerはPostgreSQLのデータ整合性と耐久性を担保するために重要な役割を持つプロセスです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  全てのデータを逐一、実データファイルに反映するとパフォーマンスの問題が発生します。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  そこで、Checkpointerは効率的にデータ整合性と耐久性を実現するための役割を担っています。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '8px' }}>
                  CheckpoiterはSharedBuffers上のダーティページやWALバッファ、またWALログを以下のようなポイントで自動的に実データファイルに反映します。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  ・ダーティページへの定期的なスキャンを行い、必要に応じて実データファイルへ変更を反映
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  ・定期的なスキャン時、設定されたWALログの規定量を超えていた場合に実データファイルへ変更を反映
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  ・PostgreSQLがシステム停止する前にダーティページ・WALバッファ・WALログの全量を実データファイルへ変更を反映
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '8px' }}>
                  ・SQLコマンドにて'CHECKPOINT'を実行
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  このCheckpointerの処理も、'postgersql.conf'にてコントロールが可能です。
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

export default Checkpointer;
