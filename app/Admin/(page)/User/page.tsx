"use client"
import React, { useEffect, useState } from 'react'
import { baseapi } from '@/app/constants/api'
import Userlist from '@/app/component/Admin/User/Userlist';
import Pagination from '@/app/component/Pagination';
import UserModal from '@/app/component/Admin/User/UserModal';
export default function page() {

    const [user, setUser] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const fetchUser = async (page = 1) => {

        const response = await baseapi(
            `/api/user?page=${page}`
        );

        const data = await response.json();

        if (data.success) {
            setUser(data.data);
            setTotalPages(data.pagination.totalPages);
            setCurrentPage(data.pagination.page);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser(1);
    }, []);
    const handleDelete = async (id: number) => {
        try {
            const res = await baseapi(`/api/user/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.success) {
                alert("user deleted successfully");
                fetchUser(1); // Refresh the list
            } else {
                alert(data.message || "Unable to delete user");
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
                    Create New User
                </button>
            </div>

            <UserModal isOpen={open}
                onClose={() => {
                    setOpen(false);
                    fetchUser(1);
                }} />
            <Userlist data={user} onDelete={handleDelete} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => fetchUser(page)}
            />
        </div>
    )
}
