import { reducer as toastrReducer } from "react-redux-toastr";
import { reducer as userReducer } from './user/user.slice';
import { reducer as modalReducer } from './modal/modal.slice';
import { reducer as filterReducer } from './filter/slice';
import { reducer as scrollReducer } from './scroll/slice';
import product from './product/slice';
import cart from './cart/slice';

export const reducers = {
  user: userReducer,
  toastr: toastrReducer,
  modal: modalReducer,
  scroll: scrollReducer,
  filter: filterReducer,
  product,
  cart,
};
