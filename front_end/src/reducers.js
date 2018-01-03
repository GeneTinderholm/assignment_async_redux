import {combineReducers} from "redux";

import {SERVER_FETCH, SERVER_SUCCESS, SERVER_FAIL} from "./actions";

export const initialState = {
  isFetching: false,
  books:[],
  error: false
};

export function appReducer(state = initialState, action) {
  switch (action.type) {

    case SERVER_FETCH:
      return {
        ...state,
        isFetching: true,
        books: []
      };
    case SERVER_SUCCESS:
      return{
        ...state,
        isFetching: false,
        books: action.data.books,
        error: false
      }
    case SERVER_FAIL:
      return{
        ...state,
        isFetching: false,
        books: [],
        error: action.error
      }

    default:
      return state;
  }
}


