import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let isNormal = false;
  let status = "";
  let email = "";
  let userId = "";
  let roles = [];

  if (token) {
    const decoded = jwtDecode(token);
    email = decoded.UserInfo.email;
    userId = decoded.UserInfo.userId;
    roles = decoded.UserInfo.roles;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");
    isNormal = roles.includes("Employee");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";
    if (isNormal) status = "User";
  }

  return { email, userId, roles, status, isManager, isAdmin };
};
export default useAuth;
