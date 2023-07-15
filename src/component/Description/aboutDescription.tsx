import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

const About = () => {

  return(
    <Card>
      <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '20vh', width: '50vw', marginTop: '-20px',marginBottom: '-20px'}}>
            <h2>What is DatabaseExplorer ?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', marginTop: '-10px',marginBottom: '-15px', marginLeft: '2vw'}}>
                <Typography variant="body1" component="div" align="left">
                  このアプリケーションは、データベースの状態を可視化するためのアプリケーションです。
                </Typography><Typography variant="body1" component="div" align="left">
                  PostgreSQLの運用監視をより簡単に、より効率的に行うことを目的としています。
                </Typography>
            </div>
          </div>
        </CardContent>
    </Card>
  );
}

export default About;