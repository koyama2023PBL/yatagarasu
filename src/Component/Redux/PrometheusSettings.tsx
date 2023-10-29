import * as YAML from "js-yaml";
import instance from "../../Axios/AxiosInstance";

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
    console.log(response)
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

  const nodeScrapeConfig       = parsed.scrape_configs.find((config: any) => config.job_name === 'node_exporter');
  const postgresqlScrapeConfig = parsed.scrape_configs.find((config: any) => config.job_name === 'postgres_exporter');

<<<<<<< HEAD
  prometheusSettings = {
    nodeScrapeInterval:       nodeScrapeConfig.scrape_interval,
    postgresqlScrapeInterval: postgresqlScrapeConfig.scrape_interval,
    //nodeScrapeInterval:       nodeScrapeConfig ? nodeScrapeConfig.scrape_interval : "15s",
    //postgresqlScrapeInterval: postgresqlScrapeConfig ? postgresqlScrapeConfig.scrape_interval : "15s",
=======
  if (nodeScrapeConfig && postgresqlScrapeConfig) {
    prometheusSettings = {
        nodeScrapeInterval:       nodeScrapeConfig.scrape_interval,
        postgresqlScrapeInterval: postgresqlScrapeConfig.scrape_interval,
    }
  } else {
    prometheusSettings = {
      nodeScrapeInterval:       '15',
      postgresqlScrapeInterval: '15',
    }
>>>>>>> main
  }
};
