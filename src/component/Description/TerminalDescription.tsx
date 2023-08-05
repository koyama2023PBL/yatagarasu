import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

const table = () => {

  return(
    <Card sx={{ width: '55vw'}}>
      <CardContent>
        <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            (Beta) Terminal
        </Typography>
          <Typography variant="body1"  sx={{display: 'flex',marginLeft: '2vw', marginTop: '1.5vh'}}>
            This is area for display Terminal.
          </Typography>
      </CardContent>
    </Card>
  );
}

export default table;