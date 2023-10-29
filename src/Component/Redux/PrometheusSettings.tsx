import * as YAML from "js-yaml";
import instance from "../../Axios/AxiosInstance";
import yatagarasuSettings from "./YatagarasuSettings";

interface PrometheusSettings {
  nodeScrapeInterval: string;
  postgresqlScrapeInterval: string;
}

interface PrometheusStatusConfigResponse {
  yaml: string;
}

interface PrometheusAPIResponse {
  status: string;
  data: PrometheusStatusConfigResponse;
}

const fetchPrometheusStatusConfig = async () => {
  try {
    const response = await instance.get('/api/v1/status/config');
    return response.data;
  } catch (err) {
    console.log("err:", err);
    throw err;
  }
}

export let prometheusSettings: PrometheusSettings | null = null;

export const fetchPrometheusSettings = async () => {
  const response: PrometheusAPIResponse = await fetchPrometheusStatusConfig();
  const parsed: any = YAML.load(response.data.yaml);

  // TODO: ジョブ名はユーザーが設定できるようにする。
  const nodeScrapeConfig       = parsed.scrape_configs.find((config: any) => config.job_name === yatagarasuSettings.nodeExporterJobName);
  const postgresqlScrapeConfig = parsed.scrape_configs.find((config: any) => config.job_name === yatagarasuSettings.postgresExporterJobName);

  if (nodeScrapeConfig && postgresqlScrapeConfig) {
    prometheusSettings = {
        nodeScrapeInterval:       nodeScrapeConfig.scrape_interval,
        postgresqlScrapeInterval: postgresqlScrapeConfig.scrape_interval,
    }
  } else {
    prometheusSettings = {
      nodeScrapeInterval:       '15s',
      postgresqlScrapeInterval: '15s',
    }
  }
};
