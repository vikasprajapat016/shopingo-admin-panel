import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchOrdersLast7Days } from "../api/dashboardApi";
import toast from "react-hot-toast";

export default function OrdersChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetchOrdersLast7Days();
        setData(res.data.data);
      } catch (err) {
        toast.error("Failed to load orders chart");
        console.log(err.response?.data || err.message);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="bg-gray-200 rounded-xl p-6 shadow">
      <h3 className="font-semibold text-xl mb-4">
        Orders (Last 7 Days)
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#4F46E5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
