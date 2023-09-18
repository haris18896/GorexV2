/* eslint-disable quotes */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Post} from '../../utils/Services/service';

//** Login Async Thunk Function */
const loginApi = createAsyncThunk(
  'auth/login',
  async (
    {
      data,
      callback,
      errorCallback,
    }: {
      data: any;
      callback: (response: any) => void;
      errorCallback: (error: any) => void;
    },
    {fulfillWithValue, rejectWithValue},
  ) => {
    try {
      const response = await Post({
        endpoint: 'login/api/action',
        body: data,
      });

      const JsonResponse = response.data?.result;

      if (JsonResponse?.status === '200') {
        callback(JsonResponse);
      } else {
        errorCallback(JsonResponse);
      }

      return fulfillWithValue(JsonResponse);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** Login Async Thunk Function */
const continueAsGuestApi = createAsyncThunk(
  'auth/continueAsGuest',
  async (
    {
      data,
      callback,
      errorCallback,
    }: {
      data: any;
      callback: (response: any) => void;
      errorCallback: (error: any) => void;
    },
    {fulfillWithValue, rejectWithValue},
  ) => {
    try {
      const response = await Post({
        endpoint: 'login/api/action',
        body: data,
      });

      const JsonResponse = response.data?.result;

      if (JsonResponse?.status === '200') {
        callback(JsonResponse);
      } else {
        errorCallback(JsonResponse);
      }

      return fulfillWithValue(JsonResponse);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** SignUp Async Thunk Function */

const SignUpApi = createAsyncThunk(
  'auth/SignUp',
  async (
    {
      data,
      callback,
      errorCallback,
    }: {
      data: any;
      callback: (response: any) => void;
      errorCallback: (error: any) => void;
    },
    {fulfillWithValue, rejectWithValue},
  ) => {
    try {
      const response = await Post({
        endpoint: 'register/api/action',
        body: data,
      });

      const JsonResponse = response?.data;

      if (JsonResponse?.result?.status === '200') {
        callback(JsonResponse);
      } else {
        errorCallback(JsonResponse);
      }

      return fulfillWithValue(response?.data?.result);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** ForgotPassword Async Thunk Function */

const ForgotPasswordApi = createAsyncThunk(
  'auth/ForgotPassword',
  async (
    {
      data,
      callback,
      errorCallback,
    }: {
      data: any;
      callback: (response: any) => void;
      errorCallback: (error: any) => void;
    },
    {fulfillWithValue, rejectWithValue},
  ) => {
    try {
      const response = await Post({
        endpoint: `generate/api/otp`,
        body: data,
      });
      const JsonResponse = response?.data;

      if (JsonResponse?.result?.status === '200') {
        callback(JsonResponse);
      } else {
        errorCallback(JsonResponse);
      }
      return fulfillWithValue(response?.data?.result);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** Verify Otp Async Thunk Function */

const VerifyOtpApi = createAsyncThunk(
  'auth/VerifyOtp',
  async (
    {
      data,
      callback,
      errorCallback,
    }: {
      data: any;
      callback: (response: any) => void;
      errorCallback: (error: any) => void;
    },
    {fulfillWithValue, rejectWithValue},
  ) => {
    try {
      const response = await Post({
        endpoint: `verify/otp`,
        body: data,
      });
      const JsonResponse = response?.data;

      if (JsonResponse?.result?.status === '200') {
        callback(JsonResponse);
      } else {
        errorCallback(JsonResponse);
      }
      return fulfillWithValue(response?.data?.result);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** Change Password Async Thunk Function */

const ChangePasswordApi = createAsyncThunk(
  'auth/ChangePassword',
  async (
    {
      data,
      callback,
      errorCallback,
    }: {
      data: any;
      callback: (response: any) => void;
      errorCallback: (error: any) => void;
    },
    {fulfillWithValue, rejectWithValue},
  ) => {
    try {
      const response = await Post({
        endpoint: `reset/password`,
        body: data,
      });
      const JsonResponse = response?.data;

      if (JsonResponse?.result?.status === '200') {
        callback(JsonResponse);
      } else {
        errorCallback(JsonResponse);
      }
      return fulfillWithValue(response?.data?.result);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** Change Password Async Thunk Function */

const UpdatePasswordApi = createAsyncThunk(
  'auth/updatePassword',
  async (
    {
      data,
      callback,
      errorCallback,
    }: {
      data: any;
      callback: (response: any) => void;
      errorCallback: (error: any) => void;
    },
    {fulfillWithValue, rejectWithValue},
  ) => {
    try {
      const response = await Post({
        endpoint: `update/password`,
        body: data,
      });
      const JsonResponse = response?.data;

      if (JsonResponse?.result?.status === '200') {
        callback(JsonResponse);
      } else {
        errorCallback(JsonResponse);
      }
      return fulfillWithValue(response?.data?.result);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** exports */
export {
  loginApi,
  SignUpApi,
  VerifyOtpApi,
  ForgotPasswordApi,
  UpdatePasswordApi,
  ChangePasswordApi,
  continueAsGuestApi,
};
