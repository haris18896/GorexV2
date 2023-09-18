import {createAsyncThunk} from '@reduxjs/toolkit';
import {Post} from '../../../utils/Services/service';

//** GetTransactionApi Async Thunk Function */
const GetTransactionApi = createAsyncThunk(
  'app/GetTransactionApi',
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

//** GetCreditCardApi Async Thunk Function */
const GetCreditCardApi = createAsyncThunk(
  'app/GetCreditCardApi',
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

//** GetCreditCardApi Async Thunk Function */
const CreateCreditCardApi = createAsyncThunk(
  'app/CreateCreditCardApi',
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
        endpoint: 'add/card/action/api',
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

//** deleteCreditCardApi Async Thunk Function */
const deleteCreditCardApi = createAsyncThunk(
  'app/deleteCreditCardApi',
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
        endpoint: 'add/card/action/api',
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

//** exports */
export {
  GetCreditCardApi,
  GetTransactionApi,
  CreateCreditCardApi,
  deleteCreditCardApi,
};
