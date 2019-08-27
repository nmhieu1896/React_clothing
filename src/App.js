import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

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
        <Route exact path='/shop' component={ShopPage} />
        {/* <Route path='/hats/:hatsId' component={HatsItems} /> */}
    </div>
  );
}

export default App;
