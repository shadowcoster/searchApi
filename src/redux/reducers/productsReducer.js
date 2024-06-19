import {ApiConstants} from '../../constants/apiConstants';
const initialState = {
  categoryList: [],
  productsList: [],
  selectedProductList: [],
  searchedList: [],
  loading: false,
  total: null,
};

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case ApiConstants.API_GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoryList: action?.data,
        loading: false,
      };
    case ApiConstants.API_GET_CATEGORIES_LOAD:
      return {
        ...state,
        loading: true,
      };
    case ApiConstants.API_GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        productsList: [...state.productsList, ...action?.data?.products],
        total: action?.data?.total,
      };

    case ApiConstants.API_GET_PRODUCTS_LOAD:
      return {
        ...state,
        loading: true,
      };
    case ApiConstants.API_GET_SELECTED_PRODUCT_LOAD:
      return {
        ...state,
        loading: true,
      };
    case ApiConstants.API_GET_SELECTED_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProductList: action?.data,
      };
    case ApiConstants.API_GET_CATEGORY_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        searchedList: action?.data,
      };
    case ApiConstants.API_GET_CATEGORY_SEARCH_LOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default productsReducer;
