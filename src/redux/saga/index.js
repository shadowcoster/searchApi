import {takeLatest} from 'redux-saga/effects';
import {
  getCategoriesListSaga,
  getCategoryProductListSaga,
  getProductListSaga,
  getProductListSearchSaga,
  getSelectedProductSaga,
} from './productsSaga';
import {ApiConstants} from '../../constants/apiConstants';

export function* rootSaga() {
  yield takeLatest(ApiConstants.API_GET_CATEGORIES_LOAD, getCategoriesListSaga);
  yield takeLatest(ApiConstants.API_GET_PRODUCTS_LOAD, getProductListSaga);
  yield takeLatest(
    ApiConstants.API_GET_SELECTED_PRODUCT_LOAD,
    getSelectedProductSaga,
  );
  yield takeLatest(
    ApiConstants.API_GET_CATEGORY_SEARCH_LOAD,
    getProductListSearchSaga,
  );
}
