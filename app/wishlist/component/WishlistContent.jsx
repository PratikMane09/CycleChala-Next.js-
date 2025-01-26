// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Checkbox,
//   Button,
//   Tooltip,
// } from "@mui/material";
// import {
//   Eye as EyeIcon,
//   Trash2 as TrashIcon,
//   ShoppingCart as CartIcon,
//   Heart as HeartIcon,
// } from "lucide-react";

// import { useWishlist } from "../../context/WishlistContext";
// import { useCart } from "../../context/CartContext";

// // Placeholder image for products without images
// const PLACEHOLDER_IMAGE = "/path/to/placeholder-image.png";

// const WishlistContent = () => {
//   const router = useRouter();
//   const {
//     items = [],
//     count = 0,
//     loading,
//     isInitialized,
//     fetchWishlist,
//     removeFromWishlist,
//   } = useWishlist();
//   const { addToCart } = useCart();
//   const [selectedItems, setSelectedItems] = useState([]);

//   const getProductImage = (product) => {
//     try {
//       // Fallback to placeholder if no images or first image is invalid
//       if (!product.images || product.images.length === 0) {
//         return PLACEHOLDER_IMAGE;
//       }

//       const firstImage = product.images[0];
//       return `data:${firstImage.contentType};base64,${Buffer.from(
//         firstImage.data?.data || []
//       ).toString("base64")}`;
//     } catch (error) {
//       console.error("Image processing error:", error);
//       return PLACEHOLDER_IMAGE;
//     }
//   };

//   const renderEmptyState = () => (
//     <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
//       <HeartIcon className="w-32 h-32 text-sky-500 mb-6" />
//       <h2 className="text-3xl font-bold text-gray-800 mb-4">
//         Your Wishlist is Empty
//       </h2>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => router.push("/products")}
//       >
//         Browse Products
//       </Button>
//     </div>
//   );

//   const renderWishlistTable = () => (
//     <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="bg-gray-100 p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-800">
//           Wishlist
//           <span className="text-sky-600 ml-2">({count})</span>
//         </h1>
//         {selectedItems.length > 0 && (
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<CartIcon />}
//             onClick={() => {
//               selectedItems.forEach((id) => {
//                 const product = items.find((item) => item.product._id === id);
//                 if (product) {
//                   addToCart(product.product._id);
//                   removeFromWishlist(product.product._id);
//                 }
//               });
//             }}
//           >
//             Add {selectedItems.length} to Cart
//           </Button>
//         )}
//       </div>

//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell padding="checkbox">
//                 <Checkbox
//                   color="primary"
//                   checked={selectedItems.length === items.length}
//                   indeterminate={
//                     selectedItems.length > 0 &&
//                     selectedItems.length < items.length
//                   }
//                   onChange={() =>
//                     setSelectedItems(
//                       selectedItems.length === items.length
//                         ? []
//                         : items.map((item) => item.product._id)
//                     )
//                   }
//                 />
//               </TableCell>
//               <TableCell>Product</TableCell>
//               <TableCell align="right">Price</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {items.map((item) => (
//               <TableRow key={item.product._id} hover>
//                 <TableCell padding="checkbox">
//                   <Checkbox
//                     color="primary"
//                     checked={selectedItems.includes(item.product._id)}
//                     onChange={() => {
//                       setSelectedItems((prev) =>
//                         prev.includes(item.product._id)
//                           ? prev.filter((id) => id !== item.product._id)
//                           : [...prev, item.product._id]
//                       );
//                     }}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center space-x-4">
//                     <div className="w-16 h-16 relative rounded-md overflow-hidden">
//                       <Image
//                         src={getProductImage(item.product)}
//                         alt={item.product.name || "Product"}
//                         layout="fill"
//                         objectFit="cover"
//                       />
//                     </div>
//                     <div>
//                       <p className="font-semibold">{item.product.name}</p>
//                       <p className="text-gray-500 text-sm">
//                         {item.product.brand}
//                       </p>
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell align="right">
//                   <div>
//                     <p className="font-semibold">
//                       ₹{(item.product.price?.base / 100 || 0).toLocaleString()}
//                     </p>
//                     {item.product.price?.discount > 0 && (
//                       <p className="text-green-600 text-sm">
//                         {item.product.price.discount}% OFF
//                       </p>
//                     )}
//                   </div>
//                 </TableCell>
//                 <TableCell align="right">
//                   <div className="flex justify-end space-x-2">
//                     <Tooltip title="View Details">
//                       <Button
//                         variant="outlined"
//                         color="primary"
//                         size="small"
//                         onClick={() =>
//                           router.push(
//                             `/products/${item.product.metadata?.slug}`
//                           )
//                         }
//                       >
//                         Details
//                       </Button>
//                     </Tooltip>
//                     <Tooltip title="Remove from Wishlist">
//                       <Button
//                         variant="outlined"
//                         color="error"
//                         size="small"
//                         onClick={() => removeFromWishlist(item.product._id)}
//                       >
//                         Remove
//                       </Button>
//                     </Tooltip>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {loading ? (
//         <div className="flex justify-center items-center min-h-[70vh]">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-sky-500"></div>
//         </div>
//       ) : count === 0 ? (
//         renderEmptyState()
//       ) : (
//         renderWishlistTable()
//       )}
//     </div>
//   );
// };

// export default WishlistContent;
