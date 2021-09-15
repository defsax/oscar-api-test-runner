import { React, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UseSessionProvider } from "react-session-hook";

import ScheduledResults from "./components/ScheduledTestResults";
import IndependentResults from "./components/IndependentTestResults";
import Nav from "./components/Nav/nav";

function App() {
  const [token, setToken] = useState("");

  return (
    <Router>
      <UseSessionProvider>
        <Nav setToken={setToken} />
      </UseSessionProvider>
      <Switch>
        <Route exact path="/scheduled" render={() => <ScheduledResults />} />
        <Route
          exact
          path="/"
          render={() => <IndependentResults token={token} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
