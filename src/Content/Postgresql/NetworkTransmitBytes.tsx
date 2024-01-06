import React, {useEffect, useState} from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";
import {Bar} from 'react-chartjs-2';
import {Box, Card, CardContent, Checkbox, CircularProgress, IconButton, Popover, Typography} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {green, red, yellow} from '@mui/material/colors';
import annotationPlugin from 'chartjs-plugin-annotation';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import {prometheusSettings} from "../../Component/Redux/PrometheusSettings";
import {invokeQueryRange, QueryRangeResponse} from "../../Component/Common/PrometheusClient";
import {getRandomColor, rgbToRgba, unixTimeToDate} from "../../Component/Common/Util";
import {Status, statusColors, Thresholds} from "../../Component/Threshold/Threshold";


interface TransmitBytesProps {
  starttime: Date;
  endtime: Date;
}

interface TransmitBytesApiResponseMetric {
  device: string;
  instance: string;
  job: string;
}

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  annotationPlugin,
  Title,
  Legend,
);

const NetworkTransmitBytes: React.FC<TransmitBytesProps> = ({starttime, endtime}) => {
  const [chartData, setChartData] = useState<any | null>(null);
  const [yAxisFixed, setYAxisFixed] = useState<boolean>(true);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchDiskReadData = async () => {
      const query = `rate(node_network_transmit_bytes_total[30s])`;
      const response
        = await invokeQueryRange<QueryRangeResponse<TransmitBytesApiResponseMetric>>(query, starttime, endtime, prometheusSettings?.postgresqlScrapeInterval);
      setStatusCode(response.status);

      // チャート用データの形成
      const labels = response.data.data.result[0].values.map((key) => unixTimeToDate(Number(key[0])).toLocaleString());
      const datasets = response.data.data.result.map((ds, index) => {
        const borderColor = getRandomColor(index);  // 先に borderColor を定義
        return {
          label: ds.metric.device,
          data: ds.values.map(v => v[1]),
          type: 'line',
          pointRadius: 0,
          borderWidth: 1,
          borderColor: borderColor,  // borderColor を使用
          backgroundColor: borderColor  // 同じ値を backgroundColor にも使用
        };
      });
      setChartData({ labels, datasets });
    };
    fetchDiskReadData();
  }, [starttime, endtime]);

  const options = () => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        barPercentage: 1.2,
        categoryPercentage: 1.2,
        ticks: {
          stacked: true,
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
      },
      y: {
        min: 0,
        max: yAxisFixed ? undefined : 10000000,
        ticks: {
          callback: function(value:any) {
            return `${(value / 1024 / 1024).toFixed(2)} MB`; // Y軸のラベルをMB単位に変換
          }
        }
      },
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
        display: true,
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
            return `${parseFloat(dataset[index]).toFixed(0) + 'Bytes'}`;
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
            Network Bytes Transmitted/sec
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
              秒ごとに送信するバイト数をカウントします。
              特定のノード（サーバーまたはコンピューター）のネットワークインターフェイスを通じて送信された総バイト数を追跡します。
              大量の送信トラフィックは、ネットワークの過負荷や潜在的な問題を示唆する可能性があります。
            </Typography>
          </Popover>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 'auto', marginBottom: '-15px', marginTop: '-15px' }}>
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
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};
export default NetworkTransmitBytes;
