import {createAsyncThunk} from '@reduxjs/toolkit';
import {Post} from '../../../utils/Services/service';

//** Login Async Thunk Function */
const GetTopOffersApi = createAsyncThunk(
  'app/TopOffersApi',
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
const GetAllOffersApi = createAsyncThunk(
  'app/AllOffersApi',
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

//** Get Top Service Async Thunk Function */
const GetTopServiceApi = createAsyncThunk(
  'app/TopServiceApi',
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

//** Get Top Service Async Thunk Function */
const GetAllServiceApi = createAsyncThunk(
  'app/AllServiceApi',
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

//** Get Top Service Async Thunk Function */
const GetTopProductsApi = createAsyncThunk(
  'app/TopProductApi',
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

//** Get Top Service Async Thunk Function */
const GetAllProductsApi = createAsyncThunk(
  'app/AllProductApi',
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

//** Get Top Service Async Thunk Function */
const GetNearByApi = createAsyncThunk(
  'app/NearByApi',
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

//** exports */
export {
  GetNearByApi,
  GetTopOffersApi,
  GetAllOffersApi,
  GetTopServiceApi,
  GetAllServiceApi,
  GetTopProductsApi,
  GetAllProductsApi,
};
