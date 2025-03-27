import React, { useState } from "react";
import { BASE_URL } from "../lib/utils";
import { Download, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

const validAccessors = ["images", "image", "product_image"];

const Table = ({
  columns,
  data,
  globalActions,
  toggleInStock,
  handleDownloadInvoice,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
  const itemsPerPage = 10;

  const filteredData = data.filter((row) =>
    columns.some((column) =>
      row[column.accessor]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleRow = (rowIndex) => {
    setExpandedRows((prev) =>
      prev.includes(rowIndex)
        ? prev.filter((i) => i !== rowIndex)
        : [...prev, rowIndex]
    );
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded-md w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="min-w-full border-collapse border border-gray-200 bg-white shadow-sm rounded-lg md:text-sm text-xs">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 font-semibold uppercase tracking-wider">
            <th className="px-3 py-3 border-b text-center border-gray-200 w-10"></th> {/* Add this */}
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3 text-center border-b border-gray-200">
                {column.header}
              </th>
            ))}
            {globalActions && (
              <th className="px-6 py-3 border-b text-center border-gray-200">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr
                onClick={() => toggleRow(rowIndex)}
                className={`hover:bg-gray-50 cursor-pointer ${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
              >
                {/* Add this new <td> for the arrow */}
                <td className="px-3 py-4 border-b text-center border-gray-200">
                  {expandedRows.includes(rowIndex) ? (
                    <ChevronUp className="w-5 h-5 text-gray-600 cursor-pointer" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600 cursor-pointer" />
                  )}
                </td>

                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 border-b text-center border-gray-200 text-gray-700">
                    {renderCellContent(column, row, toggleInStock, handleDownloadInvoice)}
                  </td>
                ))}

                {globalActions && (
                  <td className="px-6 py-4 border-b border-gray-200 text-gray-700 text-center">
                    {row.paymentStatus === "Verified" ? (
                      <span>--</span>
                    ) : (
                      <div className="inline-flex gap-2">
                        {globalActions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              action.handler(row);
                            }}
                            disabled={
                              row.isVerified === 1 || row.isVerified === 2
                            }
                            className={`px-3 py-1 text-sm rounded-md ${action.className
                              } ${row.isVerified === true || row.isVerified === 2
                                ? "opacity-0 cursor-not-allowed"
                                : ""
                              }`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                )}
              </tr>
              {expandedRows.includes(rowIndex) && (
                <tr className="bg-gray-100">
                  <td colSpan={columns.length + (globalActions ? 2 : 1)} className="p-4"> {/* Update colSpan */}
                    <div className="text-gray-700">
                      <p><strong>Name:</strong> {row?.userName || "N/A"}</p>
                      <p><strong>Phone:</strong> {row?.userPhone || "N/A"}</p>
                      <p><strong>Email:</strong> {row.userPhone || "N/A"}</p>
                      <p><strong>Delivery Address:</strong> {row.address || "N/A"}</p>
                    </div>
                  </td>
                </tr>

              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50 flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 rounded-md disabled:opacity-50 flex items-center gap-1"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Helper function to render cell content based on column type (unchanged)
const renderCellContent = (
  column,
  row,
  toggleInStock,
  handleDownloadInvoice
) => {
  const value = row[column.accessor];

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
      const parsedArray = JSON.parse(value);
      const cleanedValue = Array.isArray(parsedArray)
        ? parsedArray[0].replace(/^"|"$/g, "")
        : "";
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
      return null;
    }
  }

  if (column.accessor === "challenge_images" && Array.isArray(value)) {
    return (
      <div className="grid grid-cols-2 justify-center items-center text-center space-x-2 w-30">
        {value
          .filter((imgSrc) => imgSrc)
          .map((imgSrc, index) => {
            const cleanedValue = imgSrc ? imgSrc.replace(/^"|"$/g, "") : "";
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

  if (column.accessor === "paymentScreenshot" && value) {
    try {
      const cleanedValue =
        typeof value === "string" ? value.replace(/^"|"$/g, "").trim() : "";
      if (!cleanedValue) {
        return <p className="text-gray-500">No proof available</p>;
      }
      const imageUrl = `${BASE_URL}/${cleanedValue}`;
      return (
        <div className="flex justify-center items-center">
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={imageUrl}
              alt="Payment Proof"
              className="w-12 h-12 object-cover rounded-md border border-gray-200 hover:scale-105 transition"
            />
          </a>
        </div>
      );
    } catch (error) {
      console.error("Error displaying payment proof:", error);
      return <p className="text-red-500">Invalid image format</p>;
    }
  }

  if (column.accessor === "createdAt") {
    const formattedDate = new Date(row.createdAt)
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      .replace("am", "AM")
      .replace("pm", "PM");
    return <div className="text-center text-gray-700">{formattedDate}</div>;
  }

  if (column.accessor === "mediaFiles" && value) {
    try {
      let mediaArray =
        typeof value === "string" && value.startsWith("[ W")
          ? JSON.parse(value)
          : Array.isArray(value)
            ? value
            : [value];
      const sanitizedMediaArray = mediaArray.map((item) =>
        item.replace(/\\/g, "/").trim()
      );

      if (row.mediaType === "image") {
        return (
          <div className="flex space-x-2">
            {sanitizedMediaArray.map((image, index) => {
              const finalImageUrl = `${BASE_URL}/${image}`;
              return (
                <img
                  key={index}
                  src={finalImageUrl}
                  alt={`Challenge-Form Image ${index + 1}`}
                  className="w-12 h-12 object-cover rounded-md border border-gray-200 hover:scale-105 transition-transform"
                />
              );
            })}
          </div>
        );
      } else if (row.mediaType === "video" && sanitizedMediaArray.length > 0) {
        return (
          <video
            key="video"
            src={`${BASE_URL}/${sanitizedMediaArray[0]}`}
            controls
            className="w-24 h-24 rounded-md border border-gray-200"
            onError={(e) => console.error("Video Load Error:", e.target.src)}
          />
        );
      }
    } catch (error) {
      console.error("Error parsing media files:", error);
      return <p className="text-red-500">Invalid media format</p>;
    }
  }

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

  if (column.accessor === "isVerified") {
    if (value === true)
      return <span className="text-green-500 font-semibold">Approved</span>;
    if (value === 2)
      return <span className="text-red-500 font-semibold">Rejected</span>;
    return <span className="text-yellow-500 font-semibold">Pending</span>;
  }

  if (column.accessor === "invoices") {
    return row.invoiceUrl ? (
      <a
        href={`${BASE_URL}${row.invoiceUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <Download className="w-5 h-5 inline-block" />
      </a>
    ) : (
      <span className="text-gray-400">No Invoice</span>
    );
  }

  if (validAccessors.includes(column.accessor) && value) {
    return (
      <img
        src={value}
        alt="Image"
        className="w-12 h-12 object-cover rounded-md border border-gray-200"
      />
    );
  }

  if (column.accessor === "description") {
    return (
      <p className="text-gray-600 text-sm truncate max-w-xs" title={value}>
        {value}
      </p>
    );
  }

  return typeof value === "function" ? value(row) : value;
};

export default Table;