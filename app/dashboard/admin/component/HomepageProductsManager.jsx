// app/dashboard/admin/component/HomepageProductsManager.jsx
"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  Switch,
  Button,
  FormControl,
  InputLabel,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import { Edit, Search, GripVertical } from "lucide-react";
import { apiService } from "../../../utils/apiService";

const sections = [
  { value: "featured", label: "Featured Products" },
  { value: "bestseller", label: "Best Sellers" },
  { value: "new", label: "New Arrivals" },
  { value: "trending", label: "Trending Now" },
  { value: "special", label: "Special Offers" },
];

const HomepageProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [displaySettings, setDisplaySettings] = useState({
    isDisplayed: false,
    priority: 0,
    section: "featured",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
  });

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.fetchadminProducts({
        page: currentPage,
        search: searchTerm,
      });
      setProducts(response.data.products);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHomepageSettings = async () => {
    try {
      setLoading(true);
      await apiService.updateHomepageSettings(
        selectedProduct._id,
        displaySettings
      );
      setSuccessMessage("Homepage settings updated successfully");
      setIsDialogOpen(false);
      fetchProducts(); // Refresh the list
    } catch (err) {
      setError("Failed to update homepage settings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setDisplaySettings({
      isDisplayed: product.displaySettings?.homepage?.isDisplayed || false,
      priority: product.displaySettings?.homepage?.priority || 0,
      section: product.displaySettings?.homepage?.section || "featured",
      startDate: product.displaySettings?.homepage?.startDate
        ? new Date(product.displaySettings.homepage.startDate)
            .toISOString()
            .split("T")[0]
        : new Date().toISOString().split("T")[0],
      endDate: product.displaySettings?.homepage?.endDate
        ? new Date(product.displaySettings.homepage.endDate)
            .toISOString()
            .split("T")[0]
        : "",
    });
    setIsDialogOpen(true);
  };

  const handleProductReorder = async (sourceIndex, destinationIndex) => {
    const reorderedProducts = Array.from(products);
    const [movedProduct] = reorderedProducts.splice(sourceIndex, 1);
    reorderedProducts.splice(destinationIndex, 0, movedProduct);

    // Update priorities based on new order
    const updatedProducts = reorderedProducts.map((product, index) => ({
      ...product,
      displaySettings: {
        ...product.displaySettings,
        homepage: {
          ...product.displaySettings?.homepage,
          priority: reorderedProducts.length - index,
        },
      },
    }));

    setProducts(updatedProducts);

    // Update priorities in the backend
    try {
      await fetch("/api/admin/products/reorder", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: updatedProducts.map((p) => ({
            id: p._id,
            priority: p.displaySettings.homepage.priority,
          })),
        }),
      });
    } catch (err) {
      setError("Failed to update product order");
      fetchProducts(); // Revert to original order
    }
  };

  return (
    <Box className="min-h-screen bg-gray-50 p-6">
      <Card className="mb-6 shadow-sm">
        <CardContent>
          <Typography variant="h5" className="font-semibold text-gray-800 mb-4">
            Homepage Products Manager
          </Typography>

          <Grid container spacing={3} className="mb-6">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Search className="text-gray-400 mr-2" size={20} />
                  ),
                }}
              />
            </Grid>
          </Grid>

          <div className="space-y-3">
            {products.map((product, index) => (
              <Card
                key={product._id}
                className="mb-3 hover:shadow-md transition-shadow"
              >
                <CardContent className="flex items-center justify-between">
                  <div className="cursor-move mr-4">
                    <GripVertical className="text-gray-400" />
                  </div>

                  <div className="flex-1">
                    <Typography
                      variant="h6"
                      className="font-medium text-gray-800"
                    >
                      {product.name}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {product.brand}
                    </Typography>
                  </div>

                  <div className="flex items-center space-x-4">
                    {product.displaySettings?.homepage?.isDisplayed && (
                      <Chip
                        label={
                          sections.find(
                            (s) =>
                              s.value ===
                              product.displaySettings.homepage.section
                          )?.label
                        }
                        color="primary"
                        size="small"
                      />
                    )}
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Edit size={18} />}
                      onClick={() => handleProductSelect(product)}
                    >
                      Edit Display
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="font-semibold">
          Edit Homepage Display Settings
        </DialogTitle>
        <DialogContent>
          <Box className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <Typography variant="body1">Show on Homepage</Typography>
              <Switch
                checked={displaySettings.isDisplayed}
                onChange={(e) =>
                  setDisplaySettings({
                    ...displaySettings,
                    isDisplayed: e.target.checked,
                  })
                }
              />
            </div>

            <FormControl fullWidth>
              <InputLabel>Section</InputLabel>
              <Select
                value={displaySettings.section}
                onChange={(e) =>
                  setDisplaySettings({
                    ...displaySettings,
                    section: e.target.value,
                  })
                }
                label="Section"
              >
                {sections.map((section) => (
                  <MenuItem key={section.value} value={section.value}>
                    {section.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              type="number"
              label="Display Priority"
              value={displaySettings.priority}
              onChange={(e) =>
                setDisplaySettings({
                  ...displaySettings,
                  priority: parseInt(e.target.value),
                })
              }
              InputProps={{ inputProps: { min: 0, max: 100 } }}
            />

            <div className="grid grid-cols-2 gap-4">
              <TextField
                type="date"
                label="Start Date"
                value={displaySettings.startDate}
                onChange={(e) =>
                  setDisplaySettings({
                    ...displaySettings,
                    startDate: e.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                type="date"
                label="End Date"
                value={displaySettings.endDate}
                onChange={(e) =>
                  setDisplaySettings({
                    ...displaySettings,
                    endDate: e.target.value,
                  })
                }
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleUpdateHomepageSettings}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {error && (
        <Alert severity="error" className="mt-4" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert
          severity="success"
          className="mt-4"
          onClose={() => setSuccessMessage(null)}
        >
          {successMessage}
        </Alert>
      )}
    </Box>
  );
};

export default HomepageProductsManager;
