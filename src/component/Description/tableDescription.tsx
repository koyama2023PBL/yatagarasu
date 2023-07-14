import Typography from '@mui/material/Typography';

const table = () => {

  return(
    <><Typography variant="h5" component="div" align="left">
      テーブル・クエリレイヤ情報とは？
    </Typography><Typography variant="h6" component="div" align="left">
        <ul></ul>
      </Typography><Typography variant="body1" component="div" align="left">
        データベースの稼働状況を確認するために、RDBMSレイヤより細かい情報を表示します。
      </Typography><Typography variant="body1" component="div" align="left">
        具体的には、クエリ種別毎の平均時間や、スロークエリ数を確認することができます。
      </Typography></>
  );
}

export default table;