import Typography from '@mui/material/Typography';

const About = () => {

  return(
    <><Typography variant="h5" component="div" align="left">
      DatabaseExplorerについて
    </Typography><Typography variant="h6" component="div" align="left">
        <ul></ul>
      </Typography><Typography variant="body1" component="div" align="left">
        このアプリケーションは、データベースの状態を可視化するためのアプリケーションです。
      </Typography><Typography variant="body1" component="div" align="left">
        PostgreSQLの運用監視をより簡単に、より効率的に行うことを目的としています。
      </Typography></>
  );
}

export default About;