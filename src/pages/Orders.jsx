import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TfiPackage } from "react-icons/tfi";

import { backendUrl, currency } from "../App";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: e.target.value,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div className="">
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <TfiPackage className="ml-2 mt-2 md:mt-0 md:ml-0 text-[30px]" />
            <div className="">
              <div className="">
                {order.items.map((item, index) => {
                  /* console.log "response.data" inside fetchAllOrders() to see what "order.items"  array contain. This is to check if the individual item inside items array is the only one and if so, the "if" condition is executed. Basically, the purpose is it make sure we add commas (,) after each product inside the items array */
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-2 md:py-0" key={index}>
                        {item.name} x {item.quantity}{" "}
                        <span className="mt-2">{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-2 md:py-0" key={index}>
                        {item.name} x {item.quantity}{" "}
                        <span className="mt-2">{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium text-black">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>

            <div className="">
              <p className="text-sm sm:text-[15px] mt-2 md:mt-0">
                Items : {order.items.length}
              </p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px] ml-2 md:ml-0 text-[#f01e5a] font-bold">
              {currency}
              {order.amount} /=
            </p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="p-2 font-semibold mb-3 md:mb-0"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
