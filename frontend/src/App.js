import React from 'react';
import './App.css';
import {BrowserRouter as Router , Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/Navigation';
import PassesList from './components/PassesList';
import CreatePass from './components/CreatePass';

function App() {
  return (
    <Router>
      <Navigation/>
      
      <Route path="/" exact component={PassesList} />
      <Route path="/edit/:id" component={CreatePass} />
      <Route path="/createPass" component={CreatePass} />
    </Router>
  );
}

export default App;
