import * as React from 'react';
import "./Navbar.scss";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../../../auth/Store/UserSlice";

export default function AppBar ()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ anchorEl, setAnchorEl ] = React.useState( null );

    const isMenuOpen = Boolean( anchorEl );

    const handleMenuOpen = ( event ) =>
    {
        setAnchorEl( event.currentTarget );
    };


    const handleMenuClose = () =>
    {
        setAnchorEl( null );
    };


    const handleMenuProfile = () =>
    {
        setAnchorEl( null );
        navigate( "/profile" );
    };

    const handleLogout = async () =>
    {
        try
        {
            await dispatch( logoutUser() );

            localStorage.clear();

            navigate( "/login" );
        } catch ( error )
        {
            console.error( "Error selama logout:", error );
        }
    };

    const menuId = 'menu';
    const renderMenu = (
        <Menu
            anchorEl={ anchorEl }
            anchorOrigin={ {
                vertical: 'top',
                horizontal: 'right',
            } }
            id={ menuId }
            keepMounted
            transformOrigin={ {
                vertical: 'top',
                horizontal: 'right',
            } }
            open={ isMenuOpen }
            onClose={ handleMenuClose }
        >
            <MenuItem onClick={ handleMenuProfile }>Profile</MenuItem>
            <MenuItem onClick={ handleLogout }>Logout</MenuItem>
        </Menu>
    );


    return (
        <Box sx={ { flexGrow: 1 } }>
            <Toolbar className='navbar'>
                <Box sx={ { flexGrow: 1 } } />
                <Box sx={ { display: { xs: 'none', md: 'flex' } } }>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <Badge badgeContent={ 17 } color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={ menuId }
                        aria-haspopup="true"
                        onClick={ handleMenuOpen }
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Box>
                <Box sx={ { display: { xs: 'flex', md: 'none' } } }>
                    <IconButton
                        size="large"
                        aria-label="show more"
                        aria-controls={ menuId }
                        aria-haspopup="true"
                        onClick={ handleMenuClose }
                        color="inherit"
                    >
                        <MoreIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            { renderMenu }
        </Box>
    );
}
