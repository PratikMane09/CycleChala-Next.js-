import React from "react";
import Image from "next/image";
import {
  ShoppingCart as CartIcon,
  EyeIcon,
  Trash2 as TrashIcon,
} from "lucide-react";

const WishlistItem = ({
  item,
  onAddToCart,
  onRemoveFromWishlist,
  onViewDetails,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-2">
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 hover:shadow-xl transition-shadow">
        {/* Product Image & Basic Info */}
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6 w-full">
          <div className="w-30 h-30 relative mb-4 md:mb-0">
            <Image
              src={
                item.product.images?.[0]?.url ||
                item.product.images?.[0]?.contentType
                  ? `data:${
                      item.product.images[0].contentType
                    };base64,${Buffer.from(
                      item.product.images[0].data?.data || []
                    ).toString("base64")}`
                  : "/placeholder.png"
              }
              alt={item.product.name || "Product"}
              width={96}
              height={96}
              className="rounded-lg object-cover"
            />
          </div>

          <div className="text-center md:text-left flex-grow">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800">
              {item.product.name}
            </h3>
            <p className="text-gray-500">{item.product.brand}</p>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="text-center md:text-right mb-4 md:mb-0">
            <p className="text-xl font-bold text-gray-800">
              ₹{(item.product.price?.base / 100).toLocaleString()}
            </p>
            {item.product.price?.discount > 0 && (
              <p className="text-green-600">
                {item.product.price.discount}% OFF
              </p>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => {
                onAddToCart(item.product._id);
                onRemoveFromWishlist(item.product._id);
              }}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              title="Add to Cart"
            >
              <CartIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewDetails(item.product.metadata?.slug)}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              title="View Details"
            >
              <EyeIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => onRemoveFromWishlist(item.product._id)}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              title="Remove from Wishlist"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WishlistItem;
