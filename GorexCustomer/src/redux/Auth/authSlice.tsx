import {createSlice} from '@reduxjs/toolkit';
import {
  ChangePasswordApi,
  ForgotPasswordApi,
  SignUpApi,
  UpdatePasswordApi,
  VerifyOtpApi,
  continueAsGuestApi,
  loginApi,
} from './authAction';

const initialState = {
  user: null,
  token: null,
  loginError: null,
  isLoginIn: false,
  signUpError: null,
  verifyOtpError: null,
  SignUpLoading: false,
  loginInProgress: false,
  verifyOtpLoading: false,
  changePasswordError: null,
  forgotPasswordError: null,
  updatePasswordError: null,
  forgotPasswordLoading: false,
  changePasswordLoading: false,
  updatePasswordLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state: any, action: any) => {
      state.user = action.payload;
    },
    setToken: (state: any, action: any) => {
      state.token = action.payload;
    },
    logout: () => initialState,
  },
  extraReducers: builder => {
    builder
      //** Pending Status of Login *//
      .addCase(loginApi.pending, state => {
        state.loginInProgress = true;
        state.loginError = null;
        state.isLoginIn = false;
      })
      //** FulFilled Status of Login *//
      .addCase(loginApi.fulfilled, (state: any, action: any) => {
        state.loginInProgress = false;
        state.user = action.payload;
        state.isLoginIn = true;
      })
      //** Rejected Status of Login *//
      .addCase(loginApi.rejected, (state: any, action: any) => {
        state.loginInProgress = false;
        state.loginError = action.payload;
        state.isLoginIn = false;
      })

      //** Pending Status of continue as guest *//
      .addCase(continueAsGuestApi.pending, state => {
        state.loginInProgress = false;
        state.loginError = null;
        state.isLoginIn = false;
      })
      //** FulFilled Status of continue as guest *//
      .addCase(continueAsGuestApi.fulfilled, (state: any, action: any) => {
        state.loginInProgress = false;
        state.user = action.payload;
        state.isLoginIn = false;
      })
      //** Rejected Status of continue as guest *//
      .addCase(continueAsGuestApi.rejected, (state: any, action: any) => {
        state.loginInProgress = false;
        state.loginError = action.payload;
        state.isLoginIn = false;
      })

      //** Pending  Status of SignUp *//
      .addCase(SignUpApi.pending, state => {
        state.SignUpLoading = true;
        state.signUpError = null;
      })
      //** FulFilled Status of SignUp *//
      .addCase(SignUpApi.fulfilled, (state: any, action: any) => {
        state.SignUpLoading = false;
        state.user = action.payload;
      })
      //** Rejected Status of SignUp *//
      .addCase(SignUpApi.rejected, (state: any, action: any) => {
        state.SignUpLoading = false;
        state.signUpError = action.payload;
      })

      //** Pending  Status of Forgot Password *//
      .addCase(ForgotPasswordApi.pending, state => {
        state.forgotPasswordLoading = true;
        state.forgotPasswordError = null;
      })
      //** FulFilled Status of Forgot Password *//
      .addCase(ForgotPasswordApi.fulfilled, (state: any, action: any) => {
        state.forgotPasswordLoading = false;
        state.user = action.payload;
      })
      //** Rejected Status of Forgot Password *//
      .addCase(ForgotPasswordApi.rejected, (state: any, action: any) => {
        state.ForgotPasswordLoading = false;
        state.forgotPasswordError = action.payload;
      })

      //** Pending  Status of Verify Otp *//
      .addCase(VerifyOtpApi.pending, state => {
        state.verifyOtpLoading = true;
        state.verifyOtpError = null;
      })
      //** FulFilled Status of Verify Otp *//
      .addCase(VerifyOtpApi.fulfilled, (state: any, action: any) => {
        state.verifyOtpLoading = false;
        state.user = action.payload;
      })
      //** Rejected Status of Verify Otp *//
      .addCase(VerifyOtpApi.rejected, (state: any, action: any) => {
        state.verifyOtpLoading = false;
        state.verifyOtpError = action.payload;
      })

      //** Pending  Status of Change Password *//
      .addCase(ChangePasswordApi.pending, state => {
        state.changePasswordLoading = true;
        state.changePasswordError = null;
      })
      //** FulFilled Status of Change Password *//
      .addCase(ChangePasswordApi.fulfilled, (state: any, action: any) => {
        state.changePasswordLoading = false;
        state.user = action.payload;
      })
      //** Rejected Status of Change Password *//
      .addCase(ChangePasswordApi.rejected, (state: any, action: any) => {
        state.changePasswordLoading = false;
        state.changePasswordError = action.payload;
      })
      //** Pending  Status of Update Password *//
      .addCase(UpdatePasswordApi.pending, state => {
        state.updatePasswordLoading = true;
        state.updatePasswordError = null;
      })
      //** FulFilled Status of Update Password *//
      .addCase(UpdatePasswordApi.fulfilled, (state: any, action: any) => {
        state.updatePasswordLoading = false;
      })
      //** Rejected Status of Update Password *//
      .addCase(UpdatePasswordApi.rejected, (state: any, action: any) => {
        state.updatePasswordLoading = false;
        state.updatePasswordError = action.payload;
      });
  },
});

export const {logout, login, setToken} = authSlice.actions;

export default authSlice.reducer;
