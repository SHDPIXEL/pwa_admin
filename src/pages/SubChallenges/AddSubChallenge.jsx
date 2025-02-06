import React, { useEffect, useState } from "react";
import { FileText, CheckCircle, Image } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";

const AddSubChallenge = () => {

  const location = useLocation();
  const subChallengeData = location.state?.subChallengeData;
  const navigate = useNavigate();

  const mainChallenges = [
    { id: 1, name: "Main Challenge 1" },
    { id: 2, name: "Main Challenge 2" },
    { id: 3, name: "Main Challenge 3" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    mainChallenge: "",
    descriptions: ["", "", ""],
    images: [null, null, null],
    reward: "",
    status: "",
  });

  useEffect(() => {
    if(subChallengeData) {
      setFormData({
        name: subChallengeData.name || "",
        shortDescription: subChallengeData.shortDescription || "",
        mainChallenge: subChallengeData.mainChallenge || "",
        descriptions: subChallengeData.descriptions || [],
        images: subChallengeData.images || [],
        reward: subChallengeData.reward || "",
        status: subChallengeData.reward || "",
      })
    }
  },[subChallengeData])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...formData.descriptions];
    updatedDescriptions[index] = value;
    setFormData({ ...formData, descriptions: updatedDescriptions });
  };

  const handleImageChange = (index, file) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = file;
    setFormData({ ...formData, images: updatedImages });
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>Breboot | Add Sub-Challenge</title>
        <meta name="Sub-Challenge Add" content="Add a new sub-challenge!" />
      </Helmet>
      
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        { subChallengeData ? "Edit Sub-Challenge" : "Add New Sub-Challenge"}
      </h1>
      <form className="space-y-6 max-w-2xl mx-auto">
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300"
            placeholder="Enter sub-challenge name"
            required
          />
        </div>

        {/* Short Description */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Short Description</label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300"
            placeholder="Enter short description"
            required
          />
        </div>

        {/* Main Challenge Selection */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Main Challenge</label>
          <select
            name="mainChallenge"
            value={formData.mainChallenge}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300"
            required
          >
            <option value="" disabled>Select Main Challenge</option>
            {mainChallenges.map((challenge) => (
              <option key={challenge.id} value={challenge.name}>{challenge.name}</option>
            ))}
          </select>
        </div>

        {/* Three Descriptions with Images */}
        {[0, 1, 2].map((index) => (
          <div key={index} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-400" />
              Description {index + 1}
            </label>
            <textarea
              value={formData.descriptions[index]}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
              className="p-3 rounded-lg border border-gray-300 mb-3"
              placeholder={`Enter description ${index + 1}`}
              required
            />
            <label className="text-sm font-medium text-gray-700 mt-2 flex items-center gap-2">
              <Image className="h-4 w-4 text-gray-400" />
              Upload Image {index + 1}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
              className="p-3 rounded-lg border border-gray-300"
            />
          </div>
        ))}

        {/* Reward */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Reward</label>
          <input
            type="number"
            name="reward"
            value={formData.reward}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300"
            placeholder="Enter reward Points"
            required
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            name="status"
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
          { subChallengeData ? "Update Sub-Challenge" :  "Add Sub-Challenge"}
        </button>
      </form>
    </div>
  );
};

export default AddSubChallenge;
