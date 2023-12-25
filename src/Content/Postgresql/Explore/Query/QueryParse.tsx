import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import SvgExploreQueryHome1Parse from '../../SVGs/ReactComponent/Queries/ExploreQueryHome1Parse';

const QueryParse: React.FC = () => {
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Card sx={{ width: '100%', maxWidth: '100vw' }}>
        <CardContent>
          <Typography variant="body1" gutterBottom>
            #1 Parse...SQLの文法チェック・解析
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card sx={{ flexBasis: '45%', marginRight: '10px', marginLeft: '10pt'}}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '100%' }}>
                  <SvgExploreQueryHome1Parse style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ flexBasis: '55%', marginLeft: '10px'}}>
              <CardContent>
                <Typography fontSize="14pt" gutterBottom>
                  SQLクエリのパースとは？
                </Typography>
                <Typography fontSize="10pt" sx={{ marginBottom: '4px' }}>
                  クエリのパースは、PostgreSQLがクエリを理解し、実行計画を立てるための最初のステップです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginBottom: '4px' }}>
                  この段階では、ユーザが入力したSQL文が正しい構造かどうかをチェックします。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginBottom: '4px' }}>
                  具体的には、入力されたクエリがSQLのルールに沿っているかを確認します。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginBottom: '4px' }}>
                  例えば、SELECT、FROM、WHEREなどのキーワードが正しく使われているか、括弧が正しく閉じられているかなどです。
                </Typography>
                <Typography fontSize="10pt" sx={{ marginBottom: '4px' }}>
                  SQLはパースされると、クエリツリー（SQL構造体）と呼ばれるものになります。
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default QueryParse;


