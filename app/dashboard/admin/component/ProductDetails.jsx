import React, { useState } from "react";
import { Typography, Rating, Chip, Button } from "@mui/material";
import { Package, Settings, Check } from "lucide-react";

// Color name mapping utility
const getColorName = (hexCode) => {
  // Standard color ranges and names
  const colorMap = {
    // Reds
    "#FF0000": "Classic Red",
    "#800000": "Burgundy",
    "#DC143C": "Crimson",
    "#CD5C5C": "Indian Red",
    "#FA8072": "Salmon",

    // Blues
    "#0000FF": "Royal Blue",
    "#000080": "Navy Blue",
    "#4169E1": "Steel Blue",
    "#87CEEB": "Sky Blue",
    "#00CED1": "Turquoise",

    // Greens
    "#008000": "Forest Green",
    "#32CD32": "Lime Green",
    "#90EE90": "Light Green",
    "#006400": "Dark Green",
    "#98FB98": "Mint Green",

    // Yellows & Golds
    "#FFD700": "Golden",
    "#FFFF00": "Bright Yellow",
    "#F0E68C": "Khaki",
    "#BDB76B": "Dark Khaki",

    // Browns
    "#8B4513": "Saddle Brown",
    "#A0522D": "Sienna",
    "#DEB887": "Burlywood",
    "#D2691E": "Chocolate",

    // Grays
    "#808080": "Classic Gray",
    "#A9A9A9": "Dark Gray",
    "#D3D3D3": "Light Gray",
    "#696969": "Dim Gray",

    // Blacks & Whites
    "#000000": "Pure Black",
    "#FFFFFF": "Pure White",
    "#F5F5F5": "Off White",

    // Purples
    "#800080": "Royal Purple",
    "#9370DB": "Medium Purple",
    "#4B0082": "Indigo",

    // Pinks
    "#FF69B4": "Hot Pink",
    "#FFC0CB": "Light Pink",
    "#DB7093": "Pale Violet Red",
  };

  // Convert input hex to uppercase for comparison
  const normalizedHex = hexCode.toUpperCase();

  // Find exact match
  if (colorMap[normalizedHex]) {
    return colorMap[normalizedHex];
  }

  // If no exact match, find closest color
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  const getColorDistance = (hex1, hex2) => {
    const [r1, g1, b1] = hexToRgb(hex1);
    const [r2, g2, b2] = hexToRgb(hex2);
    return Math.sqrt(
      Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2)
    );
  };

  let closestColor = Object.keys(colorMap)[0];
  let minDistance = Number.MAX_VALUE;

  Object.keys(colorMap).forEach((hex) => {
    const distance = getColorDistance(normalizedHex, hex);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = hex;
    }
  });

  return colorMap[closestColor];
};

