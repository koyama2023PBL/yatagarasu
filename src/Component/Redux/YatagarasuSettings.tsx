// TODO: 設定ファイルに移行できたらこのファイルは削除する。

interface YatagarasuSettings {
  dbname: string;
  nodeExporterJobName: string;
  postgresExporterJobName: string;
}

const yatagarasuSettings: YatagarasuSettings = {
  dbname: 'yatagarasu-db',
  nodeExporterJobName: 'node_exporter',
  postgresExporterJobName: 'postgres_exporter',
};

export default yatagarasuSettings;
