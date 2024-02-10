import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, CircularProgress, IconButton, Popover, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from 'react';
import { useTheme } from '@mui/system';
import { useSyncQueryString } from '../../../../Component/Common/DateUpdate';
import SvgExploreWelcome from '../../SVGs/ReactComponent/Welcome/ExploreWelcome';
import { ReportingOverview } from '../../../AnalysisReport/ReportingOverview';


const WelcomeExplore: React.FC = () => {
  
  return (
    <Card sx={{ height: '15vh' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" align="left" sx={{ fontWeight: 'bold', marginBottom: '1vh' }}>
            ようこそ！
          </Typography>
          <Typography variant="body1" sx={{marginLight:'5vw'}}>
            「クエリ」「サーバー」「PostgreSQLコンポーネント」「全体アーキテクチャ概要」を表示します。
          </Typography>
          <Typography variant="body1">
            Checkモードでの診断結果を元に確認をすると良いヒントがあるかもしれません。 ※リリースに向けて全般的にブラッシュアップ中
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WelcomeExplore;


