import {createAsyncThunk} from '@reduxjs/toolkit';
import {Post} from '../../../utils/Services/service';

//** GetServicesApi Async Thunk Function */
const GetServicesApi = createAsyncThunk(
  'app/ServicesApi',
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

//** GetServiceTypesApi Async Thunk Function */
const GetServiceTypesApi = createAsyncThunk(
  'app/ServiceTypesApi',
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

//** GetServiceTypesApi Async Thunk Function */
const GetAvailableServiceApi = createAsyncThunk(
  'app/AvailableServiceApi',
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

//** GetServiceTypesApi Async Thunk Function */
const GetSlotsApi = createAsyncThunk(
  'app/SlotsApi',
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

      const JsonResponse = response.data;

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

//** GetPaymentMethodApi Async Thunk Function */
const GetPaymentMethodApi = createAsyncThunk(
  'app/PaymentMethodApi',
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

      if (JsonResponse) {
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

//** CreateOrderApi Async Thunk Function */
const CreateOrderApi = createAsyncThunk(
  'app/createOrder',
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

      const JsonResponse = response.data;

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

//** CreateOrderApi Async Thunk Function */
const checkPromoApi = createAsyncThunk(
  'app/check-promo',
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
        endpoint: 'coupon/validity',
        body: data,
      });

      const JsonResponse = response.data?.result;

      if (JsonResponse?.status === '200') {
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
  GetSlotsApi,
  checkPromoApi,
  CreateOrderApi,
  GetServicesApi,
  GetServiceTypesApi,
  GetPaymentMethodApi,
  GetAvailableServiceApi,
};
