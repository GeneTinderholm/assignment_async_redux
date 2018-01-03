import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const SearchBar = ({onSubmit}) =>{
  return(
    <form onSubmit={onSubmit}>
    <div className="form-group">
      <label>
        Authors
        <input className="form-control" type="radio" value="authors" name="type"/>
      </label>
      <label>
        Titles 
        <input className="form-control" type="radio" value="titles" name="type"/>
      </label>
    </div>
    <div className="form-group">
      <input type="text" name="search" />
    </div>
    {
      // <input className="btn btn-primary" type="submit" name="submit" />
    }
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default SearchBar;
