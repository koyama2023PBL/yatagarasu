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

import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../Redux/MenuState'; 
import { RootState } from '../Redux/StateStore';

import OverViewMenu from '../Layers/OverViewMenu';
import OsMenu from '../Layers/OsMenu';
import RdbmsMenu from '../Layers/RdbmsMenu';
import TableMenu from '../Layers/TableMenu';

import TimePicker from '../Common/TimePicker';
import DatabaseInformation from '../../Content/Postgresql/DatabaseInformation';
import ReportingInfo from "../../Content/AnalysisReport/ReportingInfo";
import {AnalysisReportMenu} from "../Layers/AnalysisReportMenu";

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
      case 'analysisreport':
        return <AnalysisReportMenu />;
      case 'dashboard':
        return <OverViewMenu />;
      case 'os':
        return <OsMenu />;
      case 'rdbms':
        return <RdbmsMenu />;
      case 'table':
        return <TableMenu />;
      default:
        return null;
    }
  };

  const renderContentDesc = () => {
    switch (selected) {
      case 'analysisreport':
        return <ReportingInfo />;
      case 'dashboard':
        return <DatabaseInformation />;
      case 'os':
        return <DatabaseInformation />
        //return <OSDesc />;
      case 'rdbms':
        return <DatabaseInformation/>;
        //return <RDBMSDesc />;
      case 'table':
        return <DatabaseInformation/>;
        //return <TableDesc />;
      default:
        return <DatabaseInformation />;
    }
  };

  const renderDatePicker = () => {
    switch (selected) {
      case 'apiinfo':
        return;
      default:
        return <TimePicker/>;
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
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'flex',
              //fontFamily: 'M PLUS Rounded 1c',
              fontFamily: 'Noto Sans',
              fontWeight: 850,
              alignItems: 'center',
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          <img src={icon} alt="icon" style={{ height: '50px', marginRight: '12px' }} />
          Yatagarasu
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-end', 
            alignItems: 'flex-end', 
            width: '100%', 
            position: 'absolute',
            bottom: 0,
            right: 0,
            pr: 0.5,
            pb: 0.5,
            }}
          >
            <Typography variant="body2" align="right">
                © 2023 Advanced Institute of Industrial Technology, Koyama Lab. All rights reserved. Released under the MIT license.(仮)
            </Typography>
        </Box>
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
        {[{ id: 'dashboard', text: 'Dashboard', icon: <DashboardIcon style={{ fontSize: 40 }}/> },
          { id: 'os', text: 'OS', icon: <DeveloperBoardIcon style={{ fontSize: 40 }}/> },
          { id: 'rdbms', text: 'RDBMS', icon: <Storage style={{ fontSize: 40 }}/> },
          { id: 'table', text: 'Table & Query', icon: <TroubleshootIcon style={{ fontSize: 40 }}/> },
          { id: 'analysisreport', text: 'Analysis Report', icon: <SummarizeIcon style={{ fontSize: 40 }}/> },
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
        <Box sx={{ display: 'grid', gridTemplateRows: '1fr auto', minHeight: '100vh'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: `${theme.mixins.toolbar.minHeight}px`}}>
            <Box 
              sx={{  
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'left',
                flexGrow: 0,
                p: 1,
                height: '18vh',
                width: '95vw',
                marginTop: '1vh'
              }}>
              {renderContentDesc()}
              <Box sx={{ width: '1.5vh'}}></Box>
              {renderDatePicker()}
            </Box>
              {renderContentMain()}
          </Box>
      </Box>
    </Box>
  );
}
