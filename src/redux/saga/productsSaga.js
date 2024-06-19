import {put, call} from 'redux-saga/effects';
import {getInternetStatus} from '../../helper/globalFunctions';
import networkUtils from '../../helper/networkUtils';
import {ShowAlertMessage} from '../../helper/showAlertMessage';
import {
  getAllProductsApi,
  getCategoriesApi,
  getCategoryProductApi,
  getCategorySearchApi,
  getSelectedProductApi,
} from '../axios/axiosApi';
import {ApiConstants} from '../../constants/apiConstants';
import {popupType} from '../../constants/appConstants';
import {ValidationConstants} from '../../constants/ValidationConstants';

export function* getCategoriesListSaga(action) {
  const internetStatus = yield call(getInternetStatus);
  if (internetStatus) {
    try {
      const isConnected = yield call(networkUtils);
      if (isConnected) {
        let response = yield call(getCategoriesApi, action?.payload);
        let {result, status} = response;
        console.log('RESS', response);
        if (status === 1) {
          yield put({
            type: ApiConstants.API_GET_CATEGORIES_SUCCESS,
            data: result,
          });
        } else {
          ShowAlertMessage(result.msg, popupType.error);
        }
      } else {
        ShowAlertMessage(ValidationConstants.internetCheck, popupType.error);
      }
    } catch (e) {
      yield put({
        type: ApiConstants.API_GET_CATEGORIES_LOAD,
        data: false,
      });
      ShowAlertMessage(ValidationConstants.internetCheck, popupType.error);
    }
  } else {
    ShowAlertMessage(ValidationConstants.internetCheck, popupType.error);
  }
}
export function* getProductListSaga(action) {
  const internetStatus = yield call(getInternetStatus);
  if (internetStatus) {
    try {
      const isConnected = yield call(networkUtils);

      if (isConnected) {
        const {limit, skip} = action.payload;
        let response = yield call(getAllProductsApi, {limit, skip});

        let {result, status} = response;

        if (status === 1) {
          yield put({
            type: ApiConstants.API_GET_PRODUCTS_SUCCESS,
            data: result,
          });
        } else {
          ShowAlertMessage(result.msg, popupType.error);
        }
      } else {
        ShowAlertMessage(ValidationConstants.internetCheck, popupType.error);
      }
    } catch (e) {
      // yield put({
      //   type: ApiConstants.API_GET_PRODUCTS_LOAD,
      //   data: false,
      // });
      ShowAlertMessage(ValidationConstants.internetCheck, popupType.error);
    }
  } else {
    ShowAlertMessage(ValidationConstants.internetCheck, popupType.error);
  }
}

export function* getSelectedProductSaga(action) {
  const internetStatus = yield call(getInternetStatus);
  if (internetStatus) {
    try {
      const isConnected = yield call(networkUtils);

      if (isConnected) {
       
        let response = yield call(getSelectedProductApi, action?.payload);

        let {result, status} = response;

        if (status === 1) {
          yield put({
            type: ApiConstants.API_GET_SELECTED_PRODUCT_SUCCESS,
            data: result,
          });
        } else {
          ShowAlertMessage(result.msg, popupType.error);
        }
      } else {
        ShowAlertMessage(ValidationConstants.internetCheck, popupType.error);
      }
    } catch (e) {
     
      ShowAlertMessage(ValidationConstants.internetCheck, popupType.error);
    }
  } else {
    ShowAlertMessage(ValidationConstants.internetCheck, popupType.error);
  }
}

export function* getProductListSearchSaga(action) {
  const internetStatus = yield call(getInternetStatus);
  if (internetStatus) {
    try {
      const isConnected = yield call(networkUtils);
      if (isConnected) {
        let response = yield call(getCategorySearchApi, action.payload);
        let {result, status} = response;

        if (status === 1) {
          yield put({
            type: ApiConstants.API_GET_CATEGORY_SEARCH_SUCCESS,
            data: result,
          });
        } else {
          ShowAlertMessage(result.msg, popupType.error);
        }
      } else {
        ShowAlertMessage(ValidationConstants.internetCheck, popupType.error);
      }
    } catch (e) {
      yield put({
        type: ApiConstants.API_GET_CATEGORY_SEARCH_LOAD,
        data: false,
      });
      ShowAlertMessage(ValidationConstants.internetCheck, popupType.error);
    }
  } else {
    ShowAlertMessage(ValidationConstants.internetCheck, popupType.error);
  }
}
