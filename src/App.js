import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Restaurant from "./screens/restaurant/Restaurant";
import Home from './screens/home/Home';
import Checkout from './screens/checkout/Checkout';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/restaurant/:id" component={Restaurant} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
