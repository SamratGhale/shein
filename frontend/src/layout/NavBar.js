import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import queryString from 'query-string';
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@mui/material';
import { getUser, logoutUser } from '../utils/sessionManager'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import Grid from "@mui/material/Grid"
import { styled, alpha } from '@mui/material/styles';
import { PATH_APP, PATH_PAGE, ROOTS } from '../routes/paths';
import { ItemsContext } from '../modules/home/context';
import Logo from "../logo.png";
import MediaQuery from 'react-responsive';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { cartCount } = React.useContext(ItemsContext);

  const handleOpenNavMenu = (event) => {
    console.log(event);
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <>
      <MediaQuery minWidth={450}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <img alt='logo' style={{ display: { xs: 'none', md: 'flex' }, mr: 1, maxWidth: 120 }} src={Logo} />

              {/* //Search field */}
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder=" Search…"
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      window.location = `/?${queryString.stringify({ search: e.target.value })}`;
                    }
                  }}
                />
              </Search>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link
                    to={ROOTS.app} component={RouterLink} onClick={handleCloseNavMenu}
                    sx={{ fontSize: 13, color: 'white', textDecoration: "none" }}
                  >
                    Products
                  </Link>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link
                    to={PATH_APP.app.contactus} component={RouterLink} onClick={handleCloseNavMenu}
                    sx={{ fontSize: 13, color: 'white', textDecoration: "none" }}
                  >
                    ContactUs
                  </Link>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link
                    to={PATH_APP.app.orders} component={RouterLink} onClick={handleCloseNavMenu}
                    sx={{ fontSize: 13, color: 'white', textDecoration: "none" }}

                  >
                    My Orders
                  </Link>
                </Button>
              </Box>

              {/* For Cart icon button */}
              <IconButton
                size="small"
                aria-label="cart"
                sx={{ width: 100 }}
              >
                <Link to={PATH_APP.app.cart} component={RouterLink}>
                  <StyledBadge badgeContent={cartCount} color="success">
                    <ShoppingCartIcon sx={{ color: "white" }} />
                  </StyledBadge>
                </Link>
              </IconButton>

              <Box sx={{ flexGrow: 0 }}>
                {getUser() == null ? (
                  <MenuItem>
                    <Link sx={{ textDecoration: "none" }} to={PATH_PAGE.auth.login} component={RouterLink}>
                      <Typography sx={{ color: "white" }}>Login</Typography>
                    </Link>
                  </MenuItem>
                ) : (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                )}
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
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={logoutUser}>Log Out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container >
        </AppBar >
      </MediaQuery>




      {/* For smaller screens */}
      <MediaQuery maxWidth={400}>
        <AppBar position="static">
          <Grid container sx={{ alignItems: "center", justifyContent: "center" }}>
            <Grid item xs={4}>
              <Box>
                <IconButton
                  size="large"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link sx={{ textDecoration: "none" }} to={ROOTS.app} component={RouterLink}>
                      <Typography textAlign="center" sx={{ color: "black" }}>Products</Typography></Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link sx={{ textDecoration: "none" }} to={PATH_APP.app.contactus} component={RouterLink}>
                      <Typography textAlign="center" sx={{ color: "black" }}>Contact Us</Typography></Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link sx={{ textDecoration: "none" }} to={PATH_APP.app.cart} component={RouterLink}>
                      <Typography textAlign="center" sx={{ color: "black" }}>My Orders</Typography></Link>
                  </MenuItem>
                </Menu>
              </Box>
            </Grid>
            <Grid item xs={8} sx={{ p: 1 }}>
              <img alt='logo' style={{ maxWidth: 120 }} src={Logo} />
            </Grid>
          </Grid>
        </AppBar>
      </MediaQuery>
    </>
  );
};
export default ResponsiveAppBar;
