import {createAsyncThunk} from '@reduxjs/toolkit';
import {Post} from '../../../utils/Services/service';

//** GetServicesApi Async Thunk Function */
const GetProfileApi = createAsyncThunk(
  'app/GetProfileApi',
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
        endpoint: 'dataset/call_kw/',
        body: data,
      });

      const JsonResponse = response?.data;

      if (JsonResponse?.result) {
        callback(JsonResponse?.result);
      } else {
        errorCallback(JsonResponse?.error);
      }

      return fulfillWithValue(JsonResponse);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** UpdateProfileApi Async Thunk Function */
const UpdateProfileApi = createAsyncThunk(
  'app/UpdateProfileApi',
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
        endpoint: 'dataset/call_kw/',
        body: data,
      });

      const JsonResponse = response?.data;

      if (JsonResponse?.result) {
        callback(JsonResponse?.result);
      } else {
        errorCallback(JsonResponse?.error);
      }

      return fulfillWithValue(JsonResponse);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** UpdateProfileApi Async Thunk Function */
const GetAddressApi = createAsyncThunk(
  'app/GetAddressApi',
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
        endpoint: 'dataset/call_kw/',
        body: data,
      });

      const JsonResponse = response?.data;

      if (JsonResponse?.result) {
        callback(JsonResponse?.result);
      } else {
        errorCallback(JsonResponse?.error);
      }

      return fulfillWithValue(JsonResponse);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** CreateAddressApi Async Thunk Function */
const CreateAddressApi = createAsyncThunk(
  'app/CreateAddressApi',
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
        endpoint: 'dataset/call_kw/',
        body: data,
      });

      const JsonResponse = response?.data;

      console.log('response', JsonResponse);

      if (JsonResponse?.result) {
        callback(JsonResponse?.result);
      } else {
        errorCallback(JsonResponse?.error);
      }

      return fulfillWithValue(JsonResponse);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** UpdateAddressApi Async Thunk Function */
const UpdateAddressApi = createAsyncThunk(
  'app/UpdateAddressApi',
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
        endpoint: 'dataset/call_kw/',
        body: data,
      });

      const JsonResponse = response?.data;

      console.log('response', JsonResponse);

      if (JsonResponse?.result) {
        callback(JsonResponse?.result);
      } else {
        errorCallback(JsonResponse?.error);
      }

      return fulfillWithValue(JsonResponse);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** exports */
export {
  GetProfileApi,
  GetAddressApi,
  UpdateProfileApi,
  CreateAddressApi,
  UpdateAddressApi,
};
