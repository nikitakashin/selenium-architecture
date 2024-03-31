import registration from "./tests/registration.js";
import logout from "./tests/logout.js";
import authorization from "./tests/authorization.js";

const describe = {
  "Registration Form Test": {
    ...registration,
    ...logout,
    ...authorization,
  },
};

export default describe;
