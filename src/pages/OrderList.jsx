import { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../api/orderApi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const STATUS_TABS = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const res = await fetchOrders();
        setOrders(res.data.orders || []);
      } catch (err) {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      await updateOrderStatus(orderId, status);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, orderStatus: status } : order
        )
      );

      toast.success("Order status updated");
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter(
    (order) => order.orderStatus === activeTab
  );

  if (loading)
    return <p className="p-6 text-gray-300 text-center">Loading orders...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white mb-4">Orders</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {STATUS_TABS.map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === status
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {status} ({orders.filter((o) => o.orderStatus === status).length})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-800 rounded-lg">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-700 text-gray-200">
            <tr>
              <th className="p-3">Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border-b border-gray-700">
                  <td className="p-3 text-xs">{order._id.slice(-6)}</td>
                  <td>{order.user?.email || "Guest"}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>
                    <select
                      className="bg-gray-100 text-black p-2 rounded-md"
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      disabled={updatingId === order._id}
                    >
                      {STATUS_TABS.map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <Link
                      className="text-blue-400 hover:underline"
                      to={`/admin/orders/${order._id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-gray-400">
                  No {activeTab.toLowerCase()} orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
