import {createSlice} from '@reduxjs/toolkit';
import {
  GetCreditCardApi,
  GetTransactionApi,
  deleteCreditCardApi,
  CreateCreditCardApi,
} from './PaymentActions';

const initialState = {
  isError: null,
  address: null,
  new_card: null,
  card_list: null,
  isLoading: false,
  delete_card: null,
  transaction_list: null,
};

export const paymentSlice = createSlice({
  name: 'paymentSlice',
  initialState,
  reducers: {
    isLoading: (state: any, action: any) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers: builder => {
    builder

      //** Pending Status of GetTransactionApi *//
      .addCase(GetTransactionApi.pending, state => {
        state.isError = null;
        state.isLoading = true;
        state.transaction_list = null;
      })
      //** FulFilled Status of GetTransactionApi *//
      .addCase(GetTransactionApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.transaction_list = action.payload?.result;
      })
      //** Rejected Status of GetTransactionApi *//
      .addCase(GetTransactionApi.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.transaction_list = null;
        state.isError = action.payload?.error;
      })
      //** Pending Status of GetTransactionApi *//
      .addCase(GetCreditCardApi.pending, state => {
        state.isError = null;
        state.card_list = null;
        state.isLoading = true;
      })
      //** FulFilled Status of GetTransactionApi *//
      .addCase(GetCreditCardApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.card_list = action.payload?.result;
      })
      //** Rejected Status of GetTransactionApi *//
      .addCase(GetCreditCardApi.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.card_list = null;
        state.isError = action.payload?.error;
      })
      //** Pending Status of CreateCreditCardApi *//
      .addCase(CreateCreditCardApi.pending, state => {
        state.isError = null;
        state.new_card = null;
        state.isLoading = true;
      })
      //** FulFilled Status of CreateCreditCardApi *//
      .addCase(CreateCreditCardApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.new_card = action.payload?.result;
      })
      //** Rejected Status of CreateCreditCardApi *//
      .addCase(CreateCreditCardApi.rejected, (state: any, action: any) => {
        state.new_card = null;
        state.isLoading = false;
        state.isError = action.payload?.error;
      })
      //** Pending Status of deleteCreditCardApi *//
      .addCase(deleteCreditCardApi.pending, state => {
        state.isError = null;
        state.isLoading = true;
        state.delete_card = null;
      })
      //** FulFilled Status of deleteCreditCardApi *//
      .addCase(deleteCreditCardApi.fulfilled, (state: any, action: any) => {
        state.isError = null;
        state.isLoading = false;
        state.delete_card = action.payload?.result;
      })
      //** Rejected Status of deleteCreditCardApi *//
      .addCase(deleteCreditCardApi.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.delete_card = null;
        state.isError = action.payload?.error;
      });
  },
});

export const {isLoading} = paymentSlice.actions;

export default paymentSlice.reducer;
