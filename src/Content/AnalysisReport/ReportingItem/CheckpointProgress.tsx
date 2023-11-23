import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {CheckpointProgressData, useCheckpointProgress} from "../DataProvider/CheckpointProgressProvider";
import {Chart, Filler} from "chart.js";
import {getItemTitleSx, StatusType} from "../AnalysisReportUtil";
import Divider from "@mui/material/Divider";

Chart.register(Filler);

/**
 * チェックポイント実行状況のステータスを取得する
 */
export const getCheckPointProgressStatus = (): StatusType | null => {
  const data : CheckpointProgressData | null = useCheckpointProgress();
  if (!data) return null;
  if (data.timed * 3 < data.req) return 'ERROR';
  if (data.timed * 2 < data.req) return 'WARNING';
  return 'OK';
}

/**
 * チェックポイント実行状況のJSX
 */
export const CheckPointProgress: React.FC = () => {
  const [text, setText] = useState<any | null>(null);
  const data: CheckpointProgressData | null = useCheckpointProgress();

  useEffect(() => {
    if (data) setText(`${data.timed}回 / ${data.req}回`);
  }, [data]);

  const analysisResult = (): string | null => {
    const status: StatusType | null = getCheckPointProgressStatus();
    if (!status) return null;
    if (status === 'ERROR') return '更新量の多いチェックポイントが多発している可能性があります。';
    if (status === 'WARNING') return '更新量の多いチェックポイントが発生している可能性があります。';
    return 'チェックポイント処理は正常です。';
  }

  return (
      <Card sx={{ width: '65vw', marginRight: 'auto', marginLeft: 'auto', marginTop: '2vh' }}>
        <CardContent sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" align="left" sx={getItemTitleSx(getCheckPointProgressStatus())}>
              チェックポイント実行状況
            </Typography>
            <Box sx={{ display: 'flex', marginTop: '3vh' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25vw', marginTop: 'auto', marginBottom: 'auto' }}>
                <Typography variant="caption">
                  時間契機の実行回数 / WALサイズ契機の実行回数
                </Typography>
                <Typography variant="body1">
                  {text ? <div>{text}</div> : <CircularProgress sx={{marginTop: '7vh'}}/>}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '35vw', marginLeft: '2vw' }}>
                <Typography variant="body2" align="left" sx={{}}>
                  診断結果
                </Typography>
                <Divider />
                <Typography variant="body1" align="left" sx={{ marginTop: '1vh', marginLeft: '2vw' }}>
                  {analysisResult()}
                </Typography>
                <Typography variant="body2" align="left" sx={{ marginTop: '2vh' }}>
                  チェックポイント
                </Typography>
                <Divider />
                <Typography variant="body2" align="left" sx={{ marginLeft: '1vw' }}>
                  <ul>
                    <li>時間契機の実行回数と比較してWALサイズ契機の実行回数が多いと、更新量の多いチェックポイントが発生している可能性があります。</li>
                        （目安）「時間契機の実行回数」× 3 ＜「WALサイズ契機の実行回数」
                  </ul>
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
};
