# Yatagarasu
PostgreSQLサーバーの監視ツール<br/>
サポートしているPostgreSQLのバージョン: `14`

## デモサイト
[こちらのデモサイト](https://www.koakjo.com/)から稼働中のYatagarasuを試すことができます.

## About
YatagarasuはPrometheusからメトリクスを取得してビジュアライズするクライアントアプリケーションです. この他Grafanaとの連携も可能です.<br/>
<img src="https://github.com/koyama2023PBL/yatagarasu/assets/103348257/8bfc3ccc-b045-43ae-9316-13dd5d18ff3f" width="30%" />

- [Prometheus](https://prometheus.io/)
- [Node Exporter](https://github.com/prometheus/node_exporter)
- [Process Exporter](https://github.com/ncabatoff/process-exporter)
- [PostgreSQL Server Exporter](https://github.com/prometheus-community/postgres_exporter)
- [Grafana](https://grafana.com/)

## QuickStart
YatagarasuのDockerイメージを公開予定です.
```sh
docker run \
  -v /your/configuration-file/filepath:/yatagarasu.yaml \
  /aiit/koyama2023PBL/yatagarasu
```

## Configuration File
Yatagarasuの稼働に必要な項目を設定ファイルに記述します.<br/>
設定項目はSettingsの項を参照してください.

Example:
```yaml
prometheus:
  url: http://your.prometheus.url
  node_exporter:
    job_name: node_job_name
  process_exporter:
    job_name: process_job_name
  postgres_exporter:
    job_name: postgres_job_name

target_db:
  dbname: your_db_name

grafana:
  dashboards_url: [
    http://your.grafana.url/d/999999999/datasource_name?orgId=1
  ]

threshold:
  check:
    cpu_usage:
      warning: 50
      error: 80
  explore:
    query_count:
      warning: 1000
      error: 3000
```

## Settings
### prometheus
- `url`(required): Yatagarasuで指標を取得するPrometheusのURL
- `(node | process | postgres)_exporter.job_name`(required): 各Exporterのジョブ名. `prometheus.yml`で設定している`scrape_configs`を参照してください.

### target_db
- `dbname`(required): 監視対象のDB名を指定してください. 単一のDBのみ設定可能です.

### grafana
- `dashboards_url`(optional): 連携するGrafanaのダッシュボードのURL. 複数設定可能です. URLには`orgId`のパラメータまで含めてください.

### threshold
Yatagarasuで使用する各指標の閾値. モード, 指標, Warning or Errorごとに設定可能です. いずれの閾値も設定は任意(optional)です.
#### check: Checkモードで使用する閾値
項目名 | 単位 | warningの<br/>デフォルト値 | errorの<br/>デフォルト値 | 詳細
-- | :--: | --: | --: | --
`cpu_usage` | % | 50 | 80 | CPU使用率.
`check_point` | 倍 | 2 | 3 | WAL契機のチェックポイント実行回数が<br/>時間契機の実行回数の何倍か
`cpu_io_wait` | % | 5 | 10 | CPUのIO待ち率
`disk_busy` | % | 50 | 80 | ディスクビジー率
`disk_usage` | % | 50 | 90 | ディスク使用率
`transaction_count` | % | 90 | 100 | `max_connection`に対する<br/>トランザクション数の比率

#### explore: Exploreモードで使用する閾値
項目名 | 単位 | warningの<br/>デフォルト値 | errorの<br/>デフォルト値 | 詳細
-- | :--: | --: | --: | --
`latency` | ms | 100 | 300 | レイテンシー
`query_count_total` | 件 | 1000 | 3000 | トータルクエリ数
`mem_usage_vol` | MiB | 1000 | 1500 | メモリ使用量
`mem_usage_ratio` | % | 40 | 70 | メモリ使用率

## Building and running
### Dockerイメージを使用しない場合
```sh
git clone https://github.com/koyama2023PBL/yatagarasu.git
cd yatagarasu
vim yatagarasu.yml
npm i
npm start
```

### Jarを用いて実行する場合
git clone https://github.com/koyama2023PBL/yatagarasu.git
java -jar ./jar/yatagarasu-demo-0.1.0.jar

### PostgreSQL Server Exporterへのクエリ追加
Yatagarasuには実際のSQLを表示する機能がありますが, デフォルトのPostgreSQL Server ExporterではSQLを取得できないため, 代わりに`queryid`が表示されます. 実際のSQLを表示するにはPostgreSQL Server Exporterにクエリを追加してください.<br/>
クエリの追加手順は[PostgreSQL Server Exporterのリポジトリ](https://github.com/prometheus-community/postgres_exporter?tab=readme-ov-file#adding-new-metrics)を参照してください. クエリを追加する際は本リポジトリの[queries.yaml](https://github.com/koyama2023PBL/yatagarasu/blob/update-readme/queries.yaml), または[queries.py](https://github.com/koyama2023PBL/yatagarasu/blob/update-readme/queries.py)を使用できます.
