// components/ProductDetails.jsx
import React from "react";
import { Typography, Rating, Chip } from "@mui/material";
import { Package, Settings } from "lucide-react";
import ProductImageGallery from "./ProductImageGallery";

const ProductDetails = ({ product }) => (
  <div className="space-y-6">
    <ProductImageGallery images={product.images} />
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Typography variant="h5" className="font-bold">
          {product.name}
        </Typography>
        {product.rating && (
          <div className="flex items-center gap-2">
            <Rating value={product.rating.average || 0} readOnly />
            <Typography variant="body2" className="text-gray-600">
              ({product.rating.count || 0} reviews)
            </Typography>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Typography variant="h6" className="text-sky-600">
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
    </div>

    {product.specifications && (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Typography variant="h6" className="flex items-center gap-2">
            <Package size={20} />
            Specifications
          </Typography>
          <div className="space-y-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="rounded-lg bg-gray-50 p-3">
                <Typography variant="subtitle2" className="text-gray-600">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <Typography variant="body2">
                  {typeof value === "object"
                    ? Object.entries(value)
                        .filter(([, v]) => v)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(", ")
                    : value || "N/A"}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {(product.warranty || product.additionalInfo) && (
          <div className="space-y-4">
            <Typography variant="h6" className="flex items-center gap-2">
              <Settings size={20} />
              Additional Info
            </Typography>
            <div className="space-y-2">
              {product.warranty && (
                <div className="rounded-lg bg-gray-50 p-3">
                  <Typography variant="subtitle2" className="text-gray-600">
                    Warranty
                  </Typography>
                  <Typography variant="body2">
                    {product.warranty.duration || "N/A"}
                  </Typography>
                </div>
              )}
              {product.additionalInfo?.assembly && (
                <div className="rounded-lg bg-gray-50 p-3">
                  <Typography variant="subtitle2" className="text-gray-600">
                    Assembly Required
                  </Typography>
                  <Typography variant="body2">
                    {product.additionalInfo.assembly.required ? "Yes" : "No"}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )}
  </div>
);
export default ProductDetails;
