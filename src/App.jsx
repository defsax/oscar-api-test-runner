import { React, useMemo, createContext, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ScheduledResults from "./components/ScheduledTests";
import EndpointTestMenu from "./components/EndpointTests";
import { reducer } from "./helpers/reducer";
import Nav from "./components/Nav/nav";

export const AuthContext = createContext("");

function App() {
  const [state, dispatch] = useReducer(reducer, {
    dev: { isAuthenticated: false, token: null },
    staging: { isAuthenticated: false, token: null },
    user: null,
    clientId:
      "76829730434-l9ujra2di0m69fppvpflfc5hfb3jpvn7.apps.googleusercontent.com",
  });

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
    console.log();
    const user = localStorage.getItem("user");
    const devJWT = localStorage.getItem("dev-token");
    const stagingJWT = localStorage.getItem("staging-token");

    dispatch({ type: "REFRESH", payload: { email: user, devJWT, stagingJWT } });
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/scheduled" render={() => <ScheduledResults />} />
          <Route exact path="/" render={() => <EndpointTestMenu />} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
