import Typography from '@mui/material/Typography';

const rdbms = () => {

  return(
    <><Typography variant="h5" component="div" align="left">
      RDBMSレイヤ情報とは？
    </Typography><Typography variant="h6" component="div" align="left">
        <ul></ul>
      </Typography><Typography variant="body1" component="div" align="left">
        RDBMSの稼働状況を確認するために、RDBMSレイヤの情報を表示します。
      </Typography><Typography variant="body1" component="div" align="left">
        具体的には、キャッシュヒット率やデッドタプルなどの情報をデータベース単位で確認することができます。
      </Typography></>
  );
}

export default rdbms;