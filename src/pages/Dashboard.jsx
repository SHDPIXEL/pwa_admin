import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Users, Calendar, Type } from "lucide-react";
// import API from "../lib/utils";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import renderActiveShape from "../components/pieCharShape";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const [data, setData] = useState();
  const [totalUsers, setTotalUsers] = useState();
  const [totalAgents, setTotalAgents] = useState();
  const [totalRooms, SetTotalRooms] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [bookingChartData, setBookingChartData] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await API.get("/admin/booking-details");
  //       const parsedata = response.data;
  //       setData(parsedata.length);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error(err);
  //       setError("Failed to fetch dashboard data.");
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await API.get("/admin/user");
  //       const parsedata = response.data;
  //       setTotalUsers(parsedata.length);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error(err);
  //       setError("Failed to fetch dashboard data.");
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await API.get("/admin/agent");
  //       const parsedata = response.data;
  //       setTotalAgents(parsedata.length);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error(err);
  //       setError("Failed to fetch dashboard data.");
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await API.get("/admin/room");
  //       const parsedata = response.data;
  //       SetTotalRooms(parsedata.length);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error(err);
  //       setError("Failed to fetch dashboard data.");
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchBookingChartData = async () => {
  //     const response = await API.get("admin/booking-details/graph");
  //     const data = response.data;
  //     setBookingChartData(data);
  //   }
  //   fetchBookingChartData()
  // },[])

  // const UserAgentPieCharData = [
  //   { name: "User", value: totalUsers || 0 },
  //   { name: "Agents", value: totalAgents || 0 },
  // ];

  // const onPieEnter = (_, index) => {
  //   setActiveIndex(index);
  // };

  // const COLORS = ["#0088FE", "#00C49F"];

  // const LinechartData = [
  //   { date: "2023-12-01", bookings: 30 },
  //   { date: "2023-12-02", bookings: 45 },
  //   { date: "2023-12-03", bookings: 60 },
  //   { date: "2023-12-04", bookings: 25 },
  //   { date: "2023-12-05", bookings: 75 },
  //   { date: "2023-12-06", bookings: 50 },
  //   { date: "2023-12-07", bookings: 90 },
  // ];

  // const DashboardItems = [
  //   { title: "Total Bookings", value: data || 0, icon: <Calendar className="w-5 h-5" /> },
  //   { title: "Total Users", value: totalUsers || 0, icon: <Users className="w-5 h-5" /> },
  //   { title: "Total Agents", value: totalAgents || 0, icon: <Users className="w-5 h-5" /> },
  //   { title: "Total Rooms", value: totalRooms || 0, icon: <Type className="w-5 h-5" /> },
  // ];

    const DashboardItems = [
    { title: "Total Doctors", value: 67 , icon: <Calendar className="w-5 h-5" /> },
    { title: "Total Patients", value: 156 , icon: <Users className="w-5 h-5" /> },
    { title: "Total Challenges", value: 25, icon: <Users className="w-5 h-5" /> },
    { title: "Total Redeem", value: 78, icon: <Type className="w-5 h-5" /> },
    { title: "Total Items Sold", value: 45, icon: <Type className="w-5 h-5" /> },

  ];

  // if (loading) {
  //   return <div className="text-center mt-10">Loading...</div>;
  // }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div>
      
      <Helmet>
        <title>Breboot | Dashboard</title>
        <meta name="Dachboard" content="Breboot Dashboard!" />
      </Helmet>


      {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-6 mt-20">
          {DashboardItems.map((item, index) => (
            <Card key={index} title={item.title} value={item.value} icon={item.icon} />
          ))}
        </div>
    </div>
  );
};

export default Dashboard;
