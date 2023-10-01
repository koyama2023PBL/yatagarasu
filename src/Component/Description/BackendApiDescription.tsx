import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

const BackendApiDescription = () => {

  return(
    <Card sx={{ width: '95vw'}}>
      <CardContent>
        <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
          Backend APIs
        </Typography>
          <Typography variant="body1"  sx={{display: 'flex',marginLeft: '2vw', marginTop: '1.5vh'}}>
            This is Backend APIs information with Swagger UI.
          </Typography>
          <Typography variant="body1"  sx={{display: 'flex',marginLeft: '2vw'}}>
            These APIs are available for database health-checking, metrics ...etc.
          </Typography>
      </CardContent>
    </Card>
  );
}

export default BackendApiDescription;