import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import icon from '../../img/icon.png';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import SummarizeIcon from '@mui/icons-material/Summarize';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Storage from '@mui/icons-material/Storage';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

import OverViewMenu from '../Layers/OverViewMenu';
import OsMenu from '../Layers/OsMenu';
import RdbmsMenu from '../Layers/RdbmsMenu';
import TableMenu from '../Layers/TableMenu';
import SettingMenu from '../Layers/SettingMenu';

import TimePicker from '../Common/TimePicker';
import { AnalysisReportMenu } from "../Layers/AnalysisReportMenu";
import { Link, Route, Routes, useLocation } from 'react-router-dom';

const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 0),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function BaseDisplayMenu() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const location = useLocation();

  const renderRoutes = () => (
    <Routes>
      <Route path="/" element={<OverViewMenu search={location.search} />} />
      <Route path="/dashboard" element={<OverViewMenu search={location.search} />} />
      <Route path="/server" element={<OsMenu search={location.search}/>} />
      <Route path="/rdbms" element={<RdbmsMenu/>} />
      <Route path="/settings" element={<SettingMenu/>} />
      <Route path="/analysis-report" element={<AnalysisReportMenu/>}/>
      <Route path="/table-and-queries" element={<TableMenu/>} />
    </Routes>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{marginRight: 5, ...(open && { display: 'none' })}}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="a" href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'flex',
              //fontFamily: 'Noto Sans',
              fontWeight: 850,
              alignItems: 'center',
              letterSpacing: '.0.8rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          <img src={icon} alt="icon" style={{ height: '50px', marginRight: '12px' }} />
          Yatagarasu
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <TimePicker/>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {[{ id: 'analysis-report', text: 'Analysis Report', icon: <SummarizeIcon style={{ fontSize: 40 }}/> },
          { id: 'dashboard', text: 'Dashboard', icon: <DashboardIcon style={{ fontSize: 40 }}/> },
          { id: 'server', text: 'Server', icon: <DeveloperBoardIcon style={{ fontSize: 40 }}/> },
          { id: 'rdbms', text: 'RDBMS', icon: <Storage style={{ fontSize: 40 }}/> },
          { id: 'table-and-queries', text: 'Table & Query', icon: <TroubleshootIcon style={{ fontSize: 40 }}/> },
          { id: 'settings', text: 'Settings(Beta)', icon: <Settings style={{ fontSize: 40 }}/> }
        ].map((item) => (
          <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
            <Link to={`/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{minHeight: 48,justifyContent: open ? 'initial' : 'center',px: 3}}>
                <ListItemIcon sx={{minWidth: 0,mr: open ? 3 : 'auto',justifyContent: 'center',}}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
        </List>
      </Drawer>
        <Box sx={{ display: 'grid', gridTemplateRows: '1fr auto', minHeight: '100vh'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: `${theme.mixins.toolbar.minHeight}px`}}>
            <Box sx={{  display: 'flex', flexDirection: 'row', alignItems: 'left',flexGrow: 0,p: 1,width: '95vw',marginTop: '0.5vh'}}></Box>
              {renderRoutes()}
          </Box>
      </Box>
    </Box>
  );
}
