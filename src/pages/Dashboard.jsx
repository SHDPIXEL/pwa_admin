import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Users, Swords, Type, Stethoscope } from "lucide-react";
import API from "../lib/utils";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import renderActiveShape from "../components/pieChart";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const [doctorData, setDoctorsData] = useState();
  const [otherUsers, setOtherUsers] = useState();
  const [totalChallenges, setChallenges] = useState();
  const [totalRooms, SetTotalRooms] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [bookingChartData, setBookingChartData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/admin/users");
        const parsedata = response.data.data;
        // Count total users
        const totalUsers = parsedata.length;
        // Count users who are doctors
        const doctorCount = parsedata.filter(
          (user) => user.userType === "Doctor"
        ).length;
        setDoctorsData(doctorCount);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch dashboard data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/admin/users");
        const parsedata = response.data.data;
        // Count total users
        const totalUsers = parsedata.length;
        // Count users who are doctors
        const patientCount = parsedata.filter(
          (user) => user.userType === "OtherUser"
        ).length;
        setOtherUsers(patientCount);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch dashboard data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/admin/challenges");
        const parsedata = response.data;
        setChallenges(parsedata.length);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch dashboard data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const UserAgentPieCharData = [
    { name: "Doctors", value: doctorData || 0 },
    { name: "Patients", value: otherUsers || 0 },
  ];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const COLORS = ["#0088FE", "#00C49F"];

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
    {
      title: "Total Doctors",
      value: doctorData,
      icon: <Stethoscope className="w-5 h-5" />,
    },
    {
      title: "Total Patients",
      value: otherUsers,
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Total Challenges",
      value: totalChallenges,
      icon: <Swords className="w-5 h-5" />,
    },
    { title: "Total Redeem", value: 00, icon: <Type className="w-5 h-5" /> },
    {
      title: "Total Items Sold",
      value: 00,
      icon: <Type className="w-5 h-5" />,
    },
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
          <Card
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      {/* Pie Chart */}
      <div className="h-80 flex flex-col items-center justify-center shadow-sm bg-white p-6 space-y-5">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={UserAgentPieCharData}
              cx="50%"
              cy="50%"
              innerRadius={37}
              outerRadius={55}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {UserAgentPieCharData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <p className="font-bold text-gray-600 text-xl mt-2">
          Doctor's <span className="text-[#00C49F]">vs</span> Patient's
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
