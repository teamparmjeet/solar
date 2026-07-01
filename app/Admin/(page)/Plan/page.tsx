"use client"
import React, { useEffect, useState } from 'react'
import { baseapi } from '@/app/constants/api'
import Planlist from '@/app/component/Admin/Plan/Planlist';
import Pagination from '@/app/component/Pagination';
import PlanModal from "@/app/component/Admin/Plan/PlanModal"
export default function page() {

    const [plan, setPlan] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const fetchPlan = async (page = 1) => {

        const response = await baseapi(
            `/api/plan/plans?page=${page}`
        );

        const data = await response.json();

        if (data.success) {
            setPlan(data.data);
            setTotalPages(data.pagination.totalPages);
            setCurrentPage(data.pagination.page);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPlan(1);
    }, []);
    const handleDelete = async (id: number) => {
        try {
            const res = await baseapi(`/api/plan/plans/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.success) {
                alert("Plan deleted successfully");
                fetchPlan(1); // Refresh the list
            } else {
                alert(data.message || "Unable to delete plan");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };
    return (
        <div>
            <div className=' flex mb-2 justify-end'>
                <button
                    onClick={() => setOpen(true)}
                    className="rounded bg-amber-500 px-5 py-1 text-white"
                >
                    Create New Plan
                </button>
            </div>

            <PlanModal isOpen={open}
                onClose={() => {
                    setOpen(false);
                    fetchPlan(1);
                }} />
            <Planlist data={plan} onDelete={handleDelete} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => fetchPlan(page)}
            />
        </div>
    )
}
