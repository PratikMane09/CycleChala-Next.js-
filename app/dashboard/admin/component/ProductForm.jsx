import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Box,
  Typography,
  Divider,
  Switch,
  FormControlLabel,
  Chip,
  Paper,
  IconButton,
  Alert,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import { Upload } from "lucide-react";

const ProductForm = ({
  initialData,
  categories,
  onSubmit,
  onCancel,
  loading,
}) => {
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newColor, setNewColor] = useState({ name: "", hexCode: "" });

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: {
      base: 0,
      discount: 0,
      currency: "INR",
    },
    specifications: {
      colors: {
        available: [],
        primary: {
          name: "",
          hexCode: "",
        },
      },
      frame: {
        material: "",
        size: "",
        weight: 0,
      },

      drivetrain: {
        type: "", // Explicitly initialize type
        gearSystem: "",
        speeds: 0,
      },
      brakes: {
        type: "",
        position: "",
      },
      wheels: {
        size: "",
        type: "",
        tireSize: "",
      },
      suspension: {
        type: "",
        travel: "",
      },
      handlebar: {
        type: "",
        material: "",
      },
    },
    features: [],
    inventory: {
      inStock: true,
      quantity: 0,
      reservedQuantity: 0,
    },
    warranty: {
      duration: "",
      terms: "",
    },
    additionalInfo: {
      assembly: {
        required: false,
        instructions: "",
      },
      maintenance: [],
      includedAccessories: [],
    },
    metadata: {
      isPublished: false,
      searchTags: [],
    },
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [newFeature, setNewFeature] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newMaintenance, setNewMaintenance] = useState("");
  const [newAccessory, setNewAccessory] = useState("");
  const handleColorAdd = () => {
    if (newColor.name && newColor.hexCode) {
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          colors: {
            ...prev.specifications.colors,
            available: [...prev.specifications.colors.available, newColor],
          },
        },
      }));
      setNewColor({ name: "", hexCode: "" });
    }
  };
  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
        specifications: {
          ...prevData.specifications,
          ...(initialData.specifications || {}),
          drivetrain: {
            type: initialData.specifications?.drivetrain?.type || "",
            gearSystem:
              initialData.specifications?.drivetrain?.gearSystem || "",
            speeds: initialData.specifications?.drivetrain?.speeds || 0,
          },
          metadata: {
            ...prevData.metadata,
            ...(initialData.metadata || {}),
            searchTags: initialData.metadata?.searchTags || [], // Ensure it's an array
          },
        },
      }));
    }
  }, [initialData]);

  const handleChange = (e, section, subsection) => {
    const { name, value } = e.target;

    if (section && subsection) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subsection]: {
            ...prev[section][subsection],
            [name]: value,
          },
        },
      }));
    } else if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for the field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSwitchChange = (e, section) => {
    const { name, checked } = e.target;
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // Initialize new images with null color - will be set via dropdown
    const newImagesWithColor = files.map((file) => ({
      file,
      color: null, // Initialize with null
      isPrimary: false, // Will be set based on logic
    }));

    // Set first image as primary if no existing images
    if (existingImages.length === 0 && newImages.length === 0) {
      newImagesWithColor[0].isPrimary = true;
    }

    setNewImages((prev) => [...prev, ...newImagesWithColor]);
  };

  const handleImageColorChange = (imageIndex, colorHexCode) => {
    const selectedColor = formData.specifications.colors.available.find(
      (c) => c.hexCode === colorHexCode
    );

    setNewImages((prev) =>
      prev.map((img, i) =>
        i === imageIndex
          ? {
              ...img,
              color: selectedColor
                ? {
                    name: selectedColor.name,
                    hexCode: selectedColor.hexCode,
                  }
                : null,
            }
          : img
      )
    );
  };
  // Add function to remove existing image
  const handleRemoveExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  // Add function to remove new image
  const handleRemoveNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const handleArrayAdd = (field, value, section) => {
    if (!value.trim()) return;

    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: [...prev[section][field], value.trim()],
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
    }
  };

  const handleArrayRemove = (field, index, section) => {
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: prev[section][field].filter((_, i) => i !== index),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.brand) newErrors.brand = "Brand is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.price.base)
      newErrors["price.base"] = "Base price is required";
    if (!formData.inventory.quantity)
      newErrors["inventory.quantity"] = "Quantity is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // In ProductForm.jsx, modify the handleSubmit function:
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataObj = new FormData();

    // Prepare the submit data
    const submitData = {
      ...formData,
      keepExistingImages: existingImages.length > 0,
      existingImageIds: existingImages.map((img) => img._id),
    };

    formDataObj.append("data", JSON.stringify(submitData));

    // Append all images
    newImages.forEach((image, index) => {
      formDataObj.append("images", image.file);
    });

    // Make sure color data is properly structured
    const imageMetadata = newImages.map((image, index) => ({
      isPrimary: existingImages.length === 0 && index === 0,
      filename: image.file.name,
      alt: `${formData.name} - ${image.color?.name || "Image"} ${index + 1}`,
      color: image.color
        ? {
            name: image.color.name,
            hexCode: image.color.hexCode,
          }
        : null,
    }));

    formDataObj.append("imageMetadata", JSON.stringify(imageMetadata));

    onSubmit(formDataObj);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange(e)}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Brand"
                  name="brand"
                  value={formData.brand}
                  onChange={(e) => handleChange(e)}
                  error={!!errors.brand}
                  helperText={errors.brand}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel>Category *</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={(e) => handleChange(e)}
                    required
                  >
                    {categories.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleChange(e)}
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description}
                  required
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Price Information */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Price Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Base Price"
                  name="base"
                  value={formData.price.base}
                  onChange={(e) => handleChange(e, "price")}
                  error={!!errors["price.base"]}
                  helperText={errors["price.base"]}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Discount (%)"
                  name="discount"
                  value={formData.price.discount}
                  onChange={(e) => handleChange(e, "price")}
                  inputProps={{ min: 0, max: 100 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    name="currency"
                    value={formData.price.currency}
                    onChange={(e) => handleChange(e, "price")}
                  >
                    <MenuItem value="INR">INR</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Specifications */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Specifications
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Colors
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    label="Color Name"
                    value={newColor.name}
                    onChange={(e) =>
                      setNewColor((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    label="Hex Code"
                    value={newColor.hexCode}
                    onChange={(e) =>
                      setNewColor((prev) => ({
                        ...prev,
                        hexCode: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleColorAdd}
                    sx={{ height: "56px" }}
                  >
                    Add Color
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                {formData.specifications.colors.available.map(
                  (color, index) => (
                    <Chip
                      key={index}
                      label={`${color.name} (${color.hexCode})`}
                      style={{ backgroundColor: color.hexCode }}
                      onDelete={() => {
                        setFormData((prev) => ({
                          ...prev,
                          specifications: {
                            ...prev.specifications,
                            colors: {
                              ...prev.specifications.colors,
                              available:
                                prev.specifications.colors.available.filter(
                                  (_, i) => i !== index
                                ),
                            },
                          },
                        }));
                      }}
                    />
                  )
                )}
              </Box>
            </Box>
            {/* Frame */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Frame
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Material"
                    name="material"
                    value={formData.specifications.frame.material}
                    onChange={(e) => handleChange(e, "specifications", "frame")}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Size"
                    name="size"
                    value={formData.specifications.frame.size}
                    onChange={(e) => handleChange(e, "specifications", "frame")}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Weight (kg)"
                    name="weight"
                    value={formData.specifications.frame.weight}
                    onChange={(e) => handleChange(e, "specifications", "frame")}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Drivetrain */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Drivetrain
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Type"
                    name="type"
                    value={formData.specifications.drivetrain.type}
                    onChange={(e) =>
                      handleChange(e, "specifications", "drivetrain")
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Gear System"
                    name="gearSystem"
                    value={formData.specifications.drivetrain.gearSystem}
                    onChange={(e) =>
                      handleChange(e, "specifications", "drivetrain")
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Speeds"
                    name="speeds"
                    value={formData.specifications.drivetrain.speeds}
                    onChange={(e) =>
                      handleChange(e, "specifications", "drivetrain")
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Brakes */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Brakes
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Type"
                    name="type"
                    value={formData.specifications.brakes.type}
                    onChange={(e) =>
                      handleChange(e, "specifications", "brakes")
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={formData.specifications.brakes.position}
                    onChange={(e) =>
                      handleChange(e, "specifications", "brakes")
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Wheels */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Wheels
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Size"
                    name="size"
                    value={formData.specifications.wheels.size}
                    onChange={(e) =>
                      handleChange(e, "specifications", "wheels")
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Type"
                    name="type"
                    value={formData.specifications.wheels.type}
                    onChange={(e) =>
                      handleChange(e, "specifications", "wheels")
                    }
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Tire Size"
                    name="tireSize"
                    value={formData.specifications.wheels.tireSize}
                    onChange={(e) =>
                      handleChange(e, "specifications", "wheels")
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Suspension */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Suspension
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Type"
                    name="type"
                    value={formData.specifications.suspension.type}
                    onChange={(e) =>
                      handleChange(e, "specifications", "suspension")
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Travel"
                    name="travel"
                    value={formData.specifications.suspension.type}
                    onChange={(e) =>
                      handleChange(e, "specifications", "suspension")
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Travel"
                    name="travel"
                    value={formData.specifications.suspension.travel}
                    onChange={(e) =>
                      handleChange(e, "specifications", "suspension")
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Handlebar */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Handlebar
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Type"
                    name="type"
                    value={formData.specifications.handlebar.type}
                    onChange={(e) =>
                      handleChange(e, "specifications", "handlebar")
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Material"
                    name="material"
                    value={formData.specifications.handlebar.material}
                    onChange={(e) =>
                      handleChange(e, "specifications", "handlebar")
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Features */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Features
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={9}>
                  <TextField
                    fullWidth
                    label="Add Feature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      handleArrayAdd("features", newFeature);
                      setNewFeature("");
                    }}
                    startIcon={<Add />}
                    sx={{ height: "56px" }}
                  >
                    Add Feature
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {formData.features.map((feature, index) => (
                <Chip
                  key={index}
                  label={feature}
                  onDelete={() => handleArrayRemove("features", index)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Images */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Product Images
            </Typography>
            <Box sx={{ mb: 2 }}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<Upload />}
                >
                  Upload Images
                </Button>
              </label>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {/* Existing Images */}
              {existingImages.map((image, index) => (
                <Box
                  key={`existing-${index}`}
                  sx={{
                    position: "relative",
                    width: 100,
                    height: 100,
                  }}
                >
                  <img
                    src={`data:${image.contentType};base64,${Buffer.from(
                      image.data
                    ).toString("base64")}`}
                    alt={image.alt || `Product Image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                    onClick={() => handleRemoveExistingImage(index)}
                  >
                    <Delete />
                  </IconButton>
                  {image.isPrimary && (
                    <Chip
                      label="Primary"
                      size="small"
                      color="primary"
                      sx={{
                        position: "absolute",
                        bottom: 5,
                        right: 5,
                      }}
                    />
                  )}
                </Box>
              ))}

              {/* New Images */}
              {newImages.map((imageObj, index) => (
                <Box
                  key={`new-${index}`}
                  sx={{
                    position: "relative",
                    width: 100,
                    height: 100,
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={URL.createObjectURL(imageObj.file)}
                    alt={`New Image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: "rgba(255,255,255,0.9)",
                    }}
                  >
                    <FormControl fullWidth size="small">
                      <Select
                        value={imageObj.color?.hexCode || ""}
                        onChange={(e) =>
                          handleImageColorChange(index, e.target.value)
                        }
                        displayEmpty
                        sx={{ "& .MuiSelect-select": { py: 0.5 } }}
                      >
                        <MenuItem value="">
                          <em>Select Color</em>
                        </MenuItem>
                        {formData.specifications.colors.available.map(
                          (color) => (
                            <MenuItem
                              key={color.hexCode}
                              value={color.hexCode}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 16,
                                  height: 16,
                                  bgcolor: color.hexCode,
                                  borderRadius: "50%",
                                  border: "1px solid #ccc",
                                }}
                              />
                              {color.name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveNewImage(index)}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      bgcolor: "rgba(255,255,255,0.9)",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,1)",
                      },
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                  {imageObj.isPrimary && (
                    <Chip
                      label="Primary"
                      size="small"
                      color="primary"
                      sx={{
                        position: "absolute",
                        top: 4,
                        left: 4,
                        height: 24,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Inventory */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Inventory
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.inventory.inStock}
                      onChange={(e) => handleSwitchChange(e, "inventory")}
                      name="inStock"
                    />
                  }
                  label="In Stock"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Quantity"
                  name="quantity"
                  value={formData.inventory.quantity}
                  onChange={(e) => handleChange(e, "inventory")}
                  error={!!errors["inventory.quantity"]}
                  helperText={errors["inventory.quantity"]}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Reserved Quantity"
                  name="reservedQuantity"
                  value={formData.inventory.reservedQuantity}
                  onChange={(e) => handleChange(e, "inventory")}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Warranty */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Warranty
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  name="duration"
                  value={formData.warranty.duration}
                  onChange={(e) => handleChange(e, "warranty")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Terms"
                  name="terms"
                  value={formData.warranty.terms}
                  onChange={(e) => handleChange(e, "warranty")}
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Additional Info */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.additionalInfo.assembly.required}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          additionalInfo: {
                            ...prev.additionalInfo,
                            assembly: {
                              ...prev.additionalInfo.assembly,
                              required: e.target.checked,
                            },
                          },
                        }));
                      }}
                    />
                  }
                  label="Assembly Required"
                />
              </Grid>
              {formData.additionalInfo.assembly.required && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Assembly Instructions"
                    name="instructions"
                    value={formData.additionalInfo.assembly.instructions}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        additionalInfo: {
                          ...prev.additionalInfo,
                          assembly: {
                            ...prev.additionalInfo.assembly,
                            instructions: e.target.value,
                          },
                        },
                      }));
                    }}
                    multiline
                    rows={3}
                  />
                </Grid>
              )}
            </Grid>

            {/* Maintenance */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Maintenance Instructions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={9}>
                  <TextField
                    fullWidth
                    label="Add Maintenance Instruction"
                    value={newMaintenance}
                    onChange={(e) => setNewMaintenance(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      handleArrayAdd(
                        "maintenance",
                        newMaintenance,
                        "additionalInfo"
                      );
                      setNewMaintenance("");
                    }}
                    startIcon={<Add />}
                    sx={{ height: "56px" }}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ mt: 1 }}>
                {formData.additionalInfo.maintenance.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() =>
                      handleArrayRemove("maintenance", index, "additionalInfo")
                    }
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            </Box>

            {/* Included Accessories */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Included Accessories
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={9}>
                  <TextField
                    fullWidth
                    label="Add Accessory"
                    value={newAccessory}
                    onChange={(e) => setNewAccessory(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      handleArrayAdd(
                        "includedAccessories",
                        newAccessory,
                        "additionalInfo"
                      );
                      setNewAccessory("");
                    }}
                    startIcon={<Add />}
                    sx={{ height: "56px" }}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ mt: 1 }}>
                {formData.additionalInfo.includedAccessories.map(
                  (item, index) => (
                    <Chip
                      key={index}
                      label={item}
                      onDelete={() =>
                        handleArrayRemove(
                          "includedAccessories",
                          index,
                          "additionalInfo"
                        )
                      }
                      sx={{ m: 0.5 }}
                    />
                  )
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Metadata */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Metadata
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.metadata.isPublished}
                      onChange={(e) => handleSwitchChange(e, "metadata")}
                      name="isPublished"
                    />
                  }
                  label="Published"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={9}>
                      <TextField
                        fullWidth
                        label="Add Search Tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => {
                          handleArrayAdd("searchTags", newTag, "metadata");
                          setNewTag("");
                        }}
                        startIcon={<Add />}
                        sx={{ height: "56px" }}
                      >
                        Add Tag
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {formData.metadata?.searchTags?.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() =>
                        handleArrayRemove("searchTags", index, "metadata")
                      }
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Form Actions */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : initialData
                ? "Update Product"
                : "Create Product"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
