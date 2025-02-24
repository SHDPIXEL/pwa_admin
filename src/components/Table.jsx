import React from "react";
import { BASE_URL } from "../lib/utils";

const validAccessors = ["images", "image", "product_image"];

const Table = ({ columns, data, globalActions, toggleInStock }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200 bg-white shadow-md rounded-lg md:text-sm text-xs">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 font-semibold uppercase tracking-wider">
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-center border-b border-gray-200"
              >
                {column.header}
              </th>
            ))}
            {globalActions && (
              <th className="px-6 py-3 border-b text-center border-gray-200">
                Actions
              </th>
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`hover:bg-gray-50 ${
                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 border-b text-center border-gray-200 text-gray-700"
                >
                  {renderCellContent(column, row, toggleInStock)}
                </td>
              ))}

              {globalActions && (
                <td className="px-6 py-4 border-b text-center border-gray-200 text-gray-700">
                  <div className="flex gap-2">
                    {globalActions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => action.handler(row)}
                        className={`px-3 py-1 text-sm rounded-md ${action.className}`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper function to render cell content based on column type
const renderCellContent = (column, row, toggleInStock) => {
  const value = row[column.accessor];

  // Render checkbox for inStock column
  if (column.accessor === "inStock") {
    return (
      <div className="flex justify-center">
        <input
          type="checkbox"
          checked={row.inStock === true}
          onChange={() => toggleInStock(row)}
          className="w-5 h-5 cursor-pointer appearance-none border border-gray-400 rounded-full 
                     checked:bg-[#f8bd77] checked:border-[#545051] 
                     relative flex items-center justify-center transition-all duration-200 hover:scale-105
                     before:content-['✔'] before:absolute before:text-[#545051] before:font-bold before:text-xs 
                     before:opacity-0 checked:before:opacity-100"
        />
      </div>
    );
  }

  if (column.accessor === "product_image" && value) {
    const cleanedValue = value.replace(/^"|"$/g, "");
    const imageUrl = `${BASE_URL}/${cleanedValue}`;
    return (
      <img
        key="1"
        src={imageUrl}
        alt={`Product Image`}
        className="w-12 h-12 object-cover rounded-md border border-gray-200 hover:scale-105"
      />
    );
  }

  if (column.accessor === "reward_image" && value) {
    try {
      // Parse the array string into an actual array
      const parsedArray = JSON.parse(value);

      // Ensure it's an array and get the first item
      const cleanedValue = Array.isArray(parsedArray)
        ? parsedArray[0].replace(/^"|"$/g, "")
        : "";

      // Construct the correct image URL
      const imageUrl = `${BASE_URL}/${cleanedValue}`;

      return (
        <img
          key="1"
          src={imageUrl}
          alt="Reward Image"
          className="w-12 h-12 object-cover rounded-md border border-gray-200 hover:scale-105"
        />
      );
    } catch (error) {
      console.error("Invalid image data:", value, error);
      return null; // Return nothing if parsing fails
    }
  }

  if (column.accessor === "challenge_images" && Array.isArray(value)) {
    return (
      <div className="flex space-x-2">
        {value.map((imgSrc, index) => {
          const cleanedValue = imgSrc.replace(/^"|"$/g, ""); // Remove extra quotes if needed
          const imageUrl = `${BASE_URL}/${cleanedValue}`;
  
          return (
            <img
              key={index}
              src={imageUrl}
              alt={`Challenge Image ${index + 1}`}
              className="w-12 h-12 object-cover rounded-md border border-gray-200 hover:scale-105"
            />
          );
        })}
      </div>
    );
  }
  
  

  // Handle tags
  if (column.accessor === "tags" && Array.isArray(value)) {
    return (
      <div className="flex flex-wrap gap-2">
        {value.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-[#333] text-white rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }

  // Handle images
  if (validAccessors.includes(column.accessor) && value) {
    return (
      <img
        src={value}
        alt="Image"
        className="w-12 h-12 object-cover rounded-md border border-gray-200"
      />
    );
  }

  // Handle descriptions
  if (column.accessor === "description") {
    return (
      <p className="text-gray-600 text-sm truncate max-w-xs" title={value}>
        {value}
      </p>
    );
  }

  // Default rendering for other columns
  return typeof value === "function" ? value(row) : value;
};

export default Table;
