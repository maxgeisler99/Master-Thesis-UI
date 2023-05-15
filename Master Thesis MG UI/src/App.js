import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar.jsx";
import ChartGeneral from "./components/common/ChartGeneral";
import NotFound from "./components/notFound";
import LiveChart from "./components/common/LiveChart.jsx";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/Chartgeneral" component={ChartGeneral} />
          <Route path="/liveChart" component={LiveChart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/liveChart" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
