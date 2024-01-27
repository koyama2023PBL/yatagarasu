import {green, red, yellow} from "@mui/material/colors";
import {MRT_ColumnDef, MRT_RowData, useMaterialReactTable} from "material-react-table";

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

export const tableThemeOptions = () => {
  return {
    palette: {
      background: {
        default: 'rgb(240,244,249)',
      },
    },
  }
}

export function tableObject<T extends MRT_RowData>(columns: MRT_ColumnDef<T>[], data: T[]) {
  return useMaterialReactTable<T>({
    columns: columns,
    data: data,
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    muiTableBodyRowProps: {
      hover: false,
      sx: {maxHeight: '20px'},
    },
  });
}
