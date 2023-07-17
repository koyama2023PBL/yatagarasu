import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

const DatabaseInfomation = () => {

  return(
    <Card sx={{ width: '55vw'}}>
      <CardContent>
        <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            【仮】Database Infomation
        </Typography>
          <Typography variant="body1"  sx={{display: 'flex',marginLeft: '2vw', marginTop: '1.5vh'}}>
            This is area for display database infomation.
          </Typography>
          <Typography variant="body1"  sx={{display: 'flex',marginLeft: '2vw'}}>
            There will be filled in with DB name, IP, instances, number of tables.
          </Typography>
          <Typography variant="body1"  sx={{display: 'flex',marginLeft: '2vw'}}>
            なお、こちらの項目は追って監視対象のDB情報を表示する箇所とします。
          </Typography>
      </CardContent>
    </Card>

  );
}

export default DatabaseInfomation;