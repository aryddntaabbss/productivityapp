import axios from "axios";
export const BASE_API_URL = process.env.REACT_APP_API_URL;

export const LOGIN_URL = `${ BASE_API_URL }/auth/web/login`;
export const LOGOUT_URL = `${ BASE_API_URL }/auth/logout`;
export const FORGOT_URL = `${ BASE_API_URL }/auth/forgot-password`;
export const RESETPASS_URL = `${ BASE_API_URL }/auth/reset-password`;
export const USERTYPE_URL = `${ BASE_API_URL }/role/get-roles`;
// export const PROFILE_URL = `${ BASE_API_URL }/home/:name/profile`;

// Dashboard
export const DASHBOARD_URL = `${ BASE_API_URL }/dashboard`;
export const DASHBOARD_USER_URL = `${ BASE_API_URL }/dashboard/get-users`;


export function login ( email, password )
{
    return axios.post( LOGIN_URL, { email, password } );
}

export function logout ()
{
    return axios.post( LOGOUT_URL );
}