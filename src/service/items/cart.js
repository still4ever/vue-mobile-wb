import http from "../../utils/http";
import { cart } from "../../config/api";

export default {
  getCartList(params) {
    return http
      .get(cart.list, { params })
      .then(response => response)
      .catch(err => err);
  },
  getCartNumber(params) {
    return http
      .get(cart.number, { params })
      .then(response => response)
      .catch(err => err);
  },
  deleteCart(params) {
    return http
      .post(cart.delete, params)
      .then(response => response)
      .catch(err => err);
  },
  addCart(params) {
    return http
      .post(cart.addCart, params)
      .then(response => response)
      .catch(err => err);
  },
  addCartNumber(params) {
    return http
      .post(cart.add, params)
      .then(response => response)
      .catch(err => err);
  },
  subtractCartNumber(params) {
    return http
      .post(cart.subtract, params)
      .then(response => response)
      .catch(err => err);
  }
};
