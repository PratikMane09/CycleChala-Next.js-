import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Paginationn = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeft size={16} /> Previous
      </button>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50"
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
};
