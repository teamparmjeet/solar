import React from "react";
import {
    CheckCircle2,
    XCircle,
    Trash2,
    User,
    Mail,
    Phone,
    Clock,
    AlertCircle
} from "lucide-react";

type UserListProps = {
    data: {
        id?: number;
        name: string;
        email: string | null;
        phone: string;
        dob: string | null;
        status: "pending" | "active" | "disabled";
        role: "emitr" | "admin";
        verified: "not_verified" | "verified";
        created_at?: string;
        updated_at?: string;
    }[];
    onDelete: (id: number) => void;
};

export default function Userlist({ data, onDelete }: UserListProps) {

    // Helper function to render the correct status badge
    const renderStatusBadge = (status: UserListProps["data"][0]["status"]) => {
        switch (status) {
            case "active":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                        <CheckCircle2 size={14} />
                        Active
                    </span>
                );
            case "pending":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700">
                        <Clock size={14} />
                        Pending
                    </span>
                );
            case "disabled":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700">
                        <XCircle size={14} />
                        Disabled
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 bg-linear-to-r from-amber-50 via-orange-50 to-white px-4 sm:px-4 lg:px-6 py-4 lg:py-5">
                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                        User Management
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500">
                        Manage all registered users and administrators
                    </p>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-250 w-full">
                    <thead>
                        <tr className="bg-slate-50/80">
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                User
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                Contact Info
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                Role
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                Verification
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                                Status
                            </th>
                            <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((user, index) => (
                            <tr
                                key={user.id || index}
                                className="group border-b border-slate-100 transition-all hover:bg-blue-50/40"
                            >
                                {/* User Info */}
                                <td className="px-4 lg:px-6 py-4 lg:py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-r from-amber-400 to-orange-500 text-white">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-800">
                                                {user.name}
                                            </h3>
                                            <span className="text-xs text-slate-500">
                                                ID #{user.id}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Contact Info */}
                                <td className="px-4 lg:px-6 py-4 lg:py-5">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-sm text-slate-700">
                                            <Phone size={14} className="text-slate-400" />
                                            {user.phone}
                                        </div>
                                        {user.email && (
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <Mail size={14} className="text-slate-400" />
                                                {user.email}
                                            </div>
                                        )}
                                    </div>
                                </td>

                                {/* Role */}
                                <td className="px-4 lg:px-6 py-4 lg:py-5">
                                    <span className={`rounded-xl px-3 py-2 text-sm font-bold ${user.role === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-slate-100 text-slate-700'}`}>
                                        {user.role.toUpperCase()}
                                    </span>
                                </td>

                                {/* Verification */}
                                <td className="px-4 lg:px-6 py-4 lg:py-5">
                                    {user.verified === "verified" ? (
                                        <span className="inline-flex items-center gap-1 rounded-full border border-green-200 px-3 py-1.5 text-sm font-medium text-green-700">
                                            <CheckCircle2 size={14} /> Verified
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 px-3 py-1.5 text-sm font-medium text-amber-700">
                                            <AlertCircle size={14} /> Unverified
                                        </span>
                                    )}
                                </td>

                                {/* Status */}
                                <td className="px-4 lg:px-6 py-4 lg:py-5 text-center">
                                    {renderStatusBadge(user.status)}
                                </td>

                                {/* Actions */}
                                <td className="px-4 lg:px-6 py-4 lg:py-5">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => {
                                                if (user.id && window.confirm("Are you sure you want to delete this user?")) {
                                                    onDelete(user.id);
                                                }
                                            }}
                                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-16 text-center text-slate-500"
                                >
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden divide-y divide-slate-200">
                {data.map((user, index) => (
                    <div
                        key={user.id || index}
                        className="p-5 hover:bg-slate-50 transition"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-r from-amber-400 to-orange-500 text-white">
                                    <User size={18} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        {user.name}
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        ID #{user.id}
                                    </p>
                                </div>
                            </div>
                            {renderStatusBadge(user.status)}
                        </div>

                        <div className="mt-5 space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Phone</span>
                                <span className="font-medium text-slate-800">
                                    {user.phone}
                                </span>
                            </div>

                            {user.email && (
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Email</span>
                                    <span className="font-medium text-slate-700">
                                        {user.email}
                                    </span>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span className="text-slate-500">Role</span>
                                <span className="font-medium uppercase">
                                    {user.role}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-slate-500">Verification</span>
                                <span className={user.verified === 'verified' ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                                    {user.verified === 'verified' ? 'Verified' : 'Unverified'}
                                </span>
                            </div>
                        </div>

                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    if (
                                        user.id &&
                                        window.confirm(
                                            "Are you sure you want to delete this user?"
                                        )
                                    ) {
                                        onDelete(user.id);
                                    }
                                }}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 hover:bg-red-100"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                {data.length === 0 && (
                    <div className="py-12 text-center text-slate-500">
                        No users found
                    </div>
                )}
            </div>
        </div>
    );
}