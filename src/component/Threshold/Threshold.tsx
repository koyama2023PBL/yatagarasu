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
  memory_ratio: {
    ok: 40,
    watch: 70
  },
  memory: {
    ok: 1000,
    watch: 1500
  },
  disk: {
    ok: 40,
    watch: 70
  },
  deadtuple: {
    ok: 10,
    watch: 30
  },
  deadtuple_ratio: {
    ok: 10,
    watch: 30
  },
  deadlocks: {
    ok: 2,
    watch: 5
  },
  querycounts: {
    ok: 1000,
    watch: 3000
  },
  queryruntime: {
    ok: 0.1,
    watch: 0.5
  },
  avgquerytime_counts: {
    ok: 0,
    watch: 1
  },
};

export const statusColors = {
  ok: green[500],
  watch: yellow[700],
  alert: red[500]
};

