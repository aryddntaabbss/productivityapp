import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom'; // Tambahkan ini untuk menggunakan useNavigate

export default function PrimarySearchAppBar ()
{
    const navigate = useNavigate(); // Tambahkan ini untuk mendapatkan fungsi navigate dari react-router-dom
    const [ anchorEl, setAnchorEl ] = React.useState( null );
    const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = React.useState( null );

    const isMenuOpen = Boolean( anchorEl );
    const isMobileMenuOpen = Boolean( mobileMoreAnchorEl );

    const handleProfileMenuOpen = ( event ) =>
    {
        setAnchorEl( event.currentTarget );
    };

    const handleMobileMenuClose = () =>
    {
        setMobileMoreAnchorEl( null );
    };

    const handleMenuClose = () =>
    {
        setAnchorEl( null );
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = ( event ) =>
    {
        setMobileMoreAnchorEl( event.currentTarget );
    };

    const handleMenuProfile = () =>
    {
        handleMenuClose();
        navigate( "/profile" );
    };

    const handleLogout = async () =>
    {
        try
        {
            // Dispatch aksi logout
            // (Disesuaikan dengan implementasi Redux Anda)
            // await dispatch(logoutUser());

            // Hapus item yang benar dari local storage
            localStorage.removeItem( "authToken" );
            localStorage.removeItem( "user" );

            // Navigasi setelah logout selesai
            navigate( "/login" );
        } catch ( error )
        {
            console.error( "Error selama logout:", error );
            // Tangani error jika diperlukan
        }
    };

    const menuId = 'primary-search-account-menu';
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

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={ mobileMoreAnchorEl }
            anchorOrigin={ {
                vertical: 'top',
                horizontal: 'right',
            } }
            id={ mobileMenuId }
            keepMounted
            transformOrigin={ {
                vertical: 'top',
                horizontal: 'right',
            } }
            open={ isMobileMenuOpen }
            onClose={ handleMobileMenuClose }
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={ 4 } color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={ 17 } color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={ handleProfileMenuOpen }>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={ { flexGrow: 1 } }>
            <Toolbar>
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
                        onClick={ handleProfileMenuOpen }
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Box>
                <Box sx={ { display: { xs: 'flex', md: 'none' } } }>
                    <IconButton
                        size="large"
                        aria-label="show more"
                        aria-controls={ mobileMenuId }
                        aria-haspopup="true"
                        onClick={ handleMobileMenuOpen }
                        color="inherit"
                    >
                        <MoreIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            { renderMobileMenu }
            { renderMenu }
        </Box>
    );
}
