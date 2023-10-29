import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {StatusType} from "../ReportingOverview";
import {CheckpointProgressData, useCheckpointProgress} from "../DataProvider/CheckpointProgressProvider";
import {Chart, Filler} from "chart.js";
import {green, red, yellow} from "@mui/material/colors";
import {getCPUUsageRatioStatus} from "./CPUUsageRatio";
import {Bar} from "react-chartjs-2";

Chart.register(Filler);

/**
 * チェックポイント実行状況のステータスを取得する
 */
const getCheckPointProgressStatus = (): StatusType | null => {
  const data : CheckpointProgressData | null = useCheckpointProgress();
  if (!data) return null;
  if (data.timed * 3 < data.req) return 'ERROR';
  if (data.timed * 2 < data.req) return 'WARNING';
  return 'OK';
}

/**
 * チェックポイント実行状況のJSX
 */
const CheckPointProgress: React.FC = () => {
  const [text, setText] = useState<any | null>(null);
  const data: CheckpointProgressData | null = useCheckpointProgress();

  useEffect(() => {
    if (data) setText(`${data.timed}回 / ${data.req}回`);
  }, [data]);

  const getColor = (status: StatusType) => {
    switch (status) {
      case 'OK':
        return green[500];
      case 'WARNING':
        return yellow[700];
      case 'ERROR':
        return red[500];
    }
  }

  const getTitleSx = (status: StatusType | null) => {
    if (!status) {
      return {marginRight: '0.3vw'};
    }
    return {
      marginRight: '0.3vw',
      color: getColor(status),
    };
  }

  return (
      <Card sx={{width: '95vw', marginTop: '1vh'}}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" align="left" sx={getTitleSx(getCheckPointProgressStatus())}>
              チェックポイント実行状況
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div>
                {text ? <div>{text}</div> : <CircularProgress sx={{marginTop: '7vh'}}/>}
              </div>
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
};

export {CheckPointProgress, getCheckPointProgressStatus};
