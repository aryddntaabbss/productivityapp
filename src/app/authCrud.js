import axios from "axios";

export const LOGIN_URL = `${ process.env.REACT_APP_API_URL }/auth/web/login `;
export const LOGOUT_URL = `${ process.env.REACT_APP_API_URL }/auth/logout`;
export const FORGOT_URL = `${ process.env.REACT_APP_API_URL }/auth/forgot-password`;
export const RESETPASS_URL = `${ process.env.REACT_APP_API_URL }/auth/reset-password`;
export const USERTYPE_URL = `${ process.env.REACT_APP_API_URL }/role/get-roles`;

export function login ( email, password )
{
    return axios.post( LOGIN_URL, { email, password } );
}

export function logout ()
{
    return axios.post( LOGOUT_URL );
}