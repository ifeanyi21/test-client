import { Alert, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Form } from "react-bootstrap";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch(`${process.env.REACT_APP_API_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    });

    const data = await response.json();

    if (data.status) {
      navigate("/order_items");
      localStorage.setItem("token", data.token);
    } else {
      setError(data.message);
    }
    setLoading(false);
  };
  return (
    <div className="container">
      <title>Login</title>
      <div className="row">
        <div className="col-lg-6">
          <div className="d-flex mb-10 mt-10 p-2">
            <div
              className="w-full bg-white rounded-sm p-3"
              style={{ textAlign: "center", height: "550px" }}
            >
              <div>
                <Form className={"px-4 py-2"} onSubmit={login}>
                  <h6 className="mb-5 text-center text-2xl">
                    <span className="text-blue-600">Hey,</span> welcome back!
                  </h6>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Username"
                    className="mb-4"
                  >
                    <Form.Control
                      onChange={handleEmail}
                      type="text"
                      placeholder="name@example.com"
                      required
                      disabled={loading}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-4"
                  >
                    <Form.Control
                      onChange={handlePassword}
                      type="password"
                      placeholder="Password"
                      required
                      disabled={loading}
                    />
                  </FloatingLabel>
                  <div className="d-grid gap-2 my-6">
                    {loading ? (
                      <Button size="large" disabled>
                        Signing in.....
                      </Button>
                    ) : (
                      <Button variant="contained" size="large" type="submit">
                        Sign In
                      </Button>
                    )}
                  </div>
                </Form>
              </div>
              <div>
                {error && (
                  <Alert sx={{ mt: 2 }} severity="error">
                    {error}
                  </Alert>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
