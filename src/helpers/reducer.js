export const reducer = (state, action) => {
  switch (action.type) {
    case "DEVLOGIN":
      // console.log("Login dev dispatch action", action.payload.email);
      localStorage.setItem("user", action.payload.email);
      localStorage.setItem("dev-token", action.payload.jwt);

      return {
        ...state,
        user: action.payload.email,
        dev: { isAuthenticated: true, token: action.payload.jwt },
      };

    case "STAGINGLOGIN":
      // console.log("Login staging dispatch action", action.payload.email);
      localStorage.setItem("user", action.payload.email);
      localStorage.setItem("staging-token", action.payload.jwt);
      return {
        ...state,
        user: action.payload.email,
        staging: { isAuthenticated: true, token: action.payload.jwt },
      };

    case "REFRESH":
      // console.log("REFRESH type. payload:", action.payload);
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
