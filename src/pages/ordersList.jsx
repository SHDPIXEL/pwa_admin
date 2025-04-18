import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Table from "../components/Table";
import { Download } from "lucide-react";
import API from "../lib/utils";
import { Toaster, toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { BASE_URL } from "../lib/utils";

const OrdersList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchChallengeForms = async () => {
      try {
        const response = await API.get("/admin/getOrders");
        console.log("Fetched Orders Data:", response.data);

        // Ensure address is formatted in frontend (if needed)
        const formattedOrders = response.data.orders.map((order) => ({
          ...order,
          address:
            typeof order.address === "string"
              ? order.address // Use as is if backend is fixed
              : [
                  order.address?.address || "",
                  order.address?.city || "",
                  order.address?.state || "",
                  order.address?.pincode || "",
                  order.address?.landMark || "",
                ]
                  .filter(Boolean)
                  .join(", "),
        }));

        setOrders(formattedOrders.reverse());
      } catch (error) {
        console.error("Error fetching payment invoices:", error);
        toast.error("No payment invoices found.", {
          position: "top-right",
        });
      }
    };

    fetchChallengeForms();
  }, []);

  const columns = [
    { header: "Name", accessor: "userName" },
    { header: "State", accessor: "userState" },
    { header: "Order Id", accessor: "orderId" },
    { header: "Quantity", accessor: "quantity" },
    { header: "Status", accessor: "status" },
    { header: "Order Date", accessor: "createdAt" },
    { header: "Status", accessor: "status" },
  ];

  return (
    <div className="p-6">
      <Toaster position="top-right" autoClose={3000} />
      <Helmet>
        <title>Breboot | Order's Invoice List</title>
        <meta name="Week List" content="List of all Weeks" />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Order's Invoice List
      </h1>
      {orders.length > 0 ? (
        <Table columns={columns} data={orders} />
      ) : (
        <div className="text-center text-gray-600 mt-10">No records found</div>
      )}
    </div>
  );
};

export default OrdersList;
