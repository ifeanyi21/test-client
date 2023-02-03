import React, { useCallback, useContext, useEffect } from "react";
import Auth from "../services/store/store";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { ACTION_TYPES } from "../services/actions/actions";

function Layout({ children }) {
  const [, dispatch] = useContext(Auth);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const ValidateUser = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}account`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    const data = await response.json();

    if (!data.status) {
      dispatch({ type: ACTION_TYPES.LOGOUT, payload: { user: null } });
      localStorage.clear("token");
      navigate("/");
    } else {
      dispatch({ type: ACTION_TYPES.LOGIN, payload: { user: data.foundUser } });
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    ValidateUser();
  }, [ValidateUser, token]);
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

export default Layout;
