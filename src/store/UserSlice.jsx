import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  LOGIN_URL,
  ADDUSER_URL,
  LOGOUT_URL,
  RESETPASS_URL,
} from "../routes/ApiBase";
import swal from "sweetalert";
import axios from "axios";

// Fungsi untuk mendapatkan token JWT dari state
export const getJwtToken = (state) => state.user.user.data.jwtToken;

// Selektor untuk mendapatkan token dari state
export const selectToken = (state) => state.user.user.data.token;

// Fungsi untuk mendapatkan jenis pengguna dari localStorage
const getUserType = () => {
  const storedUserData = localStorage.getItem("userData");

  return storedUserData ? JSON.parse(storedUserData).userType : null;
};

// Async thunk untuk mendapatkan jenis pengguna
export const fetchUserType = createAsyncThunk(
  "user/fetchUserType",
  async (_, { rejectWithValue }) => {
    try {
      const userType = getUserType();

      if (userType) {
        return userType;
      }

      throw new Error("Jenis pengguna tidak ditemukan di penyimpanan lokal");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk untuk login pengguna
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userCredentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(LOGIN_URL, userCredentials);
      const { jwtToken, ...userData } = response.data;

      localStorage.setItem("jwtToken", jwtToken);
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...userData, jwtToken: "" })
      );

      dispatch(setUser(userData));
      dispatch(setAuthToken(jwtToken));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk untuk Add User
export const addUser = createAsyncThunk(
  "user/addUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(ADDUSER_URL, credentials);

      if (response.data.code === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || "Registrasi gagal");
      }
    } catch (error) {
      console.error("Error saat menambahkan pengguna:", error.message);
      throw rejectWithValue(error.message);
    }
  }
);

// Async thunk untuk logout pengguna
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, getState }) => {
    try {
      const authToken = getState().user.authToken;
      await axios.post(LOGOUT_URL, null, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      localStorage.clear("token");
      dispatch(setUser(null));

      return {};
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk untuk mereset password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    { email, token, newPassword, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(RESETPASS_URL, {
        email,
        token,
        newPassword,
        confirmPassword,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice untuk mengelola state pengguna
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
    isAuthenticated: false,
    authToken: localStorage.getItem("token") || null,
    userType: null,
    resetPasswordStatus: "idle",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.userType = action.payload?.data?.userType;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserType.fulfilled, (state, action) => {
        state.userType = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Akses Ditolak! Kredensial Tidak Valid";
        } else {
          state.error = "Terjadi kesalahan. Harap coba lagi nanti.";
        }
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.error = "Terjadi kesalahan saat logout. Harap coba lagi nanti.";
        state.isAuthenticated = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordStatus = "pending";
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordStatus = "fulfilled";
      })
      .addCase(resetPassword.rejected, (state) => {
        state.resetPasswordStatus = "rejected";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const response = action.payload;
        if ("accessToken" in response) {
          swal("Success", response.data, "success", {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("user", JSON.stringify(response.user));
            window.location.href = "/manajemen-user";
          });
        } else {
          swal("Success", response.data || "Tambah User gagal.", "success");
        }
      })
      .addCase(addUser.rejected, (state, action) => {
        console.error("Error saat menambahkan pengguna:", action.error);
        swal(
          "Error",
          action.payload || "Tambah User gagal. Silakan coba lagi nanti.",
          "error"
        );
      });
  },
});

// Export actions dan reducer dari slice
export const { setUser, setAuthToken } = userSlice.actions;
export const { reducer: userReducer } = userSlice;

export default userSlice;
