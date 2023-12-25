import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import SvgExploreQueryHome3Planning from '../../SVGs/ReactComponent/Queries/ExploreQueryHome3Planning';
import SvgExploreQueryHome4Execution from '../../SVGs/ReactComponent/Queries/ExploreQueryHome4Execution';
import SlowQuery from '../../SlowQuery';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Component/Redux/StateStore';
import QueryCounts from '../../QueryCounts';

const QueryExecution: React.FC = () => {

  const { from, to } = useSelector((state: RootState) => state.date);
  const starttime = new Date(from);
  const endtime = new Date(to);
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Card sx={{ width: '100%', maxWidth: '100vw' }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            #4 Execution...SQLクエリの実行
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card sx={{ flexBasis: '45%', marginRight: '10px', marginLeft: '10pt'}}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                  <SvgExploreQueryHome4Execution style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ flexBasis: '55%', marginLeft: '10px'}}>
              <CardContent>
                <Typography fontSize="14pt" gutterBottom>
                  SQLクエリの実行について
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '4px' }}>
                  Executionフェーズは、実際にクエリをデータベース上で実行し、結果を取得するステージです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '10pt', marginBottom: '6px' }}>
                  ここで行われるのは、Planningフェーズで策定された実行計画に従った、具体的なデータ操作です。以下のようなフローです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '20pt', marginBottom: '2px' }}>
                  1. オペレーションの実行： 実行計画に基づいて、データベースのテーブルからデータを読み取ったり、データを更新・挿入・削除する各種オペレーションが実行されます。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '20pt', marginBottom: '2px' }}>
                  2. 関数と式の評価： クエリに含まれる関数や計算式が評価され、必要なデータ変換や計算が行われます。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginLeft: '20pt', marginBottom: '6px' }}>
                  3. 結果セットの生成： 最終的には、クエリによって要求されたデータが集められ、アプリケーションに返されるためのレスポンスが作成されます。
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
                <SlowQuery starttime={starttime} endtime={endtime}/>
              </Box>
            </Card>
            <Card sx={{ flexBasis: '50%', marginLeft: '10px'}}>
              <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                <QueryCounts starttime={starttime} endtime={endtime}/>
              </Box>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default QueryExecution;


