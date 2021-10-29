import { React, useMemo, createContext, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ScheduledResults from "./components/ScheduledTests";
import EndpointTestMenu from "./components/EndpointTests";
import UserFlowMenu from "./components/UserFlowTests";
import StressMenu from "./components/StressTests";
import Nav from "./components/Nav/nav";
import NoMatch from "./components/404";
import { reducer } from "./helpers/reducer";

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
    // setResponse(res);
    const user = localStorage.getItem("user");
    const devInfo = {
      id: localStorage.getItem("dev-id"),
      jwt: localStorage.getItem("dev-token"),
      provNo: localStorage.getItem("dev-providerNo"),
    };

    const stagingInfo = {
      id: localStorage.getItem("staging-id"),
      jwt: localStorage.getItem("staging-token"),
      provNo: localStorage.getItem("staging-providerNo"),
    };

    dispatch({
      type: "REFRESH",
      payload: { email: user, devInfo, stagingInfo },
    });
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <EndpointTestMenu />
          </Route>
          <Route exact path="/scheduled" render={() => <ScheduledResults />} />
          <Route exact path="/userflow" render={() => <UserFlowMenu />} />
          <Route exact path="/stress" render={() => <StressMenu />} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
