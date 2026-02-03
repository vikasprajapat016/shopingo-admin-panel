import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderById, updateOrderStatus } from "../api/orderApi";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const res = await fetchOrderById(id);
        setOrder(res.data.order);
        setStatus(res.data.order.orderStatus);
      } catch {
        toast.error("Failed to load order");
      }
    };
    loadOrder();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updateOrderStatus(id, status);
      setOrder({ ...order, orderStatus: status });
      toast.success("Order status updated");
    } catch {
      toast.error("Update failed");
    }
  };

  if (!order)
    return <p className="p-6 text-gray-200 text-center">Loading...</p>;

  // Status badge colors
  const statusColor = {
    PENDING: "bg-yellow-500",
    SHIPPED: "bg-blue-500",
    DELIVERED: "bg-green-500",
    CANCELLED: "bg-red-500",
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-100 mb-4">Order Details</h1>

      {/* User Info */}
      <div className="bg-gray-600 p-5 rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <p className="text-gray-200">
            <span className="font-semibold">User:</span> {order.user?.email}
          </p>
          <p className="text-gray-200">
            <span className="font-semibold">Payment:</span> {order.paymentMethod}
          </p>
        </div>
        <div>
          <p className="text-gray-200">
            <span className="font-semibold">Total:</span> ₹{order.totalAmount}
          </p>
          <p className="text-gray-200">
            <span className="font-semibold">Date:</span>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-gray-600 rounded-lg overflow-x-auto shadow-md">
        <table className="w-full text-sm text-gray-200 border-collapse">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr
                key={i}
                className={`border-b border-gray-500 ${
                  i % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                }`}
              >
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${item.thumbnail}`}
                    alt={item.title}
                    className="w-12 h-12 rounded object-cover border border-gray-500"
                  />
                  <span className="line-clamp-2">{item.title}</span>
                </td>
                <td className="text-center">₹{item.price}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-center">₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Update */}
      <div className="bg-gray-600 p-5 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-200">Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-white font-medium ${
              statusColor[order.orderStatus] || "bg-gray-500"
            }`}
          >
            {order.orderStatus}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded focus:outline-none"
          >
            <option>PENDING</option>
            <option>SHIPPED</option>
            <option>DELIVERED</option>
            <option>CANCELLED</option>
          </select>
          <button
            onClick={handleUpdate}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
