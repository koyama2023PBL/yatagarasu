import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import SvgExploreComponentFilesCatalog from '../../../SVGs/ReactComponent/Components/ExploreComponentFilesCatalog';

interface Props {
  starttime: Date;
  endtime: Date;
}

const Catalog: React.FC<Props> = ({ starttime, endtime }) => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Card sx={{ width: '100%', maxWidth: '100vw' }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            Catalog
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card sx={{ flexBasis: '45%', marginRight: '10px', marginLeft: '10pt'}}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                  <SvgExploreComponentFilesCatalog style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ flexBasis: '55%', marginLeft: '10px'}}>
              <CardContent>
                <Typography fontSize="14pt" gutterBottom>
                  Catalog
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  システムカタログとは、データベースを構成する内部情報がまとまったテーブル、またはビューです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  PostgreSQLが使用する内部情報であり、データベース毎に作成されるものとクラスタ全体の情報を管理するものとで分かれます。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  代表的なカタログは以下のようなものです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '20pt', marginBottom: '4px' }}>
                  pg_class: テーブル、インデックス、シーケンス、ビューなどのデータベースオブジェクトに関する情報が格納されています。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '20pt', marginBottom: '4px' }}>
                  pg_database: データベースクラスタ内のデータベースに関する情報が格納されています。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '20pt', marginBottom: '6px' }}>
                  pg_stat_activity: 現在のアクティビティやセッションに関する統計情報が格納されています。*拡張機能です。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  これらのカタログは権限のあるユーザであれば、以下のような通常のSQLで中身を見ることができます。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '20pt', marginBottom: '4px' }}>
                  'SELECT * FROM pg_database;'
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

export default Catalog;
