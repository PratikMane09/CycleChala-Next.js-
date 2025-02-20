import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
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
      const dataObj = JSON.parse(formData.get("data"));

      // Create new FormData object
      const updatedFormData = new FormData();
      updatedFormData.append("data", JSON.stringify(dataObj));

      // Get all images
      const images = formData.getAll("images");

      // Get and parse image metadata array
      const imageMetadataStr = formData.get("imageMetadata");
      const imageMetadata = imageMetadataStr
        ? JSON.parse(imageMetadataStr)
        : [];

      // Append images
      images.forEach((image, index) => {
        updatedFormData.append("images", image);
      });

      // Create a single array of metadata for all images
      const completeMetadataArray = images.map((image, index) => {
        const metadata = imageMetadata[index] || {};
        return {
          isPrimary: index === 0 && !dataObj.keepExistingImages,
          filename: image.name,
          alt: `${dataObj.name} - ${metadata.color?.name || "Image"} ${
            index + 1
          }`,
          color: metadata.color
            ? {
                name: metadata.color.name,
                hexCode: metadata.color.hexCode,
              }
            : null,
        };
      });

      // Append the complete metadata array as a single JSON string
      updatedFormData.append(
        "imageMetadata",
        JSON.stringify(completeMetadataArray)
      );

      if (selectedProduct) {
        await apiService.updateProduct(selectedProduct._id, updatedFormData);
      } else {
        await apiService.createProduct(updatedFormData);
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

    // Convert binary image data to displayable format
    if (productToEdit.images) {
      productToEdit.images = productToEdit.images.map((image) => ({
        ...image,
        // Keep original data for reference
        _id: image._id,
        isPrimary: image.isPrimary,
        color: image.color,
        alt: image.alt,
        contentType: image.contentType,
      }));
    }

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
