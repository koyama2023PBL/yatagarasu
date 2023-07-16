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
import { setSelected } from '../Redux/MenuState'; 
import { RootState } from '../Redux/StateStore';

import OverViewMenu from '../Layers/OverViewMenu';
import OsMenu from '../Layers/OsMenu';
import RdbmsMenu from '../Layers/RdbmsMenu';
import TableMenu from '../Layers/TableMenu';
import SettingMenu from '../Layers/SettingMenu';

import About from '../Description/AboutDescription';
import OSDesc from '../Description/OsDescription';
import RDBMSDesc from '../Description/RdbmsDescription';
import TableDesc from '../Description/TableDescription';
import SettingsDesc from '../Description/SettingsDescription';

import TimePicker from '../Common/TimePicker';
import Footer from './Footer';
import LineChart from '../../Content/LineChart';

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

  const renderContentMain = () => {
    switch (selected) {
      case 'dashboard':
        return <OverViewMenu />; // Dashboardアイコンが選択された場合、ダッシュボードのコンテンツを表示
      case 'os':
        return <OsMenu />;
      case 'rdbms':
        return <RdbmsMenu />;
      case 'table':
        return <TableMenu />;
      case 'settings':
        //return <SettingMenu />;
        return <LineChart/>
      default:
        return null;
    }
  };

  const renderContentDesc = () => {
    switch (selected) {
      case 'dashboard':
        return <About />;
      case 'os':
        return <OSDesc />;
      case 'rdbms':
      return <RDBMSDesc />;
      case 'table':
      return <TableDesc />;
      case 'settings':
      return <SettingsDesc />;
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
        {[{ id: 'dashboard', text: 'ダッシュボード', icon: <DashboardIcon style={{ fontSize: 40 }}/> },
          { id: 'os', text: 'OS情報', icon: <Terminal style={{ fontSize: 40 }}/> },
          { id: 'rdbms', text: 'RDBMS情報', icon: <Storage style={{ fontSize: 40 }}/> },
          { id: 'table', text: 'テーブル・クエリ情報', icon: <TroubleshootIcon style={{ fontSize: 40 }}/> },
          { id: 'settings', text: '設定', icon: <Settings style={{ fontSize: 40 }}/> },
        ].map((item) => (
          <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={item.id === selected}
              onClick={() => dispatch(setSelected(item.id))}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 3,
              }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
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
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateRows: '1fr auto', 
            minHeight: '100vh'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: `${theme.mixins.toolbar.minHeight}px` }}>
            <Box 
              sx={{  
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'left',
                flexGrow: 0,
                p: 2,
                height: '22vh',
                width: '80vw',
              }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', height: '25vh', width: '50vw', marginRight:'1vw'}}>
                  {renderContentDesc()}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'right', height: '25vh', width: '30vw'}}>
                  <TimePicker/>
                </Box>
            </Box>
            {renderContentMain()}
            <Footer/>
          </Box>
      </Box>
    </Box>
  );
}
