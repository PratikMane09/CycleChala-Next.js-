// utils/productUtils.js
export const getProductImage = (product) => {
  if (!product?.images?.length) {
    return "/api/placeholder/400/400";
  }

  try {
    const image = product.images[0];

    // Handle if image data is already a complete data URL
    if (typeof image.data === "string" && image.data.startsWith("data:")) {
      return image.data;
    }

    // Handle base64 data that needs content type prefixing
    if (typeof image.data === "string") {
      return `data:${image.contentType};base64,${image.data}`;
    }

    // Handle case where image.data is binary/Buffer
    if (image.data?.type === "Buffer" || Array.isArray(image.data)) {
      const base64 = Buffer.from(image.data).toString("base64");
      return `data:${image.contentType};base64,${base64}`;
    }

    return "/api/placeholder/400/400";
  } catch (error) {
    console.error("Error processing image:", error);
    return "/api/placeholder/400/400";
  }
};
