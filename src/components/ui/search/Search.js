import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled( 'div' )( ( { theme } ) => ( {
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha( theme.palette.common.white, 1 ),
  '&:hover': {
    backgroundColor: alpha( theme.palette.common.white, 0.70 ),
  },
  marginLeft: 0,
  width: '100%',
  [ theme.breakpoints.up( 'sm' ) ]: {
    marginLeft: theme.spacing( 1 ),
    width: 'auto',
  },
} ) );

const SearchIconWrapper = styled( 'div' )( ( { theme } ) => ( {
  padding: theme.spacing( 0, 2 ),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} ) );

const StyledInputBase = styled( InputBase )( ( { theme } ) => ( {
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing( 1, 1, 1, 0 ),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${ theme.spacing( 4 ) })`,
    transition: theme.transitions.create( 'width' ),
    width: '100%',
    [ theme.breakpoints.up( 'sm' ) ]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
} ) );

export default function SearchAppBar ( { onSearch } )
{
  const handleSearch = ( event ) =>
  {
    onSearch( event.target.value );
  };

  return (
    <Box sx={ { flexGrow: 1 } }>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={ { flexGrow: 1, display: { xs: 'none', sm: 'block' } } }
        ></Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Cari..."
            inputProps={ { 'aria-label': 'search' } }
            onChange={ handleSearch }
          />
        </Search>
      </Toolbar>
    </Box>
  );
}
