import React from 'react';
import {connect} from 'react-redux';
import Display from '../components/Display';
import {
  serverFetch,
  serverSuccess,
  serverFail
} from '../actions.js';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    books: state.books || []
  }
}
const mapDispatchToProps = (dispatch) => {

  return {
    onClick: (e) => {

      let button = e.target;

      let search = button.id.split(" ").join("+");
      dispatch(serverFetch());
      console.log(button);
      fetch(`/titles/${search}`)
        .then((res) => {
          console.log(res)
          let body = res.json();
          return body
        })
        .then((body) => {
          console.log(body)
            dispatch(serverSuccess({books: body.GoodreadsResponse.book}))
        })
        .catch((err) => {
          dispatch(serverFail(err));
        })
    }
  }
}


const DisplayContainer = connect(mapStateToProps, mapDispatchToProps)(Display);

export default DisplayContainer;

