import { green, yellow, red } from '@mui/material/colors';

// ステータス
export type Status = "ok" | "watch" | "alert";

export type StatusColor = {
  [key in Status]: string;
};

// 閾値
export const Thresholds = {
  cpu: {
    ok: 20,
    watch: 60
  },
  memory: {
    ok: 40,
    watch: 70
  },
  disk: {
    ok: 40,
    watch: 70
  },
  deadtuple: {
    ok: 10,
    watch: 30
  },
};

export const statusColors = {
  ok: green[500],
  watch: yellow[700],
  alert: red[500]
};

