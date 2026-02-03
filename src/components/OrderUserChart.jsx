import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchWeeklyStats } from "../api/dashboardApi";
import toast from "react-hot-toast";

const DashboardChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchWeeklyStats();
        setData(res.data.data);
      } catch (err) {
        toast.error("Failed to load dashboard stats");
        console.log(err.response?.data || err.message);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-black mb-4">
        Weekly Users vs Orders
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />

          {/* USERS LINE */}
          <Line
            type="monotone"
            dataKey="users"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          {/* ORDERS LINE */}
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
