import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    "auth/login",
    async ( userCredentials, { dispatch } ) =>
    {
        try
        {
            const response = await axios.post(
                `https://protracker.azurewebsites.net/api/auth/login`,
                userCredentials
            );
            const { jwtToken, ...userData } = response.data;

            // Dispatch the setUser action to set the user and isAuthenticated
            dispatch( setUser( userData ) );

            // Dispatch an action to set the token in the state and localStorage
            dispatch( setAuthToken( jwtToken ) ); // Menggunakan setAuthToken dengan benar

            return response.data;
        } catch ( error )
        {
            throw error;
        }
    }
);

export const logoutUser = createAsyncThunk( "auth/logout", async ( _, { dispatch } ) =>
{
    try
    {
        // Clear the token from localStorage
        localStorage.clear( 'authToken' );
        // Dispatch the setUser action with null to reset the user and isAuthenticated
        dispatch( setUser( null ) );

        return {}; // You might return an empty object or any other data you find necessary
    } catch ( error )
    {
        throw error;
    }
} );

export const setAuthToken = ( token ) => ( dispatch ) =>
{
    dispatch( userSlice.actions.setAuthToken( token ) );
    if ( token )
    {
        localStorage.setItem( "token", token );
    } else
    {
        localStorage.removeItem( "token" );
    }
};

export const setUser = ( user ) => ( dispatch ) =>
{
    dispatch( userSlice.actions.setUser( user ) );
};

const userSlice = createSlice( {
    name: "user",
    initialState: {
        loading: false,
        user: null,
        error: null,
        isAuthenticated: false,
        authToken: localStorage.getItem( "token" ) || null,
    },
    reducers: {
        setUser: ( state, action ) =>
        {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        setAuthToken: ( state, action ) =>
        {
            state.authToken = action.payload;
            if ( action.payload )
            {
                localStorage.setItem( "token", action.payload );
            } else
            {
                localStorage.removeItem( "token" );
            }
        },
    },
    extraReducers: ( builder ) =>
    {
        builder
            .addCase( loginUser.pending, ( state ) =>
            {
                state.loading = true;
                state.user = null;
                state.error = null;
                state.isAuthenticated = false; // Set isAuthenticated ke false saat login pending
            } )
            .addCase( loginUser.fulfilled, ( state, action ) =>
            {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
                state.isAuthenticated = true; // Set isAuthenticated ke true saat login berhasil
            } )
            .addCase( loginUser.rejected, ( state, action ) =>
            {
                state.loading = false;
                state.user = null;
                console.error( "Error during login:", action.error.message );

                if ( action.error.message === 'Request failed with status code 401' )
                {
                    state.error = 'Access Denied! Invalid Credentials';
                } else
                {
                    state.error = 'An error occurred. Please try again later.';
                }

                state.isAuthenticated = false; // Set isAuthenticated ke false saat login gagal
            } )
            .addCase( logoutUser.pending, ( state ) =>
            {
                state.loading = true;
                state.user = null;
                state.error = null;
                state.isAuthenticated = false; // Set isAuthenticated ke false saat logout pending
            } )
            .addCase( logoutUser.fulfilled, ( state ) =>
            {
                state.loading = false;
                state.user = null;
                state.error = null;
                state.isAuthenticated = false; // Set isAuthenticated ke false saat logout berhasil
            } )
            .addCase( logoutUser.rejected, ( state ) =>
            {
                state.loading = false;
                state.user = null;
                state.error = 'An error occurred during logout. Please try again later.';
                state.isAuthenticated = false; // Set isAuthenticated ke false saat logout gagal
            } );
    },
} );

export const { reducer: userReducer } = userSlice;

export default userSlice;