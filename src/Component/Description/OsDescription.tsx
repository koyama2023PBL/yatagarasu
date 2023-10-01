import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

const OsDescription = () => {

  return(
    <Card sx={{ width: '55vw'}}>
      <CardContent>
        <Typography variant="body1" align="left" sx={{ fontWeight: 'bold' }}>
            【仮】OS Infomation
        </Typography>
          <Typography variant="body1"  sx={{display: 'flex',marginLeft: '2vw', marginTop: '1.5vh'}}>
            This is area for display Db-server infomation.
          </Typography>
          <Typography variant="body1"  sx={{display: 'flex',marginLeft: '2vw'}}>
            There will be filled in with IP, hostname, port, OS, version, kernel version, CPU, memory, disk.
          </Typography>
      </CardContent>
    </Card>
  )
}

export default OsDescription;