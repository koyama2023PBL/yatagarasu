import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

const rdbms = () => {

  return(
    <Card sx={{ width: '55vw'}}>
      <CardContent>
        <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            【仮】Configuration Menu
        </Typography>
          <Typography variant="body1"  sx={{display: 'flex',marginLeft: '2vw', marginTop: '1.5vh'}}>
            This is area for display Configuration Menu.
          </Typography>
      </CardContent>
    </Card>
  );
}

export default rdbms;