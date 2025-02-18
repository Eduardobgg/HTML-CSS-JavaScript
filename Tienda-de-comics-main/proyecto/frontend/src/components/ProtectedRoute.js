import React, { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";
import authStore from "../stores/AuthStore";

const ProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = useState(authStore.getState());
  useEffect(() => {
    const listenerID = authStore.addChangeListener((newState) => {
      setAuthState(newState);
    });
    return () => {
      authStore.removeChangeListener(listenerID);
    };
  }, []);
  console.log(authState.isLoggedIn);
  return authState.isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
