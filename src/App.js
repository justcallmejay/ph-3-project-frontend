import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/Home'
import Shop from './components/Shop'
// import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route path="/shop">
                <Shop />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
