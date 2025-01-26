import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import Image from "next/image";

const ProductImageGallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log("imahes", images);
  if (!images?.length) {
    return (
      <div className="h-64 w-full rounded-lg bg-gray-100">
        <img
          src="/api/placeholder/400/400"
          alt="No image available"
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
    );
  }

  const processImageSrc = (image) => {
    try {
      console.log("image.data", image.data);
      if (typeof image.data === "string" && image.data.startsWith("data:")) {
        return image.data;
      }

      if (typeof image.data === "string") {
        return `data:${image.contentType};base64,${image.data}`;
      }

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

  return (
    <div className="space-y-4">
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        navigation
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        className="h-96 w-full rounded-lg"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="flex h-full items-center justify-center bg-gray-100">
              <img
                src={processImageSrc(image)}
                alt={`Product image ${index + 1}`}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Navigation, Thumbs]}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          className="h-24"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <div className="h-full w-full overflow-hidden rounded-lg">
                <img
                  src={processImageSrc(image)}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ProductImageGallery;
