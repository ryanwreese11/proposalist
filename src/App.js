import React, { Component } from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom'

import routes from './routes'
import Header from './components/Header/Header'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className='App'>
          <Header />

        </div>
        {routes}
      </HashRouter>
    );
  }
}

export default App;
