import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { FileText,  CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const AddChallenge = () => {
  const location = useLocation();
  const challengeData = location.state?.challengeData;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (challengeData) {
      setFormData({
        title: challengeData.title || "",
        description: challengeData.description || "",
        status: challengeData.status || "",
      });
    }
  }, [challengeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>Breboot | Add Challenge</title>
        <meta name="Challenge Add" content="Add a new challenge!" />
      </Helmet>
      
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        {challengeData ? "Edit Challenge" : "Add New Challenge"}
      </h1>
      <form className="space-y-6 max-w-2xl mx-auto">
        {/* Challenge Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-gray-400" />
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300"
            placeholder="Enter challenge title"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-400" />
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300"
            placeholder="Enter challenge description"
            required
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-gray-400" />
            Status
          </label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300"
            required
          >
            <option value="" disabled>Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="px-6 py-3 w-full bg-black text-white rounded-lg">
          {challengeData ? "Update Challenge" : "Add Challenge"}
        </button>
      </form>
    </div>
  );
};

export default AddChallenge;
