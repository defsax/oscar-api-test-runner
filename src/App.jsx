import {
  React,
  useMemo,
  useState,
  createContext,
  useReducer,
  useEffect,
} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { UseSessionProvider } from "react-session-hook";

import ScheduledResults from "./components/ScheduledTestResults";
import IndependentResults from "./components/IndependentTestResults";
import Nav from "./components/Nav/nav";

export const AuthContext = createContext("");

const reducer = (state, action) => {
  switch (action.type) {
    case "DEVLOGIN":
      console.log("Login dev dispatch action", action.payload.email);
      localStorage.setItem("user", action.payload.email);
      localStorage.setItem("dev-token", action.payload.jwt);

      return {
        ...state,
        user: action.payload.email,
        dev: { isAuthenticated: true, token: action.payload.jwt },
      };

    case "STAGINGLOGIN":
      console.log("Login staging dispatch action", action.payload.email);
      localStorage.setItem("user", action.payload.email);
      localStorage.setItem("staging-token", action.payload.jwt);
      return {
        ...state,
        user: action.payload.email,
        staging: { isAuthenticated: true, token: action.payload.jwt },
      };

    case "REFRESH":
      console.log("REFRESH type. payload:", action.payload);
      let devAuth = false;
      let stagingAuth = false;
      if (action.payload.devJWT) devAuth = true;
      if (action.payload.stagingJWT) stagingAuth = true;
      return {
        ...state,
        user: action.payload.email,
        dev: { isAuthenticated: devAuth, token: action.payload.devJWT },
        staging: { isAuthenticated: stagingAuth, token: action.payload.jwt },
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        dev: { isAuthenticated: false, token: null },
        staging: { isAuthenticated: false, token: null },
        user: null,
      };
    default:
      return state;
  }
};

function App() {
  const [token, setToken] = useState("");

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
    console.log(devJWT);
    console.log(stagingJWT);
    dispatch({ type: "REFRESH", payload: { email: user, devJWT, stagingJWT } });
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>
      <Router>
        {/* <UseSessionProvider> */}
        <Nav setToken={setToken} />

        {/* </UseSessionProvider> */}
        <Switch>
          <Route exact path="/scheduled" render={() => <ScheduledResults />} />
          <Route
            exact
            path="/"
            render={() => <IndependentResults token={token} />}
          />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
