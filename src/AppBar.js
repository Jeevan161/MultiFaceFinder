import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Add Face', path: '/add-new-face' },
  { name: 'Authenticate face', path: '/authenticate-face' }
];

const theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      darker: blue[900],
    },
  },
});


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

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

  // Function to handle navigation to different routes
  const handleMenuClick = (path) => {
    navigate(path); // Navigate to the specified path
    handleCloseNavMenu(); // Close the menu
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#c4cadf' ,color:'black'}}>
      <style>{`
      .MuiButtonBase-root  {
        color: black;
        
      }
        .btnbj
        {
          font-weight:700;
          font-family: inherit;
        }
        .btnbj:hover
        {
          background:white;
        }
      .MuiButtonBase-root:hover
      {
        background:'green';
        color:#08817c;
      }
    `}</style>
      <Container maxWidth="xl" style={{ height: '65px'}}>
        <Toolbar disableGutters>
         
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 600,
              color: '#08817c',
              textDecoration: 'none',
            }}
          >
            MultiFaceFinder
          </Typography>

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
                <MenuItem key={page.name} onClick={() => handleMenuClick(page.path)}>
                  <Typography  textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
       
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              
              color: '#08817c',
              textDecoration: 'none',
            }}
          >
            MultiFaceFinder
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button className='btnbj' variant="" 
                key={page.name}
                onClick={() => handleMenuClick(page.path)}
                sx={{ my: 2, color: 'white',fontWeight:600, display: 'block',margin: '0 10px ',borderRadius:'15px;'}}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
