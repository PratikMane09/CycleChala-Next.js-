import React, { useState, useEffect } from "react";
import { Plus, Upload } from "lucide-react";
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { apiService } from "../../../utils/apiService.js";
import { ProductSearch } from "./ProductSearch.jsx";
import ProductForm from "./ProductForm.jsx";
import ProductList from "./ProductList.jsx";
import { Paginationn } from "./Paginationn.jsx";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [currentPage, filterCategory, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.fetchadminProducts({
        page: currentPage,
        search: searchTerm,
        category: filterCategory,
      });
      console.log("response", response);
      setProducts(response.data.products);
      setTotalPages(response.data.pagination.pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiService.fetchCategories(1, 100);
      setCategories(response.categories);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleImageConversion = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      // Handle image conversion to base64
      const images = formData.get("images");
      if (images) {
        const imageFiles = Array.from(images);
        const convertedImages = await Promise.all(
          imageFiles.map(async (file) => ({
            data: await handleImageConversion(file),
            contentType: file.type,
            filename: file.name,
          }))
        );

        const dataObj = JSON.parse(formData.get("data"));
        dataObj.images = convertedImages;
        formData.set("data", JSON.stringify(dataObj));
      }

      if (selectedProduct) {
        await apiService.updateProduct(selectedProduct._id, formData);
      } else {
        await apiService.createProduct(formData);
      }

      setShowForm(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await apiService.deleteProduct(id);
        fetchProducts();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (product) => {
    const productToEdit = JSON.parse(JSON.stringify(product));
    setSelectedProduct(productToEdit);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen mt-20 bg-gray-50">
      <Card>
        <CardHeader
          className="border-b border-gray-200 bg-white"
          title={
            <div className="flex items-center justify-between">
              <Typography
                variant="h5"
                className="font-sans font-bold text-gray-800"
                style={{ fontSize: "1.5rem" }}
              >
                Product Management
              </Typography>
              <div className="flex items-center gap-4">
                <ProductSearch
                  searchTerm={searchTerm}
                  onSearch={setSearchTerm}
                  categories={categories}
                  selectedCategory={filterCategory}
                  onCategoryChange={setFilterCategory}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    setShowForm(true);
                    setSelectedProduct(null);
                  }}
                  className="flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white transition-all hover:bg-sky-600 hover:shadow-md"
                >
                  <Plus className="h-5 w-5" />
                  Add Product
                </Button>
              </div>
            </div>
          }
        />

        <CardContent className="bg-white p-6">
          {error && (
            <Alert
              severity="error"
              className="mb-4"
              style={{ backgroundColor: "#fee2e2", color: "#991b1b" }}
            >
              {/* <AlertDescription>{error}</AlertDescription> */}
            </Alert>
          )}

          <ProductList
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <div className="mt-6 flex justify-center">
            <Paginationn
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "white",
            borderRadius: "0.5rem",
            padding: "1rem",
          },
        }}
      >
        <DialogTitle>
          <Typography
            variant="h6"
            component="div" // Change the component to 'div'
            className="font-sans font-bold text-gray-800"
          >
            {selectedProduct ? "Edit Product" : "Add New Product"}
          </Typography>
        </DialogTitle>
        <DialogContent className="mt-4">
          <ProductForm
            initialData={selectedProduct}
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setSelectedProduct(null);
            }}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Product;
