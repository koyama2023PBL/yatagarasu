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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import Terminal from '@mui/icons-material/Terminal';
import Storage from '@mui/icons-material/Storage';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import Settings from '@mui/icons-material/Settings';

import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../Redux/menu'; 
import { RootState } from '../Redux/store';

import CacheHitRate from '../../Content/CacheHitRate';
import CPUusage from '../../Content/CPUusage';
import SlowQueryCount from '../../Content/SlowQuery';
import AverageQueryTime from '../../Content/AvgQueryTime';
import PostgresProcessStatus from '../../Content/ProcessCheck';

import About from '../Description/aboutDescription';
import TimePicker from '../Common/TimePicker';

import DateTimePicker from '../Common/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers'

const drawerWidth = 240;

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
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 0),
  // necessary for content to be below app bar
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
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.menu.selected);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderContent = () => {
    switch (selected) {
      case 'Dashboard':
      // return <DashboardContent />; // Dashboardアイコンが選択された場合、ダッシュボードのコンテンツを表示
      // case 'Visualization':
      //   return <VisualizationContent />;
      // case 'Metrics':
      //   return <MetricsContent />;
      // case 'Analytics':
      //   return <AnalyticsContent />;
      // case 'Settings':
      //   return <SettingsContent />;
      default:
        return null;
    }
  };

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
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
          <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.0.7rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          DatabaseExplorer
          </Typography>
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
          {[{text: 'ダッシュボード', icon: <DashboardIcon />},
            {text: 'OS情報', icon: <Terminal />},  
            {text: 'RDBMS情報', icon: <Storage />}, 
            {text: 'テーブル・クエリ情報', icon: <TroubleshootIcon />},
            {text: '設定', icon: <Settings />}
          ].map((item, index) => (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  selected={item.text === selected}
                  onClick={() => setSelected(item.text)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 3,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
          ))}
        </List>
      </Drawer>
        {/*TODO 画面設計での説明の追加対応・DateTimePickerの追加*/}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: `${theme.mixins.toolbar.minHeight}px` }}>
          <Box 
            sx={{  
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'left',
              flexGrow: 0,
              p: 2,
              height: '20vh',
              width: '80vw',
              border: `1px dashed ${theme.palette.primary.main}`
            }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', height: '20vh', width: '60vw'}}>
                <About/>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '20vh', width: '20vw'}}>
                <TimePicker/>
              </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'left'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
              <Box
                component="main"
                sx={{
                  flexGrow: 0,
                  p: 2,
                  height: '40vh',
                  width: '40vw',
                  border: `1px dashed ${theme.palette.primary.main}`
                }}
              >
                <CPUusage />
              </Box>
              <Box
                  component="main"
                  border={1}
                  sx={{
                    flexGrow: 0,
                    p: 2,
                    height: '30vh',
                    width: '40vw',
                    border: `1px dashed ${theme.palette.primary.main}`,
                    color: theme.palette.text.primary
                  }}
                >
                  <PostgresProcessStatus />
                </Box>
              </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
              <Box
                component="main"
                border={1}
                sx={{
                  flexGrow: 0,
                  p: 2,
                  height: '24vh',
                  width: '40vw',
                  border: `1px dashed ${theme.palette.primary.main}`
                }}
              >
                <AverageQueryTime />
              </Box>
              <Box
                component="main"
                border={1}
                sx={{
                  flexGrow: 0,
                  p: 2,
                  height: '18vh',
                  width: '40vw',
                  border: `1px dashed ${theme.palette.primary.main}`
                }}
              >
                <CacheHitRate />
              </Box>
              <Box
                component="main"
                border={1}
                sx={{
                  flexGrow: 0,
                  p: 2,
                  height: '18vh',
                  width: '40vw',
                  border: `1px dashed ${theme.palette.primary.main}`,
                  color: theme.palette.text.primary
                }}
              >
                <SlowQueryCount />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
  );
}
