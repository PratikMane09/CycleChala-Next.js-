// components/ProductList.jsx
import React, { useState } from "react";
import { Edit, Trash2, ChevronRight } from "lucide-react";
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Rating,
  Chip,
} from "@mui/material";
import ProductDetails from "./ProductDetails";
import { getProductImage } from "./productUtils.js";

const ProductList = ({ products, onEdit, onDelete }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  console.log("selcetd products", products);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setDetailsOpen(true);
  };

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <Alert severity="info" className="mb-4">
        {/* <AlertDescription>No products available</AlertDescription> */}
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Price & Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={getProductImage(product)}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <Typography
                            variant="subtitle2"
                            className="font-medium"
                          >
                            {product.name}
                          </Typography>
                          <Typography variant="body2" className="text-gray-500">
                            {product.brand}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Chip
                        label={product.category?.name || "Uncategorized"}
                        size="small"
                        className="bg-gray-100"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Typography variant="subtitle2">
                            ₹{product.price?.base?.toLocaleString() || 0}
                          </Typography>
                          {product.price?.discount > 0 && (
                            <Chip
                              label={`-${product.price.discount}%`}
                              color="success"
                              size="small"
                            />
                          )}
                        </div>
                        <Typography
                          variant="body2"
                          className={`${
                            product.inventory?.quantity < 10
                              ? "text-red-600"
                              : "text-gray-500"
                          }`}
                        >
                          {product.inventory?.quantity || 0} in stock
                        </Typography>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Rating
                          value={product.rating?.average || 0}
                          readOnly
                          size="small"
                        />
                        <Typography variant="body2" className="text-gray-500">
                          ({product.rating?.count || 0})
                        </Typography>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleViewDetails(product)}
                          className="min-w-0"
                        >
                          <ChevronRight size={16} />
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => onEdit(product)}
                          className="min-w-0"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => onDelete(product._id)}
                          className="min-w-0"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" className="font-bold">
            Product Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedProduct && <ProductDetails product={selectedProduct} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductList;
