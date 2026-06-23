"use client";

import React, { useEffect, useState } from "react";
import { baseapi } from "@/app/constants/api";
import Pagination from "@/app/component/Pagination";
import PmTablePending from "@/app/component/Emitr/Table/PmTablepending";
export default function Page() {
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetchApplications = async (page = 1) => {
    const userData = localStorage.getItem("user");

    if (!userData) return;

    const user = JSON.parse(userData);

    const response = await baseapi(
      `/api/pmSuryaGhar/getlist/list?user_id=${user.id}&page=${page}&limit=10&status=Installed`
    );

    const data = await response.json();

    if (data.success) {
      setApplications(data.data);
      setTotalPages(data.pagination.totalPages);
      setCurrentPage(data.pagination.currentPage);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications(1);
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=""> 
      <PmTablePending data={applications}/>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => fetchApplications(page)}
      />
    </div>
  );
}