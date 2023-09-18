import {createAsyncThunk} from '@reduxjs/toolkit';
import {Post} from '../../../utils/Services/service';

//** GetServicesApi Async Thunk Function */
const GetPendingOrderApi = createAsyncThunk(
  'app/PendingOrderApi',
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

      const JsonResponse = response?.data?.result;

      if (JsonResponse?.status === '200') {
        callback(JsonResponse?.data);
      } else {
        errorCallback(JsonResponse);
      }

      return fulfillWithValue(JsonResponse);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** GetServicesApi Async Thunk Function */
const GetConfirmOrderApi = createAsyncThunk(
  'app/confirmOrderApi',
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

      const JsonResponse = response?.data?.result;

      if (JsonResponse?.status === '200') {
        callback(JsonResponse?.data);
      } else {
        errorCallback(JsonResponse);
      }

      return fulfillWithValue(JsonResponse);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** GetServicesApi Async Thunk Function */
const GetCompletedOrderApi = createAsyncThunk(
  'app/completedOrderApi',
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

      const JsonResponse = response?.data?.result;

      if (JsonResponse?.status === '200') {
        callback(JsonResponse?.data);
      } else {
        errorCallback(JsonResponse);
      }

      return fulfillWithValue(JsonResponse);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** GetServicesApi Async Thunk Function */
const GetInProgressOrderApi = createAsyncThunk(
  'app/inProgressOrderApi',
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

      const JsonResponse = response?.data?.result;

      if (JsonResponse?.status === '200') {
        callback(JsonResponse?.data);
      } else {
        errorCallback(JsonResponse);
      }

      return fulfillWithValue(JsonResponse);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** GetServicesApi Async Thunk Function */
const GetCancelOrderApi = createAsyncThunk(
  'app/cancelOrderApi',
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

      const JsonResponse = response?.data?.result;

      if (JsonResponse?.status === '200') {
        callback(JsonResponse?.data);
      } else {
        errorCallback(JsonResponse);
      }

      return fulfillWithValue(JsonResponse);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** GetServicesApi Async Thunk Function */
const OrderCancelApi = createAsyncThunk(
  'app/OrderCancelApi',
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
        endpoint: 'cancel/order',
        body: data,
      });

      const JsonResponse = response;

      if (JsonResponse) {
        callback(JsonResponse?.data?.result);
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
  OrderCancelApi,
  GetCancelOrderApi,
  GetPendingOrderApi,
  GetConfirmOrderApi,
  GetCompletedOrderApi,
  GetInProgressOrderApi,
};
