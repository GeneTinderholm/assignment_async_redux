import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  serverFetch,
  serverSuccess,
  serverFail
} from '../actions.js';
import {connect} from 'react-redux';
import SearchBar from '../components/SearchBar.js';
import serialize from 'form-serialize';

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (e) => {
      e.preventDefault();

      let form = e.target;
      const data = serialize(form, {hash: true});

      let {type, search} = data;

      dispatch(serverFetch());
      search = search.split(" ").join("+");

      fetch(`/${type}/${search}`)
        .then((res) => {
          console.log(res)
          let body = res.json();
          return body
        })
        .then((body) => {
          console.log(body)
          dispatch(serverSuccess(body));
        })
        .catch((err) => {
          dispatch(serverFail(err));
        })
    }
  }
};

const SearchBarContainer = connect(null, mapDispatchToProps)(SearchBar);

export default SearchBarContainer;
