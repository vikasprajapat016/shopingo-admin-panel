import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import toast from "react-hot-toast";
import api from "../api/axios";
import { FaBox, FaShopify, FaShoppingCart, FaTags, FaUser } from "react-icons/fa";
import StatCard from "../components/StatCard"; // ✅ correct import
import OrdersChart from "../components/OrderChart";
import OrderUserChart from "../components/OrderUserChart"
import RecentUsers from "../components/RecentUsers";
import RecentProducts from "../components/RecentProducts";
import LowProducts from "../components/LowProducts";
const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    categories: 0,
    monthlyUsers: 0,
    monthlyProducts: 0,
    monthlyOrders: 0,
    orders: 0,
  });

  const [recent, setRecent] = useState({
    recentUsers: [],
    recentProducts: [],
    lowStockProducts: [],

  });

   const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/stats");

        setStats({
          users: data.users,
          products: data.products,
          categories: data.categories,
          monthlyUsers: data.monthlyUsers,
          monthlyProducts: data.monthlyProducts,
          monthlyOrders: data.monthlyOrders,
          orders: data.orders,
        });
        console.log(data)
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    const fetchRecent = async () => {
      try {
        const {data} = await api.get("/admin/recent");

        setRecent({
          recentUsers: data.recentUsers,
          recentProducts: data.recentProducts,
          lowStockProducts: data.lowStockProducts,
        })
        console.log(data)
      } catch (error) {
        toast.error(" Failed to load recent data")
      }
    };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
     fetchRecent();
    fetchStats();
  }, []);

  return (
    <div className="px-6  ">
     

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
        <StatCard
          title="Users"
          
          value={stats.users}
          icon={<FaUser />}
          color="bg-blue-600 text-white"
          trend={20}
          loading={loading}
        />

        <StatCard
          title="Products"
          bg="bg-gray-500"
          value={stats.products}
          icon={<FaBox />}
          color="bg-green-600 text-white"
          trend={8}
          loading={loading}
        />

        <StatCard
          title="Categories"
          value={stats.categories}
          icon={<FaTags />}
          color="bg-purple-600 text-white"
          loading={loading}
        />


        <StatCard
          title="Orders"
          bg="bg-gray-500"
          value={stats.orders}
          icon={<FaShoppingCart />}
          color="bg-green-600 text-white"
          trend={20}
          loading={loading}
        />

      </div>

    <div className=" border-b border-gray-500 mt-10"></div>

      <div className=" mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">


      <div className=" ">
        <OrdersChart/>
      </div>

      <div className="">
        <OrderUserChart/>
      </div>
      </div>

      <div className="mt-20 text-center"><span className="font-bold text-4xl border-b-2 border-gray-950">Recent Activities</span>
         <div className=" flex flex-col justify-center items-center  ">{/*<span className="text-2xl font-semibold mt-10  mb-5 ">This Month Data</span> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8 w-full md:px-12 mt-10">
        <StatCard
        title='Users this month'
        value={stats.monthlyUsers}
        icon={<FaUser />}
        color="bg-blue-600 text-white"
        loading={loading}/>


        <StatCard
        title='Products this month'
        bg="bg-gray-500"
        value={stats.monthlyProducts}
        icon={<FaBox />}
        color="bg-green-600 text-white"
        loading={loading}/>

         <StatCard
        title='Orders this month'
        value={stats.monthlyOrders}
        icon={<FaShopify />}
        color="bg-green-600 text-white"
        loading={loading}/>
            
      </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-10">
        <RecentUsers users={recent.recentUsers}/>
        <RecentProducts products={recent.recentProducts}/>                
      </div>
        
    <div className="mt-10">
      <LowProducts products={recent.lowStockProducts}/>
    </div>
        
      </div>
      
    </div>
  );
};

export default Dashboard;
