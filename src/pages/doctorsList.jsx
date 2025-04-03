import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Table from "../components/Table";
import { XCircle, CheckCircle } from "lucide-react";
import API from "../lib/utils";
import { Toaster, toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const DoctorsList = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchChallengeForms = async () => {
      try {
        const response = await API.get("/admin/users");
        console.log(response.data.users)
        const parsedata = response.data.users.reverse();
        const doctors = parsedata.filter(
            (user) => user.userType === "Doctor"
          );
        setDoctors(doctors);
      } catch (error) {
        console.error("Error fetching challenge forms:", error);
        toast.error("Failed to fetch challenge forms.", {
          position: "top-right",
        });
      }
    };
    fetchChallengeForms();
  }, []);
  

  // Table columns
  const columns = [
    { header: "Refferal Code", accessor: "code" },
    { header: "Name", accessor: "name" },
    { header: "Phone-Number", accessor: "phone" },
    { header: "Email", accessor: "email" },
    { header: "Gender", accessor: "gender" },
    { header: "Points", accessor: "points" },
    { header: "State", accessor: "state" },
    { header: "Status", accessor: "isVerified" },
  ];


  return (
    <div className="p-6">
      <Toaster position="top-right" autoClose={3000} />
      <Helmet>
        <title>Breboot | Doctor's List</title>
        <meta name="Week List" content="List of all Weeks" />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Doctor's List</h1>
      {doctors.length > 0 ? (
        <Table columns={columns} data={doctors}/>
      ) : (
        <div className="text-center text-gray-600 mt-10">No records found</div>
      )}
    </div>
  );
};

export default DoctorsList;
