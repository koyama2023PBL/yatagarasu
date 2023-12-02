import { useLocation, Link as RouterLink, Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';

export const DynamicBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((path) => path);

  return (
    <Breadcrumbs maxItems={3} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{marginTop: '-0.5vh', marginBottom: '-1.2vh'}}>
      <Link color="inherit" to="/">
        Yatagarasu
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {value}
          </Typography>
        ) : (
          <Link color="inherit" to={to} key={to}>
            {value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};