"use client";

import React, { useMemo } from "react";
import {
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
} from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
}: PaginationProps) {
    const pages = useMemo(() => {
        if (totalPages <= 5) {
            return Array.from(
                { length: totalPages },
                (_, i) => i + 1
            );
        }

        // Start pages
        if (currentPage <= 3) {
            return [1, 2, 3, 4, "...", totalPages];
        }

        // End pages
        if (currentPage >= totalPages - 2) {
            return [
                1,
                "...",
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        // Middle pages
        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ];
    }, [currentPage, totalPages]);

    if (
        !Number.isInteger(currentPage) ||
        !Number.isInteger(totalPages) ||
        totalPages <= 1
    ) {
        return null;
    }

    const handlePageChange = (page: number) => {
        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage
        ) {
            return;
        }

        onPageChange(page);
    };

    return (
        <nav
            aria-label="Pagination"
            className="flex items-center justify-end  mt-2"
        >
            <div className="flex items-center gap-1 rounded-xl    bg-white p-1 shadow-sm">
                {/* Previous */}
                <button
                    type="button"
                    aria-label="Previous Page"
                    disabled={currentPage === 1}
                    onClick={() =>
                        handlePageChange(currentPage - 1)
                    }
                    className=" cursor-pointer"
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Pages */}
                {pages.map((page, index) =>
                    page === "..." ? (
                        <span
                            key={`dots-${index}`}
                            className="
                flex   items-center justify-center
                text-gray-500
              "
                        >
                            <MoreHorizontal size={18} />
                        </span>
                    ) : (
                        <button
                            key={page}
                            type="button"
                            aria-current={
                                currentPage === page
                                    ? "page"
                                    : undefined
                            }
                            onClick={() =>
                                handlePageChange(Number(page))
                            }
                            className={`
                h-8 min-w-8
                rounded-lg
                px-3
                text-sm
                font-medium
                transition-all
                ${currentPage === page
                                    ? "bg-linear-to-r from-yellow-500 to-orange-500 text-white shadow"
                                    : "hover:bg-linear-to-r from-yellow-300 to-orange-300 cursor-pointer text-black"
                                }
              `}
                        >
                            {page}
                        </button>
                    )
                )}

                {/* Next */}
                <button
                    type="button"
                    aria-label="Next Page"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                        handlePageChange(currentPage + 1)
                    }
                    className=" cursor-pointer"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </nav>
    );
}