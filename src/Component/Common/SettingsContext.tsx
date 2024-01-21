import React, {createContext, useState, useEffect, useContext, ReactNode} from 'react';
import axios from 'axios';
import yaml from 'js-yaml';

interface SettingsProviderProps {
  children: ReactNode;
}

export interface Settings {
  prometheus: PrometheusSettings;
  target_db: TargetDBSettings;
  grafana: GrafanaSettings;
  status_colors: StatusColorSettings;
  threshold: ThresholdSettings;
}

export interface PrometheusSettings {
  url: string;
  node_exporter: ExporterSettings;
  process_exporter: ExporterSettings;
  postgres_exporter: ExporterSettings;
}

export interface ExporterSettings {
  job_name: string;
}

export interface TargetDBSettings {
  dbname: string;
}

export interface GrafanaSettings {
  dashboard_urls: string[];
}

export interface StatusColorSettings {
  ok: string;
  watch: string;
  alert: string;
}

export interface ThresholdSettings {
  check: CheckModeThresholdSettings;
  explore: ExploreModeThresholdSettings;
}

export interface CheckModeThresholdSettings {
  cpu_usage: Thresholds;
  check_point: Thresholds;
  cpu_io_wait: Thresholds;
  disk_busy: Thresholds;
  disk_usage: Thresholds;
  transaction_count: Thresholds;
}

export interface ExploreModeThresholdSettings {
  cpu: Thresholds;
  memory_usage_ratio: Thresholds;
  memory_usage_vol: Thresholds;
  disk: Thresholds;
  deadtuple: Thresholds;
  deadtuple_ratio: Thresholds;
  deadlocks: Thresholds;
  query_counts: Thresholds;
  query_runtime: Thresholds;
  avg_querytime: Thresholds;
  slow_query: Thresholds;
  latency: Thresholds;
}

export interface Thresholds {
  ok: number;
  watch: number;
}

// コンテキストの作成
const SettingsContext = createContext<Settings | null>(null);

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await axios.get('/settings.yml');
        const settingsData: Settings = yaml.load(res.data) as Settings;
        setSettings(settingsData);
      } catch (error) {
        console.error('設定ファイルの読み込みに失敗しました:', error);
      }
    };

    void loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

// コンテキストを使用するためのカスタムフック
export const useSettings = (): Settings | null => useContext(SettingsContext);
