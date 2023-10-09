import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import MapIcon from '@mui/icons-material/Map';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

type SidebarProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const pages = [
  { title: 'Home', link: '', icon: <HomeIcon /> },
  { title: 'My Profile', link: 'my-profile', icon: <AccountCircleIcon /> },
  { title: 'Meetings', link: 'meetings', icon: <GroupsIcon /> },
  { title: 'Nearby', link: 'nearby', icon: <MapIcon /> },
];

const drawerWidth = 200;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
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
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

export default function SideBar(props: SidebarProps) {
  const theme = useTheme();
  const handleDrawerClose = () => {
    props.setOpen(false);
  };

  return (
    <Box>
      <Drawer variant="permanent" open={props.open} sx={!props.open ? { display: { xs: 'none', md: 'flex' } } : {}}>
        <DrawerHeader sx={{ background: '#EEEEF1' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ background: '#EEEEF1' }}>
          {pages.map((page) => (
            <Link to={`/${page.link}`} style={{ textDecoration: 'none', color: '#555' }}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: props.open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: props.open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {page.icon}
                  </ListItemIcon>
                  <ListItemText primary={page.title} sx={{ opacity: props.open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <Box sx={{ flexGrow: 1, background: '#EEEEF1' }} />
      </Drawer>
    </Box>
  );
}
