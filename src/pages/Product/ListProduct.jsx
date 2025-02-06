import { useNavigate } from "react-router";
import Table from "../../components/Table";
import { SquarePen, Trash2, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import dumuProduct from "/home/nandan/Nandan/shdpixel/Breboot/Breboot-admin/src/assets/images/dumy_1.jpg"


const ListProduct = () => {
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState([
    {
      id: 1,
      name: "Product One",
      description: "Description for product one",
      oldPrice: 100,
      newPrice: 80,
      image: dumuProduct,
      status: "Active",
    },
    {
      id: 2,
      name: "Product Two",
      description: "Description for product two",
      oldPrice: 150,
      newPrice: 120,
      image: dumuProduct,
      status: "Inactive"
    },
  ]);

  const deleteProduct = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    setProductDetails((prev) => prev.filter((item) => item.id !== id));
    alert("Product deleted successfully");
  };

  const updateStatus = (row) => {
    const confirmChangeStatus = window.confirm("Are you sure you want to change the status?");
    if (!confirmChangeStatus) return;
    const newStatus = row.status === "Active" ? "Inactive" : "Active";
    setProductDetails((prev) =>
      prev.map((item) => (item.id === row.id ? { ...item, status: newStatus } : item))
    );
    alert("Status changed successfully");
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Old Price", accessor: "oldPrice" },
    { header: "New Price", accessor: "newPrice" },
    { 
      header: "Image", 
      accessor: "image",
      Cell: ({ value }) => <img src={value} alt="Product" className="w-16 h-16 object-cover" />
    },
    {header: "Status", accessor: "status"}
  ];

  const actions = [
    {
      label: <SquarePen className="w-4 h-4" />, 
      handler: (row) => navigate("/product/add", { state: { productData: row } }),
      className: "text-green-500 hover:text-green-600",
    },
    {
      label: <Trash2 className="w-4 h-4" />, 
      handler: (row) => deleteProduct(row.id),
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
        <title>Breboot | Product List</title>
        <meta name="Product List" content="List of all products" />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Product List</h1>
      {productDetails.length > 0 ? (
        <Table columns={columns} data={productDetails} globalActions={actions} />
      ) : (
        <div className="text-center text-gray-600 mt-10">No records found</div>
      )}
    </div>
  );
};

export default ListProduct;
