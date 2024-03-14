import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import SvgExploreComponentPostgresprocessArchiver from '../../../SVGs/ReactComponent/Components/ExploreComponentPostgresprocessArchiver';

interface Props {
  starttime: Date;
  endtime: Date;
}

const Archiver: React.FC<Props> = ({ starttime, endtime }) => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Card sx={{ width: '100%', maxWidth: '100vw' }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            Archiver
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card sx={{ flexBasis: '45%', marginRight: '10px', marginLeft: '10pt'}}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                  <SvgExploreComponentPostgresprocessArchiver style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ flexBasis: '55%', marginLeft: '10px'}}>
              <CardContent>
                <Typography fontSize="14pt" gutterBottom>
                  Archiver
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  Archiverは、PostgreSQLにおいてはWALファイルのアーカイブを行うプロセスです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  PostgreSQLでは、WALログは耐障害性に対して非常に重要な役割を持っています。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  このWALログをアーカイブし、別の領域に保管したり、あるいはセカンダリサーバへ転送したりするのに使用します。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  データの幾重にも及ぶバックアップは、システムにおけるデータの永続化を担うRDBMSの役割において重要なものです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  アーカイブのタイミング・容量などは'postgresql.conf'ファイルにて設定変更することができます。
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

export default Archiver;
