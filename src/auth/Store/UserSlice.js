import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN_URL, LOGOUT_URL, RESETPASS_URL } from "../../app/authCrud";
import axios from "axios";

const getUserTypeFromLocalStorage = () =>
{
    const storedUserData = localStorage.getItem( "userData" );

    if ( storedUserData )
    {
        const parsedUserData = JSON.parse( storedUserData );
        return parsedUserData.userType;
    }

    return null;
};

export const fetchUserType = createAsyncThunk(
    "user/fetchUserType",
    async ( _, { getState, rejectWithValue } ) =>
    {
        try
        {
            const userTypeFromLocalStorage = getUserTypeFromLocalStorage();

            if ( userTypeFromLocalStorage )
            {
                return userTypeFromLocalStorage;
            }

            throw new Error( "User type not found in local storage" );
        } catch ( error )
        {
            return rejectWithValue( error.message );
        }
    }
);


export const loginUser = createAsyncThunk(
    "auth/login",
    async ( userCredentials, { dispatch, rejectWithValue } ) =>
    {
        try
        {
            const response = await axios.post( LOGIN_URL, userCredentials );
            const { jwtToken, ...userData } = response.data;

            dispatch( setUser( userData ) );
            dispatch( setAuthToken( jwtToken ) );

            return response.data;
        } catch ( error )
        {
            return rejectWithValue( error.message );
        }
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ( { email, token, newPassword, confirmPassword }, { rejectWithValue } ) =>
    {
        try
        {
            const response = await axios.post( RESETPASS_URL, {
                email: email,
                token: token,
                newPassword: newPassword,
                confirmPassword: confirmPassword,
            } );

            return response.data;
        } catch ( error )
        {
            return rejectWithValue( error.message );
        }
    }
);



export const selectToken = ( state ) => state.user.user.data.token;

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async ( _, { dispatch, getState } ) =>
    {
        try
        {
            const authToken = getState().user.authToken;
            await axios.post( LOGOUT_URL, null, {
                headers: { Authorization: `Bearer ${ authToken }` },
            } );

            localStorage.clear( "token" );
            dispatch( setUser( null ) );

            return {};
        } catch ( error )
        {
            throw error;
        }
    }
);

// Create userSlice
const userSlice = createSlice( {
    name: "user",
    initialState: {
        loading: false,
        user: null,
        error: null,
        isAuthenticated: false,
        authToken: localStorage.getItem( "token" ) || null,
        userType: null,
        resetPasswordStatus: "idle", // idle | pending | fulfilled | rejected
    },

    reducers: {
        setUser: ( state, action ) =>
        {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.userType = action.payload?.data?.userType;
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
            .addCase( fetchUserType.fulfilled, ( state, action ) =>
            {
                state.userType = action.payload;
            } )
            .addCase( loginUser.fulfilled, ( state, action ) =>
            {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
                state.isAuthenticated = true;
            } )
            .addCase( loginUser.rejected, ( state, action ) =>
            {
                state.loading = false;
                state.user = null;

                if ( action.error.message === "Request failed with status code 401" )
                {
                    state.error = "Access Denied! Invalid Credentials";
                } else
                {
                    state.error = "An error occurred. Please try again later.";
                }

                state.isAuthenticated = false;
            } )
            .addCase( logoutUser.pending, ( state ) =>
            {
                state.loading = true;
                state.user = null;
                state.error = null;
                state.isAuthenticated = false;
            } )
            .addCase( logoutUser.fulfilled, ( state ) =>
            {
                state.loading = false;
                state.user = null;
                state.error = null;
                state.isAuthenticated = false;
            } )
            .addCase( logoutUser.rejected, ( state ) =>
            {
                state.loading = false;
                state.user = null;
                state.error =
                    "An error occurred during logout. Please try again later.";
                state.isAuthenticated = false;
            } )
            .addCase( resetPassword.pending, ( state ) =>
            {
                state.resetPasswordStatus = "pending";
            } )
            .addCase( resetPassword.fulfilled, ( state, action ) =>
            {
                state.resetPasswordStatus = "fulfilled";

            } )
            .addCase( resetPassword.rejected, ( state, action ) =>
            {
                state.resetPasswordStatus = "rejected";
            } );
    },
} );

export const { setUser, setAuthToken } = userSlice.actions;
export const { reducer: userReducer } = userSlice;

export default userSlice;
