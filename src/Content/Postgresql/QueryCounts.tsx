import React, {useEffect, useState} from "react";
import {Chart, registerables} from 'chart.js';
import {Bar} from "react-chartjs-2";

import {rgbToRgba, unixTimeToDate} from '../../Component/Common/Util';
import {Box, Card, CardContent, Checkbox, CircularProgress, IconButton, Popover, Typography} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {green, red, yellow} from '@mui/material/colors';
import annotationPlugin from 'chartjs-plugin-annotation';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import {Status, statusColors, Thresholds} from "../../Component/Threshold/Threshold";
import {prometheusSettings} from "../../Component/Redux/PrometheusSettings";
import yatagarasuSettings from "../../Component/Redux/YatagarasuSettings";
import {invokeQueryRange, QueryRangeResponse} from "../../Component/Common/PrometheusClient";

interface QueryCountsProps {
  starttime: Date;
  endtime: Date;
}

interface QueryCountsApiResponseMetric {
  __name__: string;
  datid: string;
  datname: string;
  instance: string;
  job: string;
}

Chart.register(annotationPlugin, ...registerables);

const QueryCounts: React.FC<QueryCountsProps> = ({ starttime, endtime }) => {
  const [chartData, setChartData] = useState<any | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [yAxisFixed, setYAxisFixed] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)};
  const handlePopoverClose = () => {setAnchorEl(null)};
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchChartData = async () => {
      const query = `pg_stat_activity_count{datname="${yatagarasuSettings.dbname}",state="active"}`;
      const { status: status, data: response }: {status: number, data: QueryRangeResponse<QueryCountsApiResponseMetric>}
          = await invokeQueryRange<QueryRangeResponse<QueryCountsApiResponseMetric>>(query, starttime, endtime, prometheusSettings?.postgresqlScrapeInterval);
      setStatusCode(status);
      const queryCounts = response.data.result.flatMap((data) =>
          data.values.map(([_, queryCounts]) => queryCounts));
      const labels = response.data.result.flatMap((data) =>
          data.values.map(([labels, _]) => labels))
                     .map(value => { return unixTimeToDate(value).toLocaleString(); });

      const borderColor = queryCounts.map((value)=> {
        let status: Status;
        if (Number(value) <= Thresholds.querycounts.ok) {
          status = 'ok';
        } else if (Number(value) <= Thresholds.querycounts.watch) {
          status = 'watch';
        } else {
          status = 'alert';
        }
        return rgbToRgba(statusColors[status], 1);
      });
      const backgroundColor = queryCounts.map((value) => {
        let status: Status;
        if (Number(value) <= Thresholds.querycounts.ok) {
          status = 'ok';
        } else if (Number(value) <= Thresholds.querycounts.watch) {
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
            data: queryCounts,
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
            return `${parseFloat(dataset[index]).toFixed(2) + ' 個'}`;
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
            トータルクエリ数
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
              指定時間内のクエリ数を表示します。
            </Typography>
          </Popover>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginBottom: '-15px', marginTop: '-15px' }}>
            <Box sx={{ border: '1px solid ' + statusColors['ok'], borderRadius: '5px', padding: '1.5px',alignItems: 'center', marginRight: '0.5vw'}}>  
              <Typography variant="body2" sx={{ color: statusColors['ok'] }}>
                {'≦ ' + Thresholds.querycounts.ok }
              </Typography>
            </Box>
            <Box sx={{ border: '1px solid ' + statusColors['watch'], borderRadius: '5px', padding: '1.5px',alignItems: 'center', marginRight: '0.5vw'}}>  
              <Typography variant="body2" sx={{ color: statusColors['watch'] }}>
                {Thresholds.querycounts.ok +'< ~ ≦ '+ Thresholds.querycounts.watch }
              </Typography>
            </Box>
            <Box sx={{ border: '1px solid ' + statusColors['alert'], borderRadius: '5px', padding: '1.5px',alignItems: 'center', marginRight: '0.5vw'}}>  
              <Typography variant="body2" sx={{ color: statusColors['alert'] }}>
                {'> ' + Thresholds.querycounts.watch}
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

export default QueryCounts;
