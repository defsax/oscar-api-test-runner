export const reducer = (state, action) => {
  switch (action.type) {
    case "DEVLOGIN":
      localStorage.setItem("user", action.payload.email);
      localStorage.setItem("dev-token", action.payload.jwt);

      return {
        ...state,
        user: action.payload.email,
        dev: { isAuthenticated: true, token: action.payload.jwt },
      };

    case "STAGINGLOGIN":
      localStorage.setItem("user", action.payload.email);
      localStorage.setItem("staging-token", action.payload.jwt);
      return {
        ...state,
        user: action.payload.email,
        staging: { isAuthenticated: true, token: action.payload.jwt },
      };

    case "REFRESH":
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

    case "ADDAPIS":
      return { ...state, apis: action.payload.apis };

    case "ADDRESULT":
      const results = state.apis.map((api) => {
        if (api.id === action.payload.id) {
          console.log("working");
          console.log(api.url);
          return { ...api, results: action.payload.result };
        }

        return api;
      });
      console.log(action.payload);
      return { ...state, apis: results };

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
