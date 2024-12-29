import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/User.context";
export default function ProutactedRout({ children }) {
  let { Token } = useContext(UserContext);
  if (Token) {
    return children;
  } else {
    return <Navigate to="login" />;
  }
}
