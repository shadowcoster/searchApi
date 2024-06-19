import APIKit from './apiKit';

const StatusCodes = {
  Success: 1,
  Failure: 0,
  Unauthenticate: 2,
};

const handleResponse = response =>
  response.status >= 200 && response.status < 400
    ? {status: StatusCodes.Success, result: response.data}
    : {result: {msg: response.data.message}, status: StatusCodes.Failure};

const handleError = error =>
  error.response
    ? error.response.status === 403 || error.response.status === 401
      ? {
          result: {msg: error.response.data.message},
          status: StatusCodes.Unauthenticate,
        }
      : {
          result: {msg: error.response.data.message},
          status: StatusCodes.Failure,
        }
    : {result: {msg: 'Timeout: server issue'}, status: StatusCodes.Failure};

export const Method = {
  POST: async (url, body, header) => {
    try {
      return handleResponse(await APIKit.post(url, body, {headers: header}));
    } catch (error) {
      return handleError(error);
    }
  },
  PUT: async (url, body, header) => {
    try {
      return handleResponse(await APIKit.put(url, body, {headers: header}));
    } catch (error) {
      return handleError(error);
    }
  },
  DELETE: async url => {
    try {
      return handleResponse(await APIKit.delete(url));
    } catch (error) {
      return handleError(error);
    }
  },
  GET: async (url, header) => {
    try {
      return handleResponse(await APIKit.get(url, {headers: header}));
    } catch (error) {
      return handleError(error);
    }
  },
  SpecialReq: async (url, body, header) => {
    console.log('entered');
    try {
      return handleResponse(
        await APIKit.put(url, body, {
          headers: {'Content-Type': 'multipart/form-data'},
          transformRequest: data => data,
        }),
      );
    } catch (error) {
      return handleError(error);
    }
  },
};
