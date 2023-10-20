import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import { NavLink } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { ROUTES } from '../../routes/routes.ts';
import { AnimatedText } from '../AnimatedText/AnimatedText.tsx';

type NavbarProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const pages = [
  { title: 'My Profile', link: ROUTES.MY_PROFILE },
  { title: 'Log in', link: ROUTES.LOG_IN },
  { title: 'Log out', link: ROUTES.LOG_OUT },
];

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 200;
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

export default function NavBar(props: NavbarProps) {
  const handleDrawerOpen = () => {
    props.setOpen(true);
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ background: '#161615' }} open={props.open}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              '& svg': { color: 'white' },
              marginRight: 5,
              ...(props.open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              height: '64px',
              alignItems: 'center',
              flexGrow: { xs: 1, md: '0' },
              pr: { xs: 5, md: 0 },
            }}
          >
            <img
              src="src/images/logo.png"
              alt="logo"
              style={{ maxHeight: '100%', maxWidth: '100%', verticalAlign: 'middle', margin: 'auto' }}
            />
          </Box>

          <Box sx={{ pl: 3, display: { xs: 'none', md: 'flex' } }}>
            <AnimatedText text="DevBridge" />
          </Box>

          <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Simon" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {pages.map((page, index) => (
                <NavLink key={index} style={{ textDecoration: 'none', color: '#555' }} to={`${page.link}`}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
