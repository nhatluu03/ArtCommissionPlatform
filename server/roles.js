import AccessControl from "accesscontrol";
const ac = new AccessControl();

const roles = () => {
  ac.grant("client").deleteOwn("profile").updateOwn("profile").readOwn("profile").createOwn("profile");

  ac.grant("talent").extend("client").readAny("profile");

  ac.grant("admin")
    .extend("client")
    .updateAny("profile")
    .deleteAny("profile")
    .createAny("profile");

  return ac;
};

export default roles();
