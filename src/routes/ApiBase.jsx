import axios from "axios";
export const BASE_API_URL = process.env.REACT_APP_API_URL;

export const LOGIN_URL = `${BASE_API_URL}/auth/web/login`;
export const ADDUSER_URL = `${BASE_API_URL}/auth/register`;
export const LOGOUT_URL = `${BASE_API_URL}/auth/logout`;
export const FORGOT_URL = `${BASE_API_URL}/auth/forgot-password`;
export const RESETPASS_URL = `${BASE_API_URL}/auth/reset-password`;

// Dashboard
export const DASHBOARD_URL = `${BASE_API_URL}/dashboard`;
export const DASHBOARD_USER_URL = `${BASE_API_URL}/dashboard/get-users`;
export const DELETE_USER_URL = `${BASE_API_URL}/dashboard/delete-user`;

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function logout() {
  return axios.post(LOGOUT_URL);
}
