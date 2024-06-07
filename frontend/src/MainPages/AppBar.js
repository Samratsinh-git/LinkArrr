import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { HomeContext } from '../Context/context';
// import { Container, backdropClasses } from '@mui/material';

function Appbar({ page }) {
    const history = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const {user} = useContext(HomeContext);
    // const location = useLocation();
    // const {id} = location.state;
    // const context = useContext(HomeContext);
    const user = useContext(HomeContext);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const logout = () => {
        localStorage.clear();
        history('/')
    }
    const handleClose = () => {
        setAnchorEl(null);
        if (page === 'home') {
            history('/socials/add', {state: {user: user.link}});
        } else {
            history('/home')
        }
    };
    const handleProfile = ()=>{
        setAnchorEl(null);
        history('/users/profile', {state:{ user: user.link}})
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        onClick={logout}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <LogoutIcon sx={{ mr: 2 }} />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        Welcome {user.link && user.link.name} to LinkArray
                        {/*   */}
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="account of current user"//aria : used as speed dial any menu bar.
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorEl)}

                    >
                        {page === 'home' && (
                            <>
                                <MenuItem onClick={handleClose}>Add Socials</MenuItem>
                                <MenuItem onClick={handleProfile}>My Profile</MenuItem>
                            </>
                        )}
                        {page === 'addSocials' && (
                            <MenuItem onClick={handleClose}>Home</MenuItem>
                        )}
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Appbar;