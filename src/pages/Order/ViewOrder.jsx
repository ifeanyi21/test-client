import { Button, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../components/Modal/Modal";

function ViewOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [productInfo, setProductInfo] = useState({});
  const [loading, setLoading] = useState(true);

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
      setProductInfo(data.productInfo);
      setLoading(false);
    } else {
      navigate("/order_items");
    }
  }, [id, navigate]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);
  return (
    <div className="container">
      <title>View Order</title>
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
          <h4 className="mb-8">
            <span className="font-extrabold">OrderId</span>: {order.order_id}
          </h4>

          <div className="row text-lg text-left">
            <div className="col-lg-6 mb-8">
              <span className="text-sky-400 font-bold">Category</span>:{" "}
              {productInfo.product_category_name}
            </div>
            <div className="col-lg-6 mb-8">
              <span className="text-sky-400 font-bold">Price</span>:{" "}
              {order.price}
            </div>
            <div className="col-lg-6 mb-8">
              <span className="text-sky-400 font-bold">Date</span>:{" "}
              {order.shipping_limit_date}
            </div>
            <div className="col-lg-6 mb-8">
              <span className="text-sky-400 font-bold">Freight Value</span>:{" "}
              {order.freight_value}
            </div>
            <div className="col-lg-6 mb-8">
              <span className="text-sky-400 font-bold">Weight</span>:{" "}
              {productInfo.product_weight_g} grams
            </div>
            <div className="col-lg-6 mb-8">
              <span className="text-sky-400 font-bold">Height</span>:{" "}
              {productInfo.product_height_cm} cm
            </div>
            <div className="col-lg-6 mb-8">
              <span className="text-sky-400 font-bold">Length</span>:{" "}
              {productInfo.product_length_cm} cm
            </div>
            <div className="col-lg-6 mb-8">
              <span className="text-sky-400 font-bold">Width</span>:{" "}
              {productInfo.product_width_cm} cm
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <Button
              onClick={() => navigate(`/order_items/edit/${id}`)}
              sx={{ mr: 2 }}
              variant="contained"
            >
              Edit Order
            </Button>
            <DeleteConfirmation id={id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewOrder;
