import {createSlice} from '@reduxjs/toolkit';
import {
  GetVehiclesApi,
  GetVehicleYearApi,
  AddNewVehiclesApi,
  GetVehicleMakeApi,
  GetVehicleModelApi,
  GetVehicleColorApi,
  SetVehicleAsPrimaryApi,
} from './VehiclesActions';

const initialState = {
  vehicles: [],
  isError: null,
  setAsPrimary: [],
  vehicleYear: [],
  vehicleMake: [],
  vehicleModel: [],
  isLoading: false,
  newVehicle: null,
  vehiclesColor: [],
};

export const VehicleSlice = createSlice({
  name: 'vehicleSlice',
  initialState,
  reducers: {
    vehicles: (state: any, action: any) => {
      state.offers = action.payload;
    },
  },

  extraReducers: builder => {
    builder

      //** Pending Status of GetServicesApi *//
      .addCase(GetVehiclesApi.pending, state => {
        state.vehicles = [];
        state.isError = null;
        state.isLoading = true;
      })
      //** FulFilled Status of GetServicesApi *//
      .addCase(GetVehiclesApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.vehicles = action.payload;
      })
      //** Rejected Status of GetServicesApi *//
      .addCase(GetVehiclesApi.rejected, (state: any, action: any) => {
        state.vehicles = [];
        state.isLoading = false;
        state.isError = action.payload;
      })
      //** Pending Status of GetServicesApi *//
      .addCase(GetVehicleMakeApi.pending, state => {
        state.isError = null;
        state.isLoading = true;
        state.vehicleMake = [];
      })
      //** FulFilled Status of GetServicesApi *//
      .addCase(GetVehicleMakeApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.vehicleMake = action.payload;
      })
      //** Rejected Status of GetServicesApi *//
      .addCase(GetVehicleMakeApi.rejected, (state: any, action: any) => {
        state.vehicleMake = [];
        state.isLoading = false;
        state.isError = action.payload;
      })
      //** Pending Status of GetServicesApi *//
      .addCase(GetVehicleModelApi.pending, state => {
        state.isError = null;
        state.isLoading = true;
        state.vehicleModel = [];
      })
      //** FulFilled Status of GetServicesApi *//
      .addCase(GetVehicleModelApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.vehicleModel = action.payload;
      })
      //** Rejected Status of GetServicesApi *//
      .addCase(GetVehicleModelApi.rejected, (state: any, action: any) => {
        state.vehicleModel = [];
        state.isLoading = false;
        state.isError = action.payload;
      })
      //** Pending Status of GetServicesApi *//
      .addCase(GetVehicleYearApi.pending, state => {
        state.isError = null;
        state.isLoading = true;
        state.vehicleYear = [];
      })
      //** FulFilled Status of GetServicesApi *//
      .addCase(GetVehicleYearApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.vehicleYear = action.payload;
      })
      //** Rejected Status of GetServicesApi *//
      .addCase(GetVehicleYearApi.rejected, (state: any, action: any) => {
        state.vehicleYear = [];
        state.isLoading = false;
        state.isError = action.payload;
      })
      //** Pending Status of GetServicesApi *//
      .addCase(GetVehicleColorApi.pending, state => {
        state.isError = null;
        state.isLoading = true;
        state.vehiclesColor = [];
      })
      //** FulFilled Status of GetServicesApi *//
      .addCase(GetVehicleColorApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.vehiclesColor = action.payload;
      })
      //** Rejected Status of GetServicesApi *//
      .addCase(GetVehicleColorApi.rejected, (state: any, action: any) => {
        state.vehiclesColor = [];
        state.isLoading = false;
        state.isError = action.payload;
      })
      //** Pending Status of GetServicesApi *//
      .addCase(SetVehicleAsPrimaryApi.pending, state => {
        state.isError = null;
        state.isLoading = true;
        state.setAsPrimary = [];
      })
      //** FulFilled Status of GetServicesApi *//
      .addCase(SetVehicleAsPrimaryApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.setAsPrimary = action.payload;
      })
      //** Rejected Status of GetServicesApi *//
      .addCase(SetVehicleAsPrimaryApi.rejected, (state: any, action: any) => {
        state.setAsPrimary = [];
        state.isLoading = false;
        state.isError = action.payload;
      })
      //** Pending Status of AddNewVehiclesApi *//
      .addCase(AddNewVehiclesApi.pending, state => {
        state.isError = null;
        state.isLoading = true;
        state.newVehicle = null;
      })
      //** FulFilled Status of AddNewVehiclesApi *//
      .addCase(AddNewVehiclesApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.newVehicle = action.payload;
      })
      //** Rejected Status of AddNewVehiclesApi *//
      .addCase(AddNewVehiclesApi.rejected, (state: any, action: any) => {
        state.newVehicle = null;
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const {vehicles} = VehicleSlice.actions;

export default VehicleSlice.reducer;
