import {combineReducers} from 'redux';
import authSlice from '../Auth/authSlice';
import homeSlice from '../App/HomeActions/homeSlice';
import paymentSlice from '../App/PaymentActions/PaymentSlice';
import settingSlice from '../App/SettingActions/SettingSlice';
import vehicleSlice from '../App/MyVehiclesActions/VehicleSlice';
import bookServiceSlice from '../App/ServiceActions/BookServiceSlice';
import orderHistorySlice from '../App/OrderHistoryActions/OrderHistorySlice';

const rootReducer = combineReducers({
  authSlice,
  homeSlice,
  vehicleSlice,
  paymentSlice,
  settingSlice,
  bookServiceSlice,
  orderHistorySlice,
});

export default rootReducer;
