import Typography from '@mui/material/Typography';

const os = () => {

  return(
    <><Typography variant="h5" component="div" align="left">
      OSレイヤ情報とは？
    </Typography><Typography variant="h6" component="div" align="left">
        <ul></ul>
      </Typography><Typography variant="body1" component="div" align="left">
        DBの稼働状況を確認するために、OSレイヤの情報を表示します。
      </Typography><Typography variant="body1" component="div" align="left">
        CPUやメモリの使用率、ディスクの使用量などを確認することができます。
      </Typography></>
  );
}

export default os;