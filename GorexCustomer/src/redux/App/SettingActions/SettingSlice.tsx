import {createSlice} from '@reduxjs/toolkit';
import {
  CreateAddressApi,
  GetAddressApi,
  GetProfileApi,
  UpdateAddressApi,
  UpdateProfileApi,
} from './SettingActions';

const initialState = {
  isError: null,
  address: null,
  isLoading: false,
  new_Address: null,
  profile_data: null,
  update_address: null,
  update_profile: null,
};

export const settingSlice = createSlice({
  name: 'settingSlice',
  initialState,
  reducers: {
    isLoading: (state: any, action: any) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers: builder => {
    builder

      //** Pending Status of GetProfileApi *//
      .addCase(GetProfileApi.pending, state => {
        state.isError = null;
        state.isLoading = true;
        state.profile_data = null;
      })
      //** FulFilled Status of GetProfileApi *//
      .addCase(GetProfileApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.profile_data = action.payload?.result;
      })
      //** Rejected Status of GetProfileApi *//
      .addCase(GetProfileApi.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.profile_data = null;
        state.isError = action.payload?.error;
      })
      //** Pending Status of UpdateProfileApi *//
      .addCase(UpdateProfileApi.pending, state => {
        state.isError = null;
        state.isLoading = true;
        state.update_profile = null;
      })
      //** FulFilled Status of UpdateProfileApi *//
      .addCase(UpdateProfileApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.update_profile = action.payload?.result;
      })
      //** Rejected Status of UpdateProfileApi *//
      .addCase(UpdateProfileApi.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.update_profile = null;
        state.isError = action.payload?.error;
      })
      //** Pending Status of GetAddressApi *//
      .addCase(GetAddressApi.pending, state => {
        state.isError = null;
        state.address = null;
        state.isLoading = true;
      })
      //** FulFilled Status of GetAddressApi *//
      .addCase(GetAddressApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.address = action.payload?.result;
      })
      //** Rejected Status of GetAddressApi *//
      .addCase(GetAddressApi.rejected, (state: any, action: any) => {
        state.address = null;
        state.isLoading = false;
        state.isError = action.payload?.error;
      })
      //** Pending Status of CreateAddressApi *//
      .addCase(CreateAddressApi.pending, state => {
        state.isError = null;
        state.isLoading = true;
        state.new_Address = null;
      })
      //** FulFilled Status of CreateAddressApi *//
      .addCase(CreateAddressApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.new_Address = action.payload?.result;
      })
      //** Rejected Status of CreateAddressApi *//
      .addCase(CreateAddressApi.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.new_Address = null;
        state.isError = action.payload?.error;
      })
      //** Pending Status of UpdateAddressApi *//
      .addCase(UpdateAddressApi.pending, state => {
        state.isError = null;
        state.isLoading = true;
        state.update_address = null;
      })
      //** FulFilled Status of UpdateAddressApi *//
      .addCase(UpdateAddressApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.update_address = action.payload?.result;
      })
      //** Rejected Status of UpdateAddressApi *//
      .addCase(UpdateAddressApi.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.update_address = null;
        state.isError = action.payload?.error;
      });
  },
});

export const {isLoading} = settingSlice.actions;

export default settingSlice.reducer;
