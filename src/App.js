import React, { Component } from 'react';
import {HomePage} from './pages/homepage/homepage.component';
import { Link, Route } from 'react-router-dom';
// import { Link } from 'react-router';

import './App.css';

const HatsPage = (props) => {
  console.log(props);
  return (
    <div>
      <h1>Hats Pages</h1>
    </div>
  )
}

function App() {
  return (
    <div>
        <Route exact path='/' component={HomePage} />
        {/* <HomePage/> */}
        <Route exact path='/shop/hats' component={HatsPage} />
        {/* <Route path='/hats/:hatsId' component={HatsItems} /> */}
    </div>
  );
}

export default App;
