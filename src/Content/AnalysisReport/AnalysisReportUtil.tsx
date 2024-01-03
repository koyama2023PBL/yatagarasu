import {green, red, yellow} from "@mui/material/colors";

export type StatusType = 'OK' | 'WARNING' | 'ERROR';

export interface ReportingItemProps<T> {
  data: T | null;
}

export const getColorFromStatus = (status: StatusType) => {
  switch (status) {
    case 'OK':
      return green[500];
    case 'WARNING':
      return yellow[700];
    case 'ERROR':
      return red[500];
  }
}

export const getItemTitleSx = (status: StatusType | null) => {
  if (!status) {
    return {marginRight: '0.3vw'};
  }
  return {
    marginRight: '0.3vw',
    color: getColorFromStatus(status),
  };
}

export const lineChartOptions = (chartData: any | null, unit?: string) => {
  return {
    scales: {
      x: {
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
      },
      y: {
        stacked: false,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: function(value: any, _index: any, _ticks: any) {
            return value + (unit?? '%');
          }
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
        },
      },
    },
  }
}
