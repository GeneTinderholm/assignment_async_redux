export const SERVER_FETCH = "SERVER_FETCH";
export const SERVER_SUCCESS = "SERVER_SUCCESS";
export const SERVER_FAIL = "SERVER_FAIL";

export function serverFetch() {
  return {
    type: SERVER_FETCH
  };
}

export function serverSuccess(data) {
  return {
    type: SERVER_SUCCESS,
    data
  };
}
export function serverFail(error) {
  return {
    type: SERVER_FAIL,
    error
  };
}

