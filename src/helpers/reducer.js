export const reducer = (state, action) => {
  switch (action.type) {
    case "DEVLOGIN":
      localStorage.setItem("user", action.payload.profile.email);
      localStorage.setItem("dev-id", action.payload.profile.userID);
      localStorage.setItem("dev-token", action.payload.profile.jwt);
      localStorage.setItem("dev-providerNo", action.payload.profile.providerNo);

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
      localStorage.setItem("user", action.payload.profile.email);
      localStorage.setItem("staging-id", action.payload.profile.userID);
      localStorage.setItem("staging-token", action.payload.profile.jwt);
      localStorage.setItem(
        "staging-providerNo",
        action.payload.profile.providerNo
      );
      console.log(action.payload);
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
      return {
        ...state,
        user: action.payload.email,
        dev: {
          isAuthenticated: !!action.payload.devInfo.jwt,
          token: action.payload.devInfo.jwt,
          id: action.payload.devInfo.id,
          provNo: action.payload.devInfo.provNo,
        },
        staging: {
          isAuthenticated: !!action.payload.stagingInfo.jwt,
          token: action.payload.stagingInfo.jwt,
          id: action.payload.stagingInfo.id,
          provNo: action.payload.stagingInfo.provNo,
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
