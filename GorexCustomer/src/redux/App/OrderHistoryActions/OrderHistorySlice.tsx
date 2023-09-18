import {createSlice} from '@reduxjs/toolkit';
import {
  GetCancelOrderApi,
  GetPendingOrderApi,
  GetConfirmOrderApi,
  GetCompletedOrderApi,
  GetInProgressOrderApi,
  OrderCancelApi,
} from './OrderHistoryActions';

const initialState = {
  pending: [],
  confirmed: [],
  completed: [],
  cancelled: [],
  isError: null,
  inProgress: [],
  isLoading: false,
  order_cancel: null,
};

export const OrderHistorySlice = createSlice({
  name: 'orderHistorySlice',
  initialState,
  reducers: {
    isLoading: (state: any, action: any) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers: builder => {
    builder

      //** Pending Status of GetPendingOrderApi *//
      .addCase(GetPendingOrderApi.pending, state => {
        state.pending = [];
        state.isError = null;
        state.isLoading = true;
      })
      //** FulFilled Status of GetPendingOrderApi *//
      .addCase(GetPendingOrderApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.pending = action.payload?.data;
      })
      //** Rejected Status of GetPendingOrderApi *//
      .addCase(GetPendingOrderApi.rejected, (state: any, action: any) => {
        state.pending = [];
        state.isLoading = false;
        state.isError = action.payload;
      })

      //** Pending Status of GetConfirmOrderApi *//
      .addCase(GetConfirmOrderApi.pending, state => {
        state.isError = null;
        state.confirmed = [];
        state.isLoading = true;
      })
      //** FulFilled Status of GetConfirmOrderApi *//
      .addCase(GetConfirmOrderApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.confirmed = action.payload?.data;
      })
      //** Rejected Status of GetConfirmOrderApi *//
      .addCase(GetConfirmOrderApi.rejected, (state: any, action: any) => {
        state.confirmed = [];
        state.isLoading = false;
        state.isError = action.payload;
      })

      //** Pending Status of GetInProgressOrderApi *//
      .addCase(GetInProgressOrderApi.pending, state => {
        state.isError = null;
        state.isLoading = true;
        state.inProgress = [];
      })
      //** FulFilled Status of GetInProgressOrderApi *//
      .addCase(GetInProgressOrderApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.inProgress = action.payload?.data;
      })
      //** Rejected Status of GetInProgressOrderApi *//
      .addCase(GetInProgressOrderApi.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.inProgress = [];
        state.isError = action.payload;
      })
      //** Pending Status of GetCompletedOrderApi *//
      .addCase(GetCompletedOrderApi.pending, state => {
        state.completed = [];
        state.isError = null;
        state.isLoading = true;
      })
      //** FulFilled Status of GetCompletedOrderApi *//
      .addCase(GetCompletedOrderApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.completed = action.payload?.data;
      })
      //** Rejected Status of GetCompletedOrderApi *//
      .addCase(GetCompletedOrderApi.rejected, (state: any, action: any) => {
        state.completed = [];
        state.isLoading = false;
        state.isError = action.payload;
      })
      //** Pending Status of GetCancelOrderApi *//
      .addCase(GetCancelOrderApi.pending, state => {
        state.cancelled = [];
        state.isError = null;
        state.isLoading = true;
      })
      //** FulFilled Status of GetCancelOrderApi *//
      .addCase(GetCancelOrderApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.cancelled = action.payload?.data;
      })
      //** Rejected Status of GetCancelOrderApi *//
      .addCase(GetCancelOrderApi.rejected, (state: any, action: any) => {
        state.cancelled = [];
        state.isLoading = false;
        state.isError = action.payload;
      })
      //** Pending Status of OrderCancelApi *//
      .addCase(OrderCancelApi.pending, state => {
        state.isError = null;
        state.isLoading = true;
        state.order_cancel = null;
      })
      //** FulFilled Status of OrderCancelApi *//
      .addCase(OrderCancelApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.order_cancel = action.payload?.data;
      })
      //** Rejected Status of OrderCancelApi *//
      .addCase(OrderCancelApi.rejected, (state: any, action: any) => {
        state.order_cancel = [];
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const {isLoading} = OrderHistorySlice.actions;

export default OrderHistorySlice.reducer;
