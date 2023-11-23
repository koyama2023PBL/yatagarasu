import {green, red, yellow} from "@mui/material/colors";

export type StatusType = 'OK' | 'WARNING' | 'ERROR';

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
