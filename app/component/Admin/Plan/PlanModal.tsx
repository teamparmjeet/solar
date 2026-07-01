"use client";

import React, { useEffect, useState } from "react";
import { X, Crown, AlertCircle } from "lucide-react";
import { baseapi } from "@/app/constants/api";
interface PlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void; // Optional callback to refresh data after success
}

export default function PlanModal({ isOpen, onClose, onSuccess }: PlanModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        type: "",
        status: "1", // 1 for active, 0 for inactive (TINYINT)
        duration_type: "months", // Default to months
        duration_value: "",
        description: "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setError("");
            setFormData({
                name: "",
                price: "",
                type: "",
                status: "1",
                duration_type: "months",
                duration_value: "",
                description: "",
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        // Clear error as soon as the user starts typing again
        if (error) setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Frontend Validation (Mirroring your Backend)
        if (!formData.name || !formData.type || !formData.price || !formData.duration_type) {
            setError("Name, price,type and billing cycle are required.");
            setIsLoading(false);
            return;
        }

        if (formData.duration_type !== "lifetime" && (!formData.duration_value || Number(formData.duration_value) <= 0)) {
            setError("Duration value is required and must be greater than 0.");
            setIsLoading(false);
            return;
        }

        try {
            // Replace '/api/plans' with your actual API endpoint path
            const response = await baseapi("/api/plan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    price: parseFloat(formData.price),
                    status: parseInt(formData.status),
                    type: formData.type,
                    duration_type: formData.duration_type,
                    duration_value: formData.duration_type === "lifetime" ? null : parseInt(formData.duration_value),
                    description: formData.description,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Something went wrong while creating the plan.");
            }

            // Success handling
            if (onSuccess) onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message || "Failed to connect to the server.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
            {/* Backdrop Overlay */}
            <div
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Container */}
            <div className="relative flex w-full max-w-2xl flex-col bg-white shadow-2xl animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 sm:zoom-in-95 sm:fade-in duration-300 rounded-t-3xl sm:rounded-3xl max-h-[90dvh]">

                {/* Header (Sticky) */}
                <div className="flex shrink-0 items-center justify-between border-b border-gray-100 p-5 sm:p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-amber-500 to-orange-500 text-white shadow-inner">
                            <Crown size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                                Create New Plan
                            </h2>
                            <p className="text-sm font-medium text-gray-500 mt-0.5">
                                Configure a new subscription tier
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2.5 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-label="Close modal"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Form Wrapper */}
                <form className="flex flex-col overflow-hidden" onSubmit={handleSubmit}>
                    {/* Body (Scrollable) */}
                    <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">

                        {/* Error Banner */}
                        {error && (
                            <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800 border border-red-100 animate-in fade-in zoom-in-95 duration-200">
                                <AlertCircle size={18} className="text-red-500 shrink-0" />
                                <p className="font-medium">{error}</p>
                            </div>
                        )}

                        {/* Plan Name */}
                        <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
                                Plan Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Premium Plan"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                                required
                            />
                        </div>

                        {/* Price & Status Row */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label htmlFor="price" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Price <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                                    <input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="99.00"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-8 pr-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="type" className="mb-2 block text-sm font-semibold text-gray-700">
                                   Plan Type
                                </label>
                                <select
                                    id="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all hover:border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>Select Plan</option>
                                    <option value="emitr_active">Emitr Active</option>
                                    <option value="sales_active">Sales Active</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="status" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all hover:border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 appearance-none cursor-pointer"
                                >
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Duration Row */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label htmlFor="duration_type" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Billing Cycle <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="duration_type"
                                    value={formData.duration_type}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all hover:border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 appearance-none cursor-pointer"
                                >
                                    <option value="days">Daily</option>
                                    <option value="months">Monthly</option>
                                    <option value="years">Yearly</option>
                                    <option value="lifetime">Lifetime</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="duration_value" className={`mb-2 block text-sm font-semibold ${formData.duration_type === "lifetime" ? "text-gray-400" : "text-gray-700"}`}>
                                    Duration Value {formData.duration_type !== "lifetime" && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                    id="duration_value"
                                    type="number"
                                    min="1"
                                    value={formData.duration_value}
                                    onChange={handleChange}
                                    disabled={formData.duration_type === "lifetime"}
                                    placeholder={formData.duration_type === "lifetime" ? "N/A" : "e.g. 1, 3, 12"}
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                                    required={formData.duration_type !== "lifetime"}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="mb-2 block text-sm font-semibold text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Write plan details and features included..."
                                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                            />
                        </div>
                    </div>

                    {/* Footer (Sticky) */}
                    <div className="flex shrink-0 flex-col-reverse sm:flex-row justify-end gap-3 border-t border-gray-100 p-5 sm:p-6 bg-gray-50/50 sm:rounded-b-3xl">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full sm:w-auto rounded-xl bg-linear-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            {isLoading ? "Creating..." : "Create Plan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}