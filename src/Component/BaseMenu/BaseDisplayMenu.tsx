import * as React from 'react';
import { styled, useTheme, Theme, CSSObject, SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemTextIcon from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Home as HomeIcon,
  Summarize as SummarizeIcon,
  Dashboard as DashboardIcon,
  Explore as ExploreIcon,
  Troubleshoot as TroubleshootIcon,
  QueryStats as QueryStatsIcon,
  DashboardCustomize as DashboardCustomizeIcon,
  DeveloperBoard as DeveloperBoardIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';


import ExploreModeMenu from '../Layers/ExploreModeMenu';
import icon from '../../img/icon.png';

import { CheckModeMenu } from "../Layers/CheckModeMenu";
import { setSelected } from '../Redux/MenuState';
import { RootState } from '../Redux/StateStore';
import HomeMenu from '../Layers/HomeMenu';
import {AdvancedModeMenu} from "../Layers/AdvancedModeMenu";
import SettingsMenu from '../Layers/SettingsMenu';
import renderRoutes from '../Router/YatagarasuRouter';

const drawerWidth = 200;

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

interface MenuItem {
  id: string;
  text: string;
  icon: React.ReactElement;
}

const menuItems: MenuItem[] = [
  { id: 'check', text: 'Check', icon: <SummarizeIcon style={{ fontSize: 40 }}/> },
  { id: 'explore', text: 'Explore', icon: <ExploreIcon style={{ fontSize: 40 }}/> },
  { id: 'advanced', text: 'Advanced', icon: <QueryStatsIcon style={{ fontSize: 40 }}/> },
];


export default function BaseDisplayMenu() {

  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.menu.selected);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const isSelected = (itemId: string): boolean => selected === itemId;

  React.useEffect(() => {
    const path = location.pathname.split('/')[1];
    if (path) dispatch(setSelected(path));
  }, [location, dispatch]);

  const handleSettingsClick = () => {
    navigate('/settings'); 
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
            sx={{marginRight: 1, ...(open && { display: 'none' })}}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="a" href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'flex',
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
            <IconButton color="inherit" aria-label="open settings" edge="end" onClick={handleSettingsClick} sx={{fontSize: '2rem', padding: '12px', margin: '-12px' }}>
              <SettingsIcon sx={{
                fontSize: 'inherit',
              }}/>
            </IconButton>
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
        {menuItems.map((item) => (
        <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
          <Link to={`/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Tooltip title={item.text} placement="right" arrow>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 3,
                  backgroundColor: isSelected(item.id) ? '#DDE1E1' : 'inherit',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: isSelected(item.id) ? theme.palette.primary.main : '#696969',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemTextIcon primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Tooltip>
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
