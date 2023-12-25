import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import SvgExploreQueryHome2Analyze from '../../SVGs/ReactComponent/Queries/ExploreQueryHome2Analyze';

const QueryAnalyze: React.FC = () => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Card sx={{ width: '100%', maxWidth: '100vw' }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            #2 Analyze...SQLクエリの解析
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card sx={{ flexBasis: '45%', marginRight: '10px', marginLeft: '10pt'}}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                  <SvgExploreQueryHome2Analyze style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ flexBasis: '55%', marginLeft: '10px'}}>
              <CardContent>
                <Typography fontSize="14pt" gutterBottom>
                  クエリの解析とは？
                </Typography>
                <Typography fontSize="10pt" sx={{ marginBottom: '4px' }}>
                  このフェーズでは、クエリの解析によって実行を依頼されたクエリが本当に実行できるのかがチェックされます。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginBottom: '4px' }}>
                  具体的には、指定されたテーブルやリレーションなどが本当に実在するのかを確認してくれるフェーズです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginBottom: '4px' }}>
                  確認する先の情報として、PostgreSQLが管理・保管する"システムカタログ"と呼ばれる、テーブルやスキーマなどの情報が詰まった内部データを用います。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginBottom: '4px' }}>
                  システムカタログは"pg_catalog"スキーマにあるのでSELECT文などで覗くことが可能です。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginBottom: '4px' }}>
                  この他、#1のパースによってクエリツリー（Query構造体）になったクエリの書き換え処理（rewrite）が行われます。
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default QueryAnalyze;


