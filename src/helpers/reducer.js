export const reducer = (state, action) => {
  switch (action.type) {
    case "DEVLOGIN":
      localStorage.setItem("user", action.payload.profile.email);
      localStorage.setItem("dev-token", action.payload.profile.jwt);
      localStorage.setItem("providerNo", action.payload.providerNo);

      return {
        ...state,
        user: action.payload.profile.email,
        dev: {
          isAuthenticated: true,
          token: action.payload.profile.jwt,
          provNo: action.payload.providerNo,
        },
      };

    case "STAGINGLOGIN":
      localStorage.setItem("user", action.payload.profile.email);
      localStorage.setItem("staging-token", action.payload.profile.jwt);
      localStorage.setItem("providerNo", action.payload.providerNo);

      return {
        ...state,
        user: action.payload.profile.email,
        staging: {
          isAuthenticated: true,
          token: action.payload.profile.jwt,
          provNo: action.payload.providerNo,
        },
      };

    case "REFRESH":
      let devAuth = false;
      let stagingAuth = false;
      if (action.payload.devJWT) devAuth = true;
      if (action.payload.stagingJWT) stagingAuth = true;
      return {
        ...state,
        user: action.payload.email,
        dev: {
          isAuthenticated: devAuth,
          token: action.payload.devJWT,
          provNo: action.payload.provNo,
        },
        staging: {
          isAuthenticated: stagingAuth,
          token: action.payload.jwt,
          provNo: action.payload.provNo,
        },
      };

    // case "ADDAPIS":
    //   return { ...state, apis: action.payload.apis };

    // case "ADDRESULT":
    //   const results = state.apis.map((api) => {
    //     if (api.id === action.payload.id) {
    //       return { ...api, result: action.payload.result };
    //     }

    //     return api;
    //   });
    //   return { ...state, apis: results };

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
