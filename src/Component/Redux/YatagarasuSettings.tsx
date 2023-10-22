// TODO: 設定ファイルに移行できたらこのファイルは削除する。

interface YatagarasuSettings {
  dbname: string;
}

const yatagarasuSettings: YatagarasuSettings = {
  dbname: 'yatagarasu-db',
};

export default yatagarasuSettings;
