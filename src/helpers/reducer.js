export const reducer = (state, action) => {
  switch (action.type) {
    case "DEVLOGIN":
      console.log(action.payload.profile.userID);
      localStorage.setItem("id", action.payload.profile.userID);
      localStorage.setItem("user", action.payload.profile.email);
      localStorage.setItem("dev-token", action.payload.profile.jwt);
      localStorage.setItem("providerNo", action.payload.providerNo);

      return {
        ...state,
        user: action.payload.profile.email,
        dev: {
          isAuthenticated: true,
          token: action.payload.profile.jwt,
          id: action.payload.profile.userID,
          provNo: action.payload.providerNo,
        },
      };

    case "STAGINGLOGIN":
      localStorage.setItem("id", action.payload.profile.userID);
      localStorage.setItem("user", action.payload.profile.email);
      localStorage.setItem("staging-token", action.payload.profile.jwt);
      localStorage.setItem("providerNo", action.payload.providerNo);

      return {
        ...state,
        user: action.payload.profile.email,
        staging: {
          isAuthenticated: true,
          token: action.payload.profile.jwt,
          id: action.payload.profile.userID,
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
          id: action.payload.userID,
          provNo: action.payload.provNo,
        },
        staging: {
          isAuthenticated: stagingAuth,
          token: action.payload.jwt,
          id: action.payload.userID,
          provNo: action.payload.provNo,
        },
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        dev: { isAuthenticated: false, token: null, id: null, provNo: null },
        staging: {
          isAuthenticated: false,
          token: null,
          id: null,
          provNo: null,
        },
        user: null,
      };
    default:
      return state;
  }
};
