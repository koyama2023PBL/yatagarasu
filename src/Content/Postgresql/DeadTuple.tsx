import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import {rgbToRgba, unixTimeToDate} from '../../Component/Common/Util';
import { Box, Card, CardContent, Checkbox,CircularProgress,IconButton,Popover,Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green, yellow, red } from '@mui/material/colors';
import annotationPlugin from 'chartjs-plugin-annotation';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { Status, statusColors, Thresholds } from "../../Component/Threshold/Threshold";
import {prometheusSettings} from "../../Component/Redux/PrometheusSettings";
import yatagarasuSettings from "../../Component/Redux/YatagarasuSettings";
import {invokeQueryRange, QueryRangeResponse} from "../../Component/Common/PrometheusClient";

interface DeadTupleProps {
  starttime: Date;
  endtime: Date;
}

interface DeadTupleApiResponseMetric {
  __name__: string;
  datid: string;
  datname: string;
  instance: string;
  job: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  annotationPlugin,
  Title,
  Legend
);

const DeadTuple: React.FC<DeadTupleProps> = ({ starttime, endtime }) => {
  const [chartData, setChartData] = useState<any | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [yAxisFixed, setYAxisFixed] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)};
  const handlePopoverClose = () => {setAnchorEl(null)};
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchChartData = async () => {
      const query = `pg_stat_user_tables_n_dead_tup{datname="${yatagarasuSettings.dbname}"}`;
      const {status: status, data: response }: {status: number, data: QueryRangeResponse<DeadTupleApiResponseMetric>}
          = await invokeQueryRange<QueryRangeResponse<DeadTupleApiResponseMetric>>(query, starttime, endtime, prometheusSettings?.postgresqlScrapeInterval);
      setStatusCode(status);

      // キーごとに合計するマップ
      const keySumMap: Record<string, number> = {};

      // 各テーブルのデータを処理
      response.data.result.forEach((tableResult) => {
        tableResult.values.forEach(([key, valueStr]) => {
          const value = parseInt(valueStr, 10);
          if (!keySumMap[key]) {
            keySumMap[key] = 0;
          }
          keySumMap[key] += value;
        });
      });

      // 合計を数字の配列で取得
      const deadTupleCounts = Object.values(keySumMap);
      const labels: string[] = Object.keys(keySumMap).map((key) => unixTimeToDate(Number(key)).toLocaleString());

      const borderColor = deadTupleCounts.map((value)=> {
        let status: Status;
        if (Number(value) <= Thresholds.deadtuple.ok) {
          status = 'ok';
        } else if (Number(value) <= Thresholds.deadtuple.watch) {
          status = 'watch';
        } else {
          status = 'alert';
        }
        return rgbToRgba(statusColors[status], 1);
      });
      const backgroundColor = deadTupleCounts.map((value) => {
        let status: Status;
        if (Number(value) <= Thresholds.deadtuple.ok) {
          status = 'ok';
        } else if (Number(value) <= Thresholds.deadtuple.watch) {
          status = 'watch';
        } else {
          status = 'alert';
        }
        return rgbToRgba(statusColors[status], 0.1);
      });
      const length = labels.length;
  
      setChartData({
        labels: labels,
        datasets: [
          {
            data: deadTupleCounts,
            borderColor: borderColor,
            backgroundColor: backgroundColor
          }
        ],
        length: length
      });
    };
    void fetchChartData();
  }, [starttime, endtime]);

  const options = () => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: yAxisFixed ? undefined : 50,
      },
      x: {
        barPercentage: 1.2,
        categoryPercentage: 1.2,
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          callback: function(_value : any, index : any , _values : any) {
            return index === 0 || index === chartData?.labels.length - 1 ? chartData?.labels[index] : '';
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      }
    },
    onHover: (_e: any, _elements: any) => {
    },
    plugin: {
      legend: {
        display: false, 
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'white',
        titleColor: 'black',
        bodyColor: 'black',
        callbacks: {
          label: function(context : any) {
            const index = context.dataIndex;
            const dataset = context.dataset.data;
            
            return `${parseFloat(dataset[index]).toFixed(2) + '個'}`;
          },
        },
      },
    }
  });
  
  const getIcon = () => {
    if (statusCode === null) {
      return WarningIcon; 
    }

    if (statusCode >= 500) {
      return ErrorIcon;
    } else if (statusCode >= 400 || chartData.length === 0) {
      return WarningIcon;
    } else {
      return CheckCircleOutlineIcon;
    }
  }

  const getIconColor = () => {
    if (statusCode === null) {
      return; 
    }
  
    if (statusCode >= 500) {
      return red[500];
    } else if (statusCode >= 400 || chartData.length === 0) {
      return yellow[700];
    } else {
      return green[500];
    }
  }

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '-15px', marginTop: '-5px', width: '100%' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Deadtuples Count
          </Typography>
          {chartData && React.createElement(getIcon(), { style: { color: getIconColor() } })}
          <IconButton onClick={handlePopoverOpen} size="small" style={{ marginLeft: '-3px', marginRight: '-1px' }}>
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 , alignItems: 'center'}} style={{ width: '600px', whiteSpace: 'pre-line' }}>
              <HelpOutlineIcon fontSize="small" sx={{ marginBottom: '-5px', marginLeft: '3px', marginRight: '3px'}}/>
                DB全体のデッドタプル数です。
                デッドタプルが増えすぎるとパフォーマンスの低下やストレージの圧迫に繋がります。
                手動でのVACUUM実行やAUTO VACUUMの適切な設定を試みてください。
            </Typography>
          </Popover>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginBottom: '-15px', marginTop: '-15px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '-30px',marginBottom: '-15px', marginTop: '-15px', width: '100%' }}>
            <Box sx={{ border: '1px solid ' + statusColors['ok'], borderRadius: '5px', padding: '1.5px',alignItems: 'center', marginRight: '0.5vw'}}>  
              <Typography variant="body2" sx={{ color: statusColors['ok'] }}>
                {'≦ ' + Thresholds.deadtuple.ok}
              </Typography>
            </Box>
            <Box sx={{ border: '1px solid ' + statusColors['watch'], borderRadius: '5px', padding: '1.5px',alignItems: 'center', marginRight: '0.5vw'}}>  
              <Typography variant="body2" sx={{ color: statusColors['watch'] }}>
                {Thresholds.deadtuple.ok + '< ~ ≦ '+ Thresholds.deadtuple.watch}
              </Typography>
            </Box>
            <Box sx={{ border: '1px solid ' + statusColors['alert'], borderRadius: '5px', padding: '1.5px',alignItems: 'center', marginRight: '0.5vw'}}>  
              <Typography variant="body2" sx={{ color: statusColors['alert'] }}>
                {'> ' + Thresholds.deadtuple.watch}
              </Typography>
            </Box>
          </Box>
            <Checkbox
              checked={yAxisFixed}
              onChange={() => setYAxisFixed(!yAxisFixed)}
            />
            <Typography variant="body2">
              AutoScale
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'left', width: '100%' , marginBottom: '-20px', marginTop: '2vh'}}>
          <div style={{ position: 'relative', height: '20vh', width: '100%', marginLeft: '-2vw', marginRight: '-2vw' }}>
            {chartData ? <Bar options={options()} data={chartData}/> : <CircularProgress sx={{marginTop: '7vh'}}/>}
            {(chartData && chartData.datasets[0].data.every((val: number) => val === 0)) && (
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  backgroundColor: 'rgba(211, 211, 211, 0.5)', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center' 
                }}
              >
                <Typography variant="body1" align="center">
                  デッドタプルが存在しませんでした
                </Typography>
              </Box>
            )}
          </div>
        </Box>
    </CardContent>
  </Card>

  );
};

export default DeadTuple;
