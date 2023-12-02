import { Card, CardContent, Box } from '@mui/material';
import TimePicker from './TimePicker';
import { DynamicBreadcrumbs } from './DynamicBreadcrumbs';



export const BreadcrumbsBar = () => {
  return (
    <Card sx={{marginTop:'-0.5vh'}}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <DynamicBreadcrumbs />
          <TimePicker />
        </Box>
      </CardContent>
    </Card>
  );
};