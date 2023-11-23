// Tipe-tipe pengguna
export const USER_TYPES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  STAFF: "Staff",
};

// Fungsi untuk mendapatkan tipe akun pengguna dari penyimpanan lokal (localStorage)
export const getUserType = () =>
{
  return localStorage.getItem( "userType" );
};

// Fungsi untuk mengecek apakah pengguna sudah login
export const isUserLoggedIn = () =>
{
  return !!localStorage.getItem( "accessToken" );
};

// Fungsi untuk melakukan login
export const loginUser = ( userType ) =>
{
  localStorage.setItem( "accessToken", "exampleAccessToken" );
  localStorage.setItem( "userType", userType );
};

// Fungsi untuk melakukan logout
export const logoutUser = () =>
{
  localStorage.removeItem( "accessToken" );
  localStorage.removeItem( "userType" );
};
