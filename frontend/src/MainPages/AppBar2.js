import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, useScrollTrigger, Slide, Box, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "../Context/context";


function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}


export default function HideAppBar(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    // const context = useContext(HomeContext);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const navigate = useNavigate();

    const handleClose = () => {
        setAnchorEl(null);
        navigate('/home');
    };
    return (
        <HideOnScroll {...props}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div">
                        LinkArray
                    </Typography>
                    <Box sx={{ml:169}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{vertical: 'top',horizontal: 'right'}}
                            keepMounted
                            transformOrigin={{vertical: 'top',horizontal: 'right'}}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Home</MenuItem>
                            {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    )
}

