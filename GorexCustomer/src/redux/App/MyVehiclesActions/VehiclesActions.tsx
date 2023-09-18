import {createAsyncThunk} from '@reduxjs/toolkit';
import {Get, Post} from '../../../utils/Services/service';

//** GetServicesApi Async Thunk Function */
const GetVehiclesApi = createAsyncThunk(
  'app/VehiclesApi',
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

//** GetServicesApi Async Thunk Function */
const GetVehicleMakeApi = createAsyncThunk(
  'app/VehicleMakeApi',
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

//** GetServicesApi Async Thunk Function */
const GetVehicleModelApi = createAsyncThunk(
  'app/VehicleModelApi',
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

//** GetServicesApi Async Thunk Function */
const GetVehicleYearApi = createAsyncThunk(
  'app/VehicleYearApi',
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

//** GetServicesApi Async Thunk Function */
const GetVehicleColorApi = createAsyncThunk(
  'app/VehicleColorApi',
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

//** SetVehicleAsPrimaryApi Async Thunk Function */
const SetVehicleAsPrimaryApi = createAsyncThunk(
  'app/VehicleAsPrimaryApi',
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
        endpoint: 'set/primary/vehicle',
        body: data,
      });

      const JsonResponse = response?.data;

      if (JsonResponse?.result) {
        callback(JsonResponse?.result);
      } else {
        errorCallback(JsonResponse);
      }

      return fulfillWithValue(JsonResponse);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** SetVehicleAsPrimaryApi Async Thunk Function */
const DeleteVehicleApi = createAsyncThunk(
  'app/DeleteVehicleApi',
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
        errorCallback(JsonResponse);
      }

      return fulfillWithValue(JsonResponse);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

//** SetVehicleAsPrimaryApi Async Thunk Function */
const AddNewVehiclesApi = createAsyncThunk(
  'app/addNewVehiclesApi',
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
  GetVehiclesApi,
  DeleteVehicleApi,
  AddNewVehiclesApi,
  GetVehicleYearApi,
  GetVehicleMakeApi,
  GetVehicleModelApi,
  GetVehicleColorApi,
  SetVehicleAsPrimaryApi,
};
