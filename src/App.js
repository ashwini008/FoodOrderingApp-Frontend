import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Details from "./screens/details/Details";
import Home from './screens/home/Home';
import Checkout from './screens/checkout/Checkout';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircle, faRupeeSign, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStopCircle } from "@fortawesome/free-regular-svg-icons";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/restaurant/:id" component={Details} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
}

library.add(faCircle, faRupeeSign, faStar, faStopCircle);

export default App;
