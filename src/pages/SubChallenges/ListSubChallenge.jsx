import { useNavigate } from "react-router";
import Table from "../../components/Table";
import { SquarePen, Trash2, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import dumuProduct from "/home/nandan/Nandan/shdpixel/Breboot/Breboot-admin/src/assets/images/dumy_1.jpg"


const ListSubChallenge = () => {
  const navigate = useNavigate();
  const [subChallengeDetails, setSubChallengeDetails] = useState([
    { 
      id: 1, 
      name: "SubChallenge One", 
      shortDescription: "Short description one", 
      mainChallenge: "Challenge One", 
      reward: "150",
      status: "Active",
    },
    { id: 2, name: "SubChallenge Two", shortDescription: "Short description two", mainChallenge: "Challenge Two",reward: "300", status: "Inactive" },
  ]);

  const deleteSubChallenge = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this sub-challenge?");
    if (!confirmDelete) return;
    setSubChallengeDetails((prev) => prev.filter((item) => item.id !== id));
    alert("Sub-challenge deleted successfully");
  };

  const updateStatus = (row) => {
    const confirmChangeStatus = window.confirm("Are you sure you want to change the status?");
    if (!confirmChangeStatus) return;
    const newStatus = row.status === "Active" ? "Inactive" : "Active";
    setSubChallengeDetails((prev) =>
      prev.map((item) => (item.id === row.id ? { ...item, status: newStatus } : item))
    );
    alert("Status changed successfully");
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Short Description", accessor: "shortDescription" },
    { header: "Main Challenge", accessor: "mainChallenge" },
    { header: "Rewards", accessor: "reward" },
    { header: "Status", accessor: "status" },
  ];

  const actions = [
    {
      label: <SquarePen className="w-4 h-4" />, 
      handler: (row) => navigate("/subchallenges/add", { state: { subChallengeData: row } }),
      className: "text-green-500 hover:text-green-600",
    },
    {
      label: <Trash2 className="w-4 h-4" />, 
      handler: (row) => deleteSubChallenge(row.id),
      className: "text-red-500 hover:text-red-600",
    },
    {
      label: <RefreshCcw className="w-4 h-4" />, 
      handler: (row) => updateStatus(row),
      className: "text-blue-500 hover:text-blue-600",
    },
  ];

  return (
    <div className="p-6">
      <Helmet>
        <title>Breboot | Sub-Challenge List</title>
        <meta name="Sub-Challenge List" content="List of all sub-challenges" />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Sub-Challenge List</h1>
      {subChallengeDetails.length > 0 ? (
        <Table columns={columns} data={subChallengeDetails} globalActions={actions} />
      ) : (
        <div className="text-center text-gray-600 mt-10">No records found</div>
      )}
    </div>
  );
};

export default ListSubChallenge;
