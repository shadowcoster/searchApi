import {Method} from './apiMethod';

let header2 = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

//Products APIs
export const getCategoriesApi = () =>
  Method.GET(`/products/categories`, header2);
export const getAllProductsApi = data => {
  return Method.GET(
    `/products?limit=${data?.limit}&skip=${data?.skip}`,
    header2,
  );
};
export const getSelectedProductApi = data => {
  return Method.GET(`/products/category/${data}`, header2);
};
export const getCategorySearchApi = data => {
  return Method.GET(`/products/search?q=${data}`, header2);
};
