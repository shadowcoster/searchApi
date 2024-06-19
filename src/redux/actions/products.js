import {ApiConstants} from '../../constants/apiConstants';

export const getCategoryAction = () => {
  return {
    type: ApiConstants.API_GET_CATEGORIES_LOAD,
  };
};

export const getProductListAction = (limit, skip) => {
  return {
    type: ApiConstants.API_GET_PRODUCTS_LOAD,
    payload: {limit, skip},
  };
};
export const getSelectedProductAction = data => {
  return {
    type: ApiConstants.API_GET_SELECTED_PRODUCT_LOAD,
    payload: data,
  };
};

export const categorySearchAction = data => {
  console.log(data);
  return {
    type: ApiConstants.API_GET_CATEGORY_SEARCH_LOAD,
    payload: data,
  };
};
