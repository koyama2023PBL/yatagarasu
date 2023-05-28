import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

//https://mui.com/material-ui/material-icons/
import DashboardIcon from '@mui/icons-material/Dashboard';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import styled from '@emotion/styled';


const drawerWidth = 100;
interface Props {
  drawerWidth: number;
}

function PermanentDrawerLeft({drawerWidth}: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent" open
        anchor="left"
        style={{ width: drawerWidth }}
      >
        <List>
          <ListItem>
              <ListItemText primary="Item 1" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Item 2" />
            </ListItem>
          </List>
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
      </Box>
    </Box>
  );
}

export default PermanentDrawerLeft;