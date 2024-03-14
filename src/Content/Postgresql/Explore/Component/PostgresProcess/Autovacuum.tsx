import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import SvgExploreComponentPostgresprocessAutovacuum from '../../../SVGs/ReactComponent/Components/ExploreComponentPostgresprocessAutovacuum';

interface Props {
  starttime: Date;
  endtime: Date;
}

const Autovacuum: React.FC<Props> = ({ starttime, endtime }) => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Card sx={{ width: '100%', maxWidth: '100vw' }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            Autovacuum
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card sx={{ flexBasis: '45%', marginRight: '10px', marginLeft: '10pt'}}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                  <SvgExploreComponentPostgresprocessAutovacuum style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ flexBasis: '55%', marginLeft: '10px'}}>
              <CardContent>
                <Typography fontSize="14pt" gutterBottom>
                  Autovacuum
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  Autovacuumは、PostgreSQLにおいては必要不可欠なアーキテクチャです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  PostgreSQLでは、MVCC(Multi Version Concurrency Control)という制御方法を採用しています。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  このMVCCは、主に複数のトランザクションが走る場面で活躍します。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  PostgreSQLは全てのデータに番号を振っており、その番号が有効か無効かをその番号によって制御します。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  データが更新されると新しい番号が振られ、古い番号(バージョン番号)のデータは無効になります。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  イメージとしては、削除フラグに近いものです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  当然、バージョン管理がされる形であるため無効になったデータも保持されるのですが、
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  この無効となったデータを「デッドタプル」と呼びます。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  このAutovaccumとは、この「デッドタプル」を定期的・自動的に削除してくれる仕掛けです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  これにより容量の圧迫やパフォーマンスの低下を防ぐことができます。
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

export default Autovacuum;
