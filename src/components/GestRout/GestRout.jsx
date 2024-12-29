import { Navigate } from "react-router-dom";
import { UserContext } from "../context/User.context";
import { useContext } from "react";

export default function GestRout({ children }) {
  let { Token } = useContext(UserContext);
  if (!Token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
