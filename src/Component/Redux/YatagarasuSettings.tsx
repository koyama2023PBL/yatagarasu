// TODO: 設定ファイルに移行できたらこのファイルは削除する。

interface YatagarasuSettings {
  dbname: string;
  nodeExporterJobName: string;
  postgresExporterJobName: string;
  grafanaDashboardUrl: string;
  grafanaDashboardContainerUrl: string;
  grafanaDashboardOrgId: number;
}

const yatagarasuSettings: YatagarasuSettings = {
  dbname: 'explorer',
  nodeExporterJobName: 'node_exporter',
  postgresExporterJobName: 'postgres_exporter',
  grafanaDashboardUrl: 'http://www.koakjo.com:9294/d/000000039/postgresql-database',
  grafanaDashboardContainerUrl: 'http://localhost:8080/d/000000039/postgresql-database',
  grafanaDashboardOrgId: 1,
};

export default yatagarasuSettings;
