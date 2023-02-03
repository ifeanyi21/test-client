import { Backdrop, Button, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(true);
  const [backDrop, setBackDrop] = useState(false);

  const getUserInfo = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}account`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    if (data.status) {
      setUser(data.foundUser);
      setCity(data.foundUser.seller_city);
      setState(data.foundUser.seller_state);
      setLoading(false);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleState = (e) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackDrop(true);

    const response = await fetch(`${process.env.REACT_APP_API_URL}account`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        city,
        state,
      }),
    });
    const data = await response.json();

    if (data.status) {
      setBackDrop(false);
    } else {
      navigate("/");
    }
  };

  return (
    <div style={{ marginTop: 10 }} className="container">
      <title>Account</title>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="flex">
            <button onClick={() => navigate(-1)} className="mr-3">
              <FaChevronLeft color="#1976d2" fontSize={28} />
            </button>
          </div>
          <h3 className="mb-8">My Account</h3>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 mb-8">
                <FloatingLabel
                  controlId="floatingInput"
                  label="City"
                  className="mb-4"
                >
                  <Form.Control
                    value={city}
                    onChange={handleCity}
                    type="text"
                    placeholder="name@example.com"
                    required
                    disabled={loading}
                  />
                </FloatingLabel>
              </div>
              <div className="col-lg-6 mb-8">
                <FloatingLabel
                  controlId="floatingInput"
                  label="State"
                  className="mb-4"
                >
                  <Form.Control
                    value={state}
                    onChange={handleState}
                    name={"price"}
                    type="text"
                    placeholder="name@example.com"
                    required
                    disabled={loading}
                  />
                </FloatingLabel>
              </div>
              <div className="col-lg-6 mb-8">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Zip Code"
                  className="mb-4"
                >
                  <Form.Control
                    value={user.seller_zip_code_prefix}
                    type="text"
                    placeholder="name@example.com"
                    required
                    disabled={true}
                  />
                </FloatingLabel>
              </div>
              <div className="col-lg-6 mb-8">
                <FloatingLabel
                  controlId="floatingInput"
                  label="ID"
                  className="mb-4"
                >
                  <Form.Control
                    value={user.seller_id}
                    type="text"
                    placeholder="name@example.com"
                    required
                    disabled={true}
                  />
                </FloatingLabel>
              </div>
              <div className="col-lg-12">
                <Button type="submit" variant="contained">
                  Save Changes
                </Button>
              </div>
            </div>
          </Form>
          <div>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={backDrop}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        </>
      )}
    </div>
  );
}

export default Account;
