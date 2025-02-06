import { useNavigate } from "react-router";
import Table from "../../components/Table";
import { SquarePen, Trash2, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const ListChallenge = () => {
  const navigate = useNavigate();
  const [challengeDetails, setChallengeDetails] = useState([
    { id: 1, title: "Challenge One", description: "Description for challenge one", status: "Active" },
    { id: 2, title: "Challenge Two", description: "Description for challenge two", status: "Inactive" },
  ]);

  const deleteChallenge = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this challenge?");
    if (!confirmDelete) return;
    setChallengeDetails((prev) => prev.filter((item) => item.id !== id));
    alert("Challenge deleted successfully");
  };

  const updateStatus = (row) => {
    const confirmChangeStatus = window.confirm("Are you sure you want to change the status?");
    if (!confirmChangeStatus) return;
    const newStatus = row.status === "Active" ? "Inactive" : "Active";
    setChallengeDetails((prev) =>
      prev.map((item) => (item.id === row.id ? { ...item, status: newStatus } : item))
    );
    alert("Status changed successfully");
  };

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Description", accessor: "description" },
    { header: "Status", accessor: "status" },
  ];

  const actions = [
    {
      label: <SquarePen className="w-4 h-4" />, 
      handler: (row) => navigate("/challenges/add", { state: { challengeData: row } }),
      className: "text-green-500 hover:text-green-600",
    },
    {
      label: <Trash2 className="w-4 h-4" />, 
      handler: (row) => deleteChallenge(row.id),
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
        <title>Breboot | Challenge List</title>
        <meta name="Challenge List" content="List of all challenges" />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Challenge List</h1>
      {challengeDetails.length > 0 ? (
        <Table columns={columns} data={challengeDetails} globalActions={actions} />
      ) : (
        <div className="text-center text-gray-600 mt-10">No records found</div>
      )}
    </div>
  );
};

export default ListChallenge;