const ProductDetails = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(
    product.specifications?.colors?.available?.[0] || null
  );

  const getImagesByColor = (colorName) => {
    return product.images.filter((img) => img.color?.name === colorName);
  };

  const getStockStatus = () => {
    if (!product.inventory) return false;
    return product.inventory.quantity > 0;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            {selectedColor && getImagesByColor(selectedColor.name)[0] && (
              <img
                src={`data:${
                  getImagesByColor(selectedColor.name)[0].contentType
                };base64,${Buffer.from(
                  getImagesByColor(selectedColor.name)[0].data
                ).toString("base64")}`}
                alt={
                  getImagesByColor(selectedColor.name)[0].alt || product.name
                }
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 gap-2">
            {selectedColor &&
              getImagesByColor(selectedColor.name).map((image, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-md overflow-hidden bg-gray-100 cursor-pointer"
                >
                  <img
                    src={`data:${image.contentType};base64,${Buffer.from(
                      image.data
                    ).toString("base64")}`}
                    alt={image.alt || `${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          <div>
            <Typography variant="h4" className="font-bold mb-2">
              {product.name}
            </Typography>
            <Typography variant="h6" className="text-gray-600 mb-4">
              {product.brand}
            </Typography>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <Rating value={product.rating.average || 0} readOnly />
                <Typography variant="body2" className="text-gray-600">
                  ({product.rating.count || 0} reviews)
                </Typography>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <Typography variant="h5" className="text-sky-600 font-bold">
                ₹{product.price?.base?.toLocaleString() || 0}
              </Typography>
              {product.price?.discount > 0 && (
                <Chip
                  label={`${product.price.discount}% OFF`}
                  color="success"
                  size="small"
                />
              )}
            </div>

            {/* Color Selection */}
            {product.specifications?.colors?.available?.length > 0 && (
              <div className="space-y-2 mb-6">
                <Typography variant="subtitle1" className="font-medium">
                  Available Colors
                </Typography>
                <div className="flex flex-wrap gap-3">
                  {product.specifications.colors.available.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center px-4 py-2 rounded-full border transition-all ${
                        selectedColor?.name === color.name
                          ? "border-sky-500 bg-sky-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full mr-2 border border-gray-200"
                        style={{ backgroundColor: color.hexCode }}
                      />
                      <span
                        className={`text-sm ${
                          selectedColor?.name === color.name
                            ? "text-sky-700 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {getColorName(color.hexCode)}
                      </span>
                      {selectedColor?.name === color.name && (
                        <Check className="ml-2 text-sky-500" size={16} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <Typography variant="h4" className="font-bold mb-2">
                  {product.name}
                </Typography>
                <Typography variant="h6" className="text-gray-600 mb-4">
                  {product.brand}
                </Typography>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <Rating value={product.rating.average || 0} readOnly />
                    <Typography variant="body2" className="text-gray-600">
                      ({product.rating.count || 0} reviews)
                    </Typography>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <Typography variant="h5" className="text-sky-600 font-bold">
                    ₹{product.price?.base?.toLocaleString() || 0}
                  </Typography>
                  {product.price?.discount > 0 && (
                    <Chip
                      label={`${product.price.discount}% OFF`}
                      color="success"
                      size="small"
                    />
                  )}
                </div>

                {/* Color Selection */}
                {product.specifications?.colors?.available?.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <Typography variant="subtitle1" className="font-medium">
                      Select Color
                    </Typography>
                    <div className="flex flex-wrap gap-3">
                      {product.specifications.colors.available.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`flex items-center px-4 py-2 rounded-full border transition-all ${
                            selectedColor?.name === color.name
                              ? "border-sky-500 bg-sky-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: color.hexCode }}
                          />
                          <span
                            className={`text-sm ${
                              selectedColor?.name === color.name
                                ? "text-sky-700 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            {color.name}
                          </span>
                          {selectedColor?.name === color.name && (
                            <Check className="ml-2 text-sky-500" size={16} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stock Status */}
                <div className="mb-6">
                  <Chip
                    label={getStockStatus() ? "In Stock" : "Out of Stock"}
                    color={getStockStatus() ? "success" : "error"}
                    variant="outlined"
                  />
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={!getStockStatus()}
                  className="mb-6"
                >
                  Add to Cart
                </Button>
              </div>

              {/* Specifications */}
              <div className="space-y-4">
                <Typography variant="h6" className="flex items-center gap-2">
                  <Package size={20} />
                  Specifications
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications || {}).map(
                    ([key, value]) => {
                      if (key === "colors") return null; // Skip colors as they're handled above
                      return (
                        <div key={key} className="rounded-lg bg-gray-50 p-4">
                          <Typography
                            variant="subtitle2"
                            className="text-gray-600 capitalize mb-1"
                          >
                            {key}
                          </Typography>
                          <div className="space-y-1">
                            {Object.entries(value || {}).map(
                              ([subKey, subValue]) => (
                                <Typography key={subKey} variant="body2">
                                  <span className="capitalize">{subKey}</span>:{" "}
                                  {subValue || "N/A"}
                                </Typography>
                              )
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Additional Information */}
              {(product.warranty || product.additionalInfo) && (
                <div className="space-y-4">
                  <Typography variant="h6" className="flex items-center gap-2">
                    <Settings size={20} />
                    Additional Information
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.warranty && (
                      <div className="rounded-lg bg-gray-50 p-4">
                        <Typography
                          variant="subtitle2"
                          className="text-gray-600"
                        >
                          Warranty
                        </Typography>
                        <Typography variant="body2">
                          Duration: {product.warranty.duration || "N/A"}
                        </Typography>
                        {product.warranty.terms && (
                          <Typography variant="body2">
                            Terms: {product.warranty.terms}
                          </Typography>
                        )}
                      </div>
                    )}
                    {product.additionalInfo?.assembly && (
                      <div className="rounded-lg bg-gray-50 p-4">
                        <Typography
                          variant="subtitle2"
                          className="text-gray-600"
                        >
                          Assembly
                        </Typography>
                        <Typography variant="body2">
                          Required:{" "}
                          {product.additionalInfo.assembly.required
                            ? "Yes"
                            : "No"}
                        </Typography>
                        {product.additionalInfo.assembly.instructions && (
                          <Typography variant="body2">
                            Instructions:{" "}
                            {product.additionalInfo.assembly.instructions}
                          </Typography>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
