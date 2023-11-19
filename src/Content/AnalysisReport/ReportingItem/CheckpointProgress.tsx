import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {CheckpointProgressData, useCheckpointProgress} from "../DataProvider/CheckpointProgressProvider";
import {Chart, Filler} from "chart.js";
import {getItemTitleSx, StatusType} from "../AnalysisReportUtil";

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

  return (
      <Card sx={{ width: '65vw', marginRight: 'auto', marginLeft: 'auto', marginTop: '2vh' }}>
        <CardContent sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" align="left" sx={getItemTitleSx(getCheckPointProgressStatus())}>
              チェックポイント実行状況
            </Typography>
            <Box sx={{ display: 'flex', marginTop: '3vh' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25vw' }}>
                <Typography variant="caption">
                  時間経過による実行回数 / WALサイズによる実行回数
                </Typography>
                <Typography variant="body1">
                  {text ? <div>{text}</div> : <CircularProgress sx={{marginTop: '7vh'}}/>}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                概況
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
};
