import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

const RdbmsDescription = () => {

  return(
    <Card sx={{ width: '55vw'}}>
      <CardContent>
        <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            【仮】RDBMS Infomation
        </Typography>
          <Typography variant="body1"  sx={{display: 'flex',marginLeft: '2vw', marginTop: '1.5vh'}}>
            This is area for display RDBMS infomation.
          </Typography>
          <Typography variant="body1"  sx={{display: 'flex',marginLeft: '2vw'}}>
            There will be filled in with DB kind, version, etc.
          </Typography>
      </CardContent>
    </Card>
  );
}

export default RdbmsDescription;