// utils/imageUtils.js

export const convertBinaryToBase64 = (binaryData) => {
  // Handle Buffer type data
  if (binaryData?.type === "Buffer" && Array.isArray(binaryData.data)) {
    const buffer = Buffer.from(binaryData.data);
    return `data:image/jpeg;base64,${buffer.toString("base64")}`;
  }

  // Handle direct Buffer data
  if (Buffer.isBuffer(binaryData)) {
    return `data:image/jpeg;base64,${binaryData.toString("base64")}`;
  }

  // Handle direct base64 string
  if (typeof binaryData === "string" && binaryData.startsWith("data:")) {
    return binaryData;
  }

  return null;
};

export const getProductImage = (product) => {
  if (!product?.images?.length) {
    return "/api/placeholder/400/400";
  }

  const primaryImage =
    product.images.find((img) => img.isPrimary) || product.images[0];

  if (!primaryImage?.data) {
    return "/api/placeholder/400/400";
  }

  const base64Image = convertBinaryToBase64(primaryImage.data);
  return base64Image || "/api/placeholder/400/400";
};
