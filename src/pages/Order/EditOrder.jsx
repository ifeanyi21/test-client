import { Backdrop, Button, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

function EditOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [productInfo, setProductInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState("");
  const [backDrop, setBackDrop] = useState(false);
  const [freightValue, setFreightValue] = useState("");

  const getOrder = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}order_items/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );

    const data = await response.json();
    if (data.status) {
      setOrder(data.foundOrder);
      setPrice(data.foundOrder.price);
      setFreightValue(data.foundOrder.freight_value);
      setProductInfo(data.productInfo);
      setLoading(false);
    } else {
      navigate("/order_items");
    }
  }, [id, navigate]);

  const handleFreight = (e) => {
    setFreightValue(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackDrop(true);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}order_items/edit/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          price,
          freightValue,
        }),
      }
    );

    const data = await response.json();

    if (data.status) {
      setBackDrop(false);
    } else {
      console.log("Error Occured");
    }
  };

  useEffect(() => {
    getOrder();
  }, [getOrder]);
  return (
    <div className="container">
      <title>Edit Order</title>
      {loading ? (
        <div className="mt-8">
          <CircularProgress />
        </div>
      ) : (
        <div style={{ marginTop: 10 }}>
          <div className="flex">
            <button onClick={() => navigate(-1)} className="mr-3">
              <FaChevronLeft color="#1976d2" fontSize={28} />
            </button>
          </div>
          <h3 className="mb-8">Edit Order: {order.order_id}</h3>

          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 mb-8">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Category"
                  className="mb-4"
                >
                  <Form.Control
                    value={productInfo.product_category_name}
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
                  label="Price"
                  className="mb-4"
                >
                  <Form.Control
                    value={price}
                    onChange={handlePrice}
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
                  label="Date"
                  className="mb-4"
                >
                  <Form.Control
                    value={order.shipping_limit_date}
                    name={"date"}
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
                  label="Freight Value"
                  className="mb-4"
                >
                  <Form.Control
                    value={freightValue}
                    onChange={handleFreight}
                    name={"freightValue"}
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
                  label="Weight"
                  className="mb-4"
                >
                  <Form.Control
                    value={productInfo.product_weight_g}
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
                  label="Height"
                  className="mb-4"
                >
                  <Form.Control
                    value={productInfo.product_height_cm}
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
                  label="Length"
                  className="mb-4"
                >
                  <Form.Control
                    value={productInfo.product_length_cm}
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
                  label="Width"
                  className="mb-4"
                >
                  <Form.Control
                    value={productInfo.product_width_cm}
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
        </div>
      )}
    </div>
  );
}

export default EditOrder;
