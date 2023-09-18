import {createSlice} from '@reduxjs/toolkit';
import {
  CreateOrderApi,
  GetAvailableServiceApi,
  GetPaymentMethodApi,
  GetServiceTypesApi,
  GetServicesApi,
  GetSlotsApi,
  checkPromoApi,
} from './BookServiceActions';

const initialState = {
  slots: [],
  product: [],
  service: [],
  isError: null,
  serviceTypes: [],
  isLoading: false,
  availableServices: [],
  serviceProviders: null,
  paymentMethod: [],
  nearByService: {
    services: [],
    date: null,
    timeSlots: {},
    vehicles: null,
  },
  order_list: null,
  promo: null,
};

export const BookServiceSlice = createSlice({
  name: 'bookServiceSlice',
  initialState,
  reducers: {
    serviceTypes: (state: any, action: any) => {
      state.offers = action.payload;
    },
    updateServices: (state: any, action: any) => {
      state.nearByService.services = action.payload;
      state.nearByService.date = initialState.nearByService.date;
      state.nearByService.timeSlots = initialState.nearByService.timeSlots;
    },
    updateDate: (state: any, action: any) => {
      state.nearByService.date = action.payload;
    },
    updateTimeSlots: (state: any, action: any) => {
      state.nearByService.timeSlots = action.payload;
    },
    updateVehicles: (state: any, action: any) => {
      state.nearByService.vehicles = action.payload;
    },
    getServiceProviders: (state: any, action: any) => {
      state.serviceProviders = action.payload;
    },
  },

  extraReducers: builder => {
    builder

      //** Pending Status of GetServicesApi *//
      .addCase(GetServicesApi.pending, state => {
        state.service = [];
        state.product = [];
        state.isError = null;
        state.isLoading = true;
      })
      //** FulFilled Status of GetServicesApi *//
      .addCase(GetServicesApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.service = action.payload?.data?.services;
        state.product = action.payload?.data?.products;
      })
      //** Rejected Status of GetServicesApi *//
      .addCase(GetServicesApi.rejected, (state: any, action: any) => {
        state.service = [];
        state.product = [];
        state.isLoading = false;
        state.isError = action.payload;
      })

      //** Pending Status of GetServiceTypesApi *//
      .addCase(GetServiceTypesApi.pending, state => {
        state.isError = null;
        state.serviceTypes = [];
        state.isLoading = true;
      })
      //** FulFilled Status of GetServiceTypesApi *//
      .addCase(GetServiceTypesApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.serviceTypes = action.payload;
      })
      //** Rejected Status of GetServiceTypesApi *//
      .addCase(GetServiceTypesApi.rejected, (state: any, action: any) => {
        state.serviceTypes = [];
        state.isLoading = false;
        state.isError = action.payload;
      })

      //** Pending Status of GetServiceTypesApi *//
      .addCase(GetAvailableServiceApi.pending, state => {
        state.isError = null;
        state.isLoading = true;
        state.availableServices = [];
      })
      //** FulFilled Status of GetServiceTypesApi *//
      .addCase(GetAvailableServiceApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.availableServices = action.payload?.data?.services;
      })
      //** Rejected Status of GetServiceTypesApi *//
      .addCase(GetAvailableServiceApi.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.availableServices = [];
        state.isError = action.payload;
      })
      //** Pending Status of GetSlotsApi *//
      .addCase(GetSlotsApi.pending, state => {
        state.slots = [];
        state.isError = null;
        state.isLoading = true;
      })
      //** FulFilled Status of GetSlotsApi *//
      .addCase(GetSlotsApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.slots = action.payload?.result;
      })
      //** Rejected Status of GetSlotsApi *//
      .addCase(GetSlotsApi.rejected, (state: any, action: any) => {
        state.slots = [];
        state.isLoading = false;
        state.isError = action.payload;
      })
      //** Pending Status of GetSlotsApi *//
      .addCase(GetPaymentMethodApi.pending, state => {
        state.paymentMethod = [];
        state.isError = null;
        state.isLoading = true;
      })
      //** FulFilled Status of GetSlotsApi *//
      .addCase(GetPaymentMethodApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.paymentMethod = action.payload;
      })
      //** Rejected Status of GetSlotsApi *//
      .addCase(GetPaymentMethodApi.rejected, (state: any, action: any) => {
        state.paymentMethod = [];
        state.isLoading = false;
        state.isError = action.payload;
      })
      //** Pending Status of CreateOrderApi *//
      .addCase(CreateOrderApi.pending, state => {
        state.order_list = null;
        state.isError = null;
        state.isLoading = true;
      })
      //** FulFilled Status of CreateOrderApi *//
      .addCase(CreateOrderApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.order_list = action.payload;
      })
      //** Rejected Status of CreateOrderApi *//
      .addCase(CreateOrderApi.rejected, (state: any, action: any) => {
        state.order_list = null;
        state.isLoading = false;
        state.isError = action.payload;
      })
      //** Pending Status of checkPromoApi *//
      .addCase(checkPromoApi.pending, state => {
        state.promo = null;
        state.isError = null;
        state.isLoading = true;
      })
      //** FulFilled Status of checkPromoApi *//
      .addCase(checkPromoApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.promo = action.payload;
      })
      //** Rejected Status of checkPromoApi *//
      .addCase(checkPromoApi.rejected, (state: any, action: any) => {
        state.promo = null;
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const {
  updateDate,
  serviceTypes,
  updateVehicles,
  updateServices,
  updateTimeSlots,
  getServiceProviders,
} = BookServiceSlice.actions;

export default BookServiceSlice.reducer;
