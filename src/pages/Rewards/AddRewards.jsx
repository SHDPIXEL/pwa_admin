import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { FileText, CheckCircle, Image as ImageIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";

const AddRewards = () => {
  const location = useLocation();
  const RewardData = location.state?.RewardData;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    points: "",
    description: "",
    status: "",
    image: "",
  });

  useEffect(() => {
    if (RewardData) {
      setFormData({
        name: RewardData.name || "",
        points: RewardData.points || "",
        description: RewardData.description || "",
        status: RewardData.status || "",
        image: RewardData.image || "",
      });
    }
  }, [RewardData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>Breboot | Add Reward</title>
        <meta name="Challenge Add" content="Add a new challenge!" />
      </Helmet>
      
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        {RewardData ? "Edit Reward" : "Add New Reward"}
      </h1>
      <form className="space-y-6 max-w-2xl mx-auto">
        {/* Product Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-gray-400" />
            Reward Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300"
            placeholder="Enter reward name"
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
            placeholder="Enter reward description"
            required
          />
        </div>

        {/* Points */}
        <div className="flex flex-col">
          <label htmlFor="points" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-gray-400" />
            Points
          </label>
          <input
            type="number"
            name="points"
            id="points"
            value={formData.points}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300"
            placeholder="Enter points"
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

        {/* Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-gray-400" />
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="p-3 rounded-lg border border-gray-300"
            required
          />
          {formData.image && <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
        </div>

        {/* Submit Button */}
        <button type="submit" className="px-6 py-3 w-full bg-black text-white rounded-lg">
          {RewardData ? "Update Reward" : "Add Reward"}
        </button>
      </form>
    </div>
  );
};

export default AddRewards;