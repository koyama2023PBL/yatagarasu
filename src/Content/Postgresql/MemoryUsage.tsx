import React, { useEffect, useState } from "react";
import {Chart, registerables} from "chart.js";
import { Bar } from "react-chartjs-2";

import {rgbToRgba, unixTimeToDate} from '../../Component/Common/Util';
import { Box, Card, CardContent, Checkbox,CircularProgress,IconButton,Popover,Typography } from "@mui/material";
import annotationPlugin from 'chartjs-plugin-annotation';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Status, statusColors, Thresholds } from "../../Component/Threshold/Threshold";
import { prometheusSettings } from "../../Component/Redux/PrometheusSettings";
import {invokeQueryRange, QueryRangeResponse} from "../../Component/Common/PrometheusClient";

export interface MemUsageResponseMetric {
  instance: string;
  job: string;
}

interface MemoryUsageProps {
  starttime: Date;
  endtime: Date;
}

Chart.register(annotationPlugin, ...registerables);

const MemoryUsage: React.FC<MemoryUsageProps> = ({ starttime, endtime }) => {
  const [chartData, setChartData] = useState<any | null>(null);
  const [, setStatusCode] = useState<number | null>(null);
  const [yAxisFixed, setYAxisFixed] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)};
  const handlePopoverClose = () => {setAnchorEl(null)};
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchChartData = async () => {
      const query = '(node_memory_MemTotal_bytes-node_memory_MemAvailable_bytes)/(1024*1024)'
      const { status: status, data: response }: {status: number, data: QueryRangeResponse<MemUsageResponseMetric>}
          = await invokeQueryRange<QueryRangeResponse<MemUsageResponseMetric>>(query, starttime, endtime, prometheusSettings?.postgresqlScrapeInterval);
      setStatusCode(status);
      const labels = response.data.result.flatMap(data => data.values).map(value => unixTimeToDate(value[0]));
      const backgroundColor = response.data.result.flatMap(data => 
        data.values.map(value => {
          let status: Status;
          if (Number(value[1]) <= Thresholds.memory.ok) {
            status = 'ok';
          } else if (Number(value[1]) <= Thresholds.memory.watch) {
            status = 'watch';
          } else {
            status = 'alert';
          }
          return rgbToRgba(statusColors[status], 0.1);
        })
      );
      const borderColor = response.data.result.flatMap(data => 
        data.values.map(value => {
          let status: Status;
          if (Number(value[1]) <= Thresholds.memory.ok) {
            status = 'ok';
          } else if (Number(value[1]) <= Thresholds.memory.watch) {
            status = 'watch';
          } else {
            status = 'alert';
          }
          return rgbToRgba(statusColors[status], 1);
        })
        );
      const length = labels.length;
      const data = response.data.result.flatMap(data => data.values).map(value => Number(value[1]));

      setChartData({
        labels: labels,
        datasets: [
          {
            data: data,
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
        max: yAxisFixed ? undefined : 16384,
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
            return `${parseFloat(dataset[index]).toFixed(2) + ' MiB'}`;
          },
        },
      },
    }
  });

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '-15px', marginTop: '-5px', width: '100%' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            メモリ使用量(MiB)
          </Typography>
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
              PostgresSQLが使用するメモリのうち、共有バッファを除いたプロセスメモリの使用量を表示します。
              クエリ実行のために使用するメモリの最大値は「ワークメモリのサイズ」×「同時接続可能数」となります。
              この最大値がマシンのリソース内に収まるよう適切に設定してください。
            </Typography>
          </Popover>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginBottom: '-15px', marginTop: '-15px' }}>
            <Box sx={{ border: '1px solid ' + statusColors['ok'], borderRadius: '5px', padding: '1.5px',alignItems: 'center', marginRight: '0.5vw'}}>  
              <Typography variant="body2" sx={{ color: statusColors['ok'] }}>
                {'≦ ' + Thresholds.memory.ok + 'MiB'}
              </Typography>
            </Box>
            <Box sx={{ border: '1px solid ' + statusColors['watch'], borderRadius: '5px', padding: '1.5px',alignItems: 'center', marginRight: '0.5vw'}}>  
              <Typography variant="body2" sx={{ color: statusColors['watch'] }}>
                {Thresholds.memory.ok + 'MiB' +'< ~ ≦ '+ Thresholds.memory.watch + 'MiB'}
              </Typography>
            </Box>
            <Box sx={{ border: '1px solid ' + statusColors['alert'], borderRadius: '5px', padding: '1.5px',alignItems: 'center', marginRight: '0.5vw'}}>  
              <Typography variant="body2" sx={{ color: statusColors['alert'] }}>
                {'> ' + Thresholds.memory.watch + 'MiB'}
              </Typography>
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
          <div style={{ height: '20vh', width: '100%', marginLeft: '-2vw', marginRight: '-2vw' }}>
            {chartData ? <Bar options={options()} data={chartData}/> : <CircularProgress sx={{marginTop: '7vh'}}/>}
          </div>
        </Box>
    </CardContent>
  </Card>

  );
};

export default MemoryUsage;
