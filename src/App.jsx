import { React, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ScheduledResults from "./components/ScheduledTestResults";
import IndependentResults from "./components/IndependentTestResults";
import Nav from "./components/Nav/nav";

function App() {
  const [token, setToken] = useState("");

  return (
    <div>
      <Router>
        <Nav setToken={setToken} />
        <Switch>
          <Route exact path="/scheduled" render={() => <ScheduledResults />} />
          <Route
            exact
            path="/"
            render={() => <IndependentResults token={token} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
