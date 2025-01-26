"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  IconButton,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  ArrowUpward,
  ArrowDownward,
  Image as ImageIcon,
} from "@mui/icons-material";
import { apiService } from "../../../utils/apiService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    categoryType: "general",
    ageGroup: {
      minAge: 0, // Initialize as numbers, not strings
      maxAge: 99,
    },
    gender: "unisex",
    professionalLevel: "beginner",
    featured: false,
    image: null,
    imageAlt: "",
    metadata: {
      isActive: true,
      displayOrder: 0,
      specifications: {
        frameSize: [],
        wheelSize: [],
        recommended: {
          height: { min: "", max: "" },
          weight: { min: "", max: "" },
        },
      },
    },
  });

  // Constants for form options
  const CATEGORY_TYPES = ["general", "age-group", "gender", "professional"];
  const GENDER_OPTIONS = ["male", "female", "unisex"];
  const PROFESSIONAL_LEVELS = [
    "beginner",
    "intermediate",
    "professional",
    "expert",
  ];
  const FRAME_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
  const WHEEL_SIZES = [
    '12"',
    '16"',
    '20"',
    '24"',
    '26"',
    '27.5"',
    '29"',
    "700c",
  ];

  useEffect(() => {
    fetchCategories();
  }, [page]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await apiService.fetchCategories(page);
      setCategories(data.categories);
      setTotalPages(data.pagination.pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Create a new FormData instance
      const formDataObj = new FormData();

      // Create a processed data object
      const processedData = {
        ...formData,
        ageGroup: {
          minAge: parseInt(formData.ageGroup.minAge),
          maxAge: parseInt(formData.ageGroup.maxAge),
        },
      };

      // Handle metadata separately
      if (processedData.metadata) {
        formDataObj.append("metadata", JSON.stringify(processedData.metadata));
      }

      // Handle image separately
      if (processedData.image) {
        formDataObj.append("image", processedData.image);
      }

      // Handle ageGroup separately
      formDataObj.append("ageGroup", JSON.stringify(processedData.ageGroup));

      // Append all other fields
      Object.keys(processedData).forEach((key) => {
        if (key !== "metadata" && key !== "image" && key !== "ageGroup") {
          formDataObj.append(key, processedData[key]);
        }
      });

      if (selectedCategory) {
        await apiService.updateCategory(selectedCategory._id, formDataObj);
      } else {
        await apiService.createCategory(formDataObj);
      }

      handleDialogClose();
      fetchCategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      setLoading(true);
      await apiService.deleteCategory(id);
      fetchCategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    // Initialize the form data with complete nested structure and default values
    setFormData({
      name: category.name || "",
      slug: category.slug || "",
      description: category.description || "",
      categoryType: category.categoryType || "general",
      ageGroup: {
        minAge: category.ageGroup?.minAge || 0,
        maxAge: category.ageGroup?.maxAge || 99,
      },
      gender: category.gender || "unisex",
      professionalLevel: category.professionalLevel || "beginner",
      featured: category.featured || false,
      image: null, // Reset image since we can't display the old one
      imageAlt: category.image?.alt || "",
      metadata: {
        isActive: category.metadata?.isActive ?? true,
        displayOrder: category.metadata?.displayOrder || 0,
        specifications: {
          frameSize: category.metadata?.specifications?.frameSize || [],
          wheelSize: category.metadata?.specifications?.wheelSize || [],
          recommended: {
            height: {
              min:
                category.metadata?.specifications?.recommended?.height?.min ||
                "",
              max:
                category.metadata?.specifications?.recommended?.height?.max ||
                "",
            },
            weight: {
              min:
                category.metadata?.specifications?.recommended?.weight?.min ||
                "",
              max:
                category.metadata?.specifications?.recommended?.weight?.max ||
                "",
            },
          },
        },
      },
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
    setError("");
    setFormData({
      name: "",
      slug: "",
      description: "",
      categoryType: "general",
      ageGroup: {
        minAge: 0,
        maxAge: 99,
      },
      gender: "unisex",
      professionalLevel: "beginner",
      featured: false,
      image: null,
      imageAlt: "",
      metadata: {
        isActive: true,
        displayOrder: 0,
        specifications: {
          frameSize: [],
          wheelSize: [],
          recommended: {
            height: {
              min: "",
              max: "",
            },
            weight: {
              min: "",
              max: "",
            },
          },
        },
      },
    });
  };
  const renderSpecificationsFields = () => (
    <div className="col-span-2 grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="col-span-2 font-semibold text-gray-700">Specifications</h3>

      <FormControl fullWidth>
        <InputLabel>Frame Sizes</InputLabel>
        <Select
          multiple
          value={formData.metadata.specifications.frameSize}
          onChange={(e) =>
            setFormData({
              ...formData,
              metadata: {
                ...formData.metadata,
                specifications: {
                  ...formData.metadata.specifications,
                  frameSize: e.target.value,
                },
              },
            })
          }
          renderValue={(selected) => (
            <div className="flex flex-wrap gap-1">
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </div>
          )}
        >
          {FRAME_SIZES.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Wheel Sizes</InputLabel>
        <Select
          multiple
          value={formData.metadata.specifications.wheelSize}
          onChange={(e) =>
            setFormData({
              ...formData,
              metadata: {
                ...formData.metadata,
                specifications: {
                  ...formData.metadata.specifications,
                  wheelSize: e.target.value,
                },
              },
            })
          }
          renderValue={(selected) => (
            <div className="flex flex-wrap gap-1">
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </div>
          )}
        >
          {WHEEL_SIZES.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="col-span-2 grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-600">Recommended Height (cm)</h4>
          <TextField
            label="Min Height"
            type="number"
            value={
              formData.metadata?.specifications?.recommended?.height?.min ?? ""
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                metadata: {
                  ...formData.metadata,
                  specifications: {
                    ...formData.metadata.specifications,
                    recommended: {
                      ...formData.metadata.specifications.recommended,
                      height: {
                        ...formData.metadata.specifications.recommended.height,
                        min: e.target.value,
                      },
                    },
                  },
                },
              })
            }
          />
          <TextField
            label="Max Height"
            type="number"
            value={
              formData.metadata?.specifications?.recommended?.height?.max ?? ""
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                metadata: {
                  ...formData.metadata,
                  specifications: {
                    ...formData.metadata.specifications,
                    recommended: {
                      ...formData.metadata.specifications.recommended,
                      height: {
                        ...formData.metadata.specifications.recommended.height,
                        max: e.target.value,
                      },
                    },
                  },
                },
              })
            }
          />
        </div>
        <div className="space-y-4">
          <h4 className="font-medium text-gray-600">Recommended Weight (kg)</h4>
          <TextField
            label="Min Weight"
            type="number"
            value={
              formData.metadata?.specifications?.recommended?.weight?.min ?? ""
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                metadata: {
                  ...formData.metadata,
                  specifications: {
                    ...formData.metadata.specifications,
                    recommended: {
                      ...formData.metadata.specifications.recommended,
                      weight: {
                        ...formData.metadata.specifications.recommended.weight,
                        min: e.target.value,
                      },
                    },
                  },
                },
              })
            }
          />
          <TextField
            label="Max Weight"
            type="number"
            value={
              formData.metadata?.specifications?.recommended?.weight?.max ?? ""
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                metadata: {
                  ...formData.metadata,
                  specifications: {
                    ...formData.metadata.specifications,
                    recommended: {
                      ...formData.metadata.specifications.recommended,
                      weight: {
                        ...formData.metadata.specifications.recommended.weight,
                        max: e.target.value,
                      },
                    },
                  },
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );

  const renderCategoryTypeFields = () => {
    switch (formData.categoryType) {
      case "age-group":
        return (
          <>
            <TextField
              label="Minimum Age"
              type="number"
              value={formData.ageGroup.minAge}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ageGroup: {
                    ...formData.ageGroup,
                    minAge: parseInt(e.target.value) || 0,
                  },
                })
              }
              required
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Maximum Age"
              type="number"
              value={formData.ageGroup.maxAge}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ageGroup: {
                    ...formData.ageGroup,
                    maxAge: parseInt(e.target.value) || 99,
                  },
                })
              }
              required
              inputProps={{ min: 0 }}
            />
          </>
        );
      case "gender":
        return (
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              required
            >
              {GENDER_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "professional":
        return (
          <FormControl fullWidth>
            <InputLabel>Professional Level</InputLabel>
            <Select
              value={formData.professionalLevel}
              onChange={(e) =>
                setFormData({ ...formData, professionalLevel: e.target.value })
              }
              required
            >
              {PROFESSIONAL_LEVELS.map((level) => (
                <MenuItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 mt-20 bg-gradient-to-br from-white to-sky-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Category Management
            </h1>
            <p className="text-gray-600">
              Manage your product categories and organization
            </p>
          </div>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
            className="bg-sky-600 hover:bg-sky-700 shadow-md"
            size="large"
          >
            Add Category
          </Button>
        </div>

        {error && (
          <Alert
            severity="error"
            className="mb-6 shadow-md"
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        <Paper className="shadow-xl rounded-lg overflow-hidden">
          <TableContainer>
            <Table>
              <TableHead className="bg-sky-100">
                <TableRow>
                  <TableCell className="font-bold text-gray-700">
                    Name
                  </TableCell>
                  <TableCell className="font-bold text-gray-700">
                    Description
                  </TableCell>
                  <TableCell className="font-bold text-gray-700">
                    Products
                  </TableCell>
                  <TableCell className="font-bold text-gray-700">
                    Status
                  </TableCell>
                  <TableCell className="font-bold text-gray-700">
                    Featured
                  </TableCell>
                  <TableCell className="font-bold text-gray-700 text-right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" className="py-8">
                      <CircularProgress size={40} className="text-sky-600" />
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category) => (
                    <TableRow
                      key={category._id}
                      className="hover:bg-sky-50 transition-colors duration-150"
                    >
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell className="max-w-md truncate">
                        {category.description}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-sky-700">
                          {category.metadata.productCount}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            category.metadata.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {category.metadata.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            category.featured
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {category.featured ? "Featured" : "Standard"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <IconButton
                          onClick={() => {
                            setSelectedCategory(category);
                            setFormData({
                              ...category,
                              image: null,
                            });
                            setOpenDialog(true);
                          }}
                          className="text-sky-600 hover:bg-sky-50"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(category._id)}
                          className="text-red-600 hover:bg-red-50 ml-2"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
            <Button
              disabled={page === 1 || loading}
              onClick={() => setPage((p) => p - 1)}
              startIcon={<ArrowUpward />}
              className="text-sky-600"
            >
              Previous
            </Button>
            <span className="text-gray-600 font-medium">
              Page {page} of {totalPages}
            </span>
            <Button
              disabled={page === totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              endIcon={<ArrowDownward />}
              className="text-sky-600"
            >
              Next
            </Button>
          </div>
        </Paper>

        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          maxWidth="md"
          fullWidth
        >
          <form onSubmit={handleSubmit}>
            <DialogTitle className="bg-sky-50 border-b">
              <div className="text-xl font-bold text-gray-800">
                {selectedCategory ? "Edit Category" : "Add New Category"}
              </div>
            </DialogTitle>
            <DialogContent className="mt-6">
              <div className="grid grid-cols-2 gap-6">
                <TextField
                  label="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  fullWidth
                />
                <TextField
                  label="Slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  required
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Category Type</InputLabel>
                  <Select
                    value={formData.categoryType}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryType: e.target.value })
                    }
                    required
                  >
                    {CATEGORY_TYPES.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {renderCategoryTypeFields()}

                <TextField
                  label="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  fullWidth
                  multiline
                  rows={4}
                  className="col-span-2"
                />

                {renderSpecificationsFields()}
                <div className="col-span-2 space-y-4">
                  <div className="p-4 border-2 border-dashed rounded-lg bg-gray-50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          image: e.target.files[0],
                        })
                      }
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <ImageIcon className="text-gray-400" />
                      <span className="text-gray-600">
                        {formData.image
                          ? formData.image.name
                          : "Click to upload image"}
                      </span>
                    </label>
                  </div>
                  <TextField
                    label="Image Alt Text"
                    value={formData.imageAlt}
                    onChange={(e) =>
                      setFormData({ ...formData, imageAlt: e.target.value })
                    }
                    fullWidth
                    variant="outlined"
                  />
                </div>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.metadata.isActive}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metadata: {
                            ...formData.metadata,
                            isActive: e.target.checked,
                          },
                        })
                      }
                    />
                  }
                  label="Active"
                  className="ml-2"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featured: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Featured"
                  className="ml-2"
                />
              </div>
            </DialogContent>
            <DialogActions className="p-6 bg-gray-50 border-t">
              <Button
                onClick={handleDialogClose}
                className="text-gray-600"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="bg-sky-600 hover:bg-sky-700"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} className="text-white" />
                ) : selectedCategory ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default Categories;
