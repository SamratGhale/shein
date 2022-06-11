import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { useAutocomplete } from '@mui/material';
import { Autocomplete } from '@mui/material';
import queryString from 'query-string';
import { TextField } from '@mui/material';
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
import AdbIcon from '@mui/icons-material/Adb';
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import { styled, alpha } from '@mui/material/styles';
import { PATH_APP, PATH_PAGE, ROOTS } from '../routes/paths';
import { ItemsContext } from '../modules/home/context';
import { getAllTags } from '../modules/home/services';
import Logo from "../logo.png";



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

const Label = styled('label')({
  display: 'block',
});

const Input = styled('input')(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
}));

const Listbox = styled('ul')(({ theme }) => ({
  width: 200,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  color: 'black',
  backgroundColor: theme.palette.background.paper,
  overflow: 'auto',
  maxHeight: 200,
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
    [theme.breakpoints.up('sm')]: {
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




const pages = ['Products', 'Contact Us', 'My Orders'];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [tags, setTags] = React.useState([]);
  const { cartCount } = React.useContext(ItemsContext);

  React.useEffect(() => {
    getAllTags().then(res => {
      setTags(res);
    })
  }, [])

  const handleOpenNavMenu = (event) => {
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

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    options: tags,
  });

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', color: "black", maxHeight: 75 }} >
      <Grid container sx={{ maxWidth: "4000", width: "4000", alignItems: "center" }} gap={3}>
        <Grid item xs={4}>
          <Link variant='secondary' to={ROOTS.app} component={RouterLink} style={{ textDecoration: 'none' }} >
            <img alt="Shopaholic Logo" src={Logo} style={{ maxWidth: 120 }} />
          </Link>
        </Grid>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center" color="black">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        {/* 
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          LOGO
        </Typography>
        */}

        <Grid item xs={3}>
          <Stack
            direction="row"
            gap={3} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Link
              to={ROOTS.app} component={RouterLink} onClick={handleCloseNavMenu}
              sx={{ fontSize: 15, fontWeight: "bold", color: 'black', display: 'block', textDecoration: "none" }}
            >
              Products
            </Link>
            <Link
              to={PATH_APP.app.contactus} component={RouterLink} onClick={handleCloseNavMenu}
              sx={{ fontSize: 15, fontWeight: "bold", color: 'black', display: 'block', textDecoration: "none" }}
            >
              ContactUs
            </Link>
            <Link
              to={PATH_APP.app.orders} component={RouterLink} onClick={handleCloseNavMenu}
              sx={{ fontSize: 15, fontWeight: "bold", color: 'black', display: 'block', textDecoration: "none" }}

            >
              My Orders
            </Link>
          </Stack>
        </Grid>


        <Grid item sx={{ backgroundColor: "#f1f1f1" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ maxWidth: 20 }} />
            </SearchIconWrapper>
            <StyledInputBase
              {...getInputProps()}
              placeholder=" Search…"
              style={{ fontSize: 14 }}
              onKeyDown={(e) => {
                if (e.keyCode == 13) {
                  window.location = `/?${queryString.stringify({ search: e.target.value })}`;
                }
              }}
            />
            {groupedOptions.length > 0 ? (
              <Listbox {...getListboxProps()}>
                {groupedOptions.map((option, index) => {
                  return <MenuItem {...getOptionProps({ option, index })}>{option}</MenuItem>
                })}
              </Listbox>
            ) : null}
          </Search>
        </Grid>

        <Grid item>
          <IconButton
            size="large"
            aria-label="cart"
            color="inherit"
            sx={{ width: 100 }}
          >
            <Link to={PATH_APP.app.cart} component={RouterLink}>
              <StyledBadge badgeContent={cartCount} color="success">
                <ShoppingCartIcon sx={{ maxWidth: 25 }} />
              </StyledBadge>
            </Link>
          </IconButton>

        </Grid>


        <Grid item>
          {getUser() == null ? (
            <MenuItem>
              <Link sx={{ textDecoration: "none" }} to={PATH_PAGE.auth.login} component={RouterLink}>
                <Typography sx={{ color: "black" }}>Login</Typography>
              </Link>
            </MenuItem>
          ) : (
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Samrat" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          )}

          <Menu
            sx={{ mt: '45px', color: "black" }}
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
              <Typography textAlign="center">My Orders</Typography>
            </MenuItem>
            <MenuItem onClick={logoutUser}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>

        </Grid>
      </Grid>
    </AppBar >
  );
};
export default NavBar;
