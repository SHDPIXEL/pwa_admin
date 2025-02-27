import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Table from "../components/Table";
import { XCircle, CheckCircle } from "lucide-react";
import API from "../lib/utils";
import { Toaster, toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchChallengeForms = async () => {
      try {
        const response = await API.get("/admin/users");
        console.log(response.data.users)
        const parsedata = response.data.users;
        const patient = parsedata.filter(
            (user) => user.userType === "OtherUser"
          );
          setPatients(patient);
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
        <title>Breboot | Challenge-Form List</title>
        <meta name="Week List" content="List of all Weeks" />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Challenge-Form List</h1>
      {patients.length > 0 ? (
        <Table columns={columns} data={patients}/>
      ) : (
        <div className="text-center text-gray-600 mt-10">No records found</div>
      )}
    </div>
  );
};

export default PatientList;
