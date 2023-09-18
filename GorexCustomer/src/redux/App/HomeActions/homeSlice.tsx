import {createSlice} from '@reduxjs/toolkit';
import {
  GetNearByApi,
  GetTopOffersApi,
  GetAllOffersApi,
  GetAllServiceApi,
  GetTopServiceApi,
  GetAllProductsApi,
  GetTopProductsApi,
} from './homeAction';

const initialState = {
  offers: [],
  near_By: [],
  isError: null,
  top_Offers: [],
  top_Service: [],
  all_Service: [],
  top_Products: [],
  isLoading: false,
  all_Products: [],
};

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    offers: (state: any, action: any) => {
      state.offers = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      //** Pending Status of offers *//
      .addCase(GetTopOffersApi.pending, state => {
        state.isError = null;
        state.top_Offers = [];
        state.isLoading = true;
      })
      //** FulFilled Status of offer *//
      .addCase(GetTopOffersApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.top_Offers = action.payload;
      })
      //** Rejected Status of offer *//
      .addCase(GetTopOffersApi.rejected, (state: any, action: any) => {
        state.top_Offers = [];
        state.isLoading = false;
        state.isError = action.payload;
      })

      //** Pending Status of offers *//
      .addCase(GetAllOffersApi.pending, state => {
        state.isLoading = true;
        state.isError = null;
        state.offers = [];
      })
      //** FulFilled Status of offer *//
      .addCase(GetAllOffersApi.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.offers = action.payload;
        state.isError = null;
      })
      //** Rejected Status of offer *//
      .addCase(GetAllOffersApi.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.offers = [];
      })
      //** Pending Status of Top Service *//
      .addCase(GetTopServiceApi.pending, state => {
        state.isLoading = true;
        state.isError = null;
        state.top_Service = [];
      })
      //** FulFilled Status of Top Service *//
      .addCase(GetTopServiceApi.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.top_Service = action.payload;
        state.isError = null;
      })
      //** Rejected Status of Top Service *//
      .addCase(GetTopServiceApi.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.top_Service = [];
      })
      //** Pending Status of Top Service *//
      .addCase(GetAllServiceApi.pending, state => {
        state.isLoading = true;
        state.isError = null;
        state.all_Service = [];
      })
      //** FulFilled Status of Top Service *//
      .addCase(GetAllServiceApi.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.all_Service = action.payload;
        state.isError = null;
      })
      //** Rejected Status of Top Service *//
      .addCase(GetAllServiceApi.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.all_Service = [];
      })
      //** Pending Status of Top Service *//
      .addCase(GetTopProductsApi.pending, state => {
        state.isLoading = true;
        state.isError = null;
        state.top_Products = [];
      })
      //** FulFilled Status of Top Service *//
      .addCase(GetTopProductsApi.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.top_Products = action.payload;
        state.isError = null;
      })
      //** Rejected Status of Top Service *//
      .addCase(GetTopProductsApi.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.top_Products = [];
      })
      //** Pending Status of Top Service *//
      .addCase(GetAllProductsApi.pending, state => {
        state.isLoading = true;
        state.isError = null;
        state.all_Products = [];
      })
      //** FulFilled Status of Top Service *//
      .addCase(GetAllProductsApi.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.all_Products = action.payload;
        state.isError = null;
      })
      //** Rejected Status of Top Service *//
      .addCase(GetAllProductsApi.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.all_Products = [];
      })
      //** Pending Status of Top Service *//
      .addCase(GetNearByApi.pending, state => {
        state.isLoading = true;
        state.isError = null;
        state.near_By = [];
      })
      //** FulFilled Status of Top Service *//
      .addCase(GetNearByApi.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.near_By = action.payload;
        state.isError = null;
      })
      //** Rejected Status of Top Service *//
      .addCase(GetNearByApi.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.near_By = [];
      });
  },
});

export const {offers} = homeSlice.actions;

export default homeSlice.reducer;
