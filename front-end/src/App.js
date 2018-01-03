import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const SearchBar = () =>{
  return(
    <form>
    <div className="form-group">
      <input type="text" name="search" />
    </div>
    {
      // <input className="btn btn-primary" type="submit" name="submit" />
    }
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <SearchBar />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
