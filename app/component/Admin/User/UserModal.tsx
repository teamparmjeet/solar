"use client";

import React, { useEffect, useState } from "react";
import { X, UserPlus, AlertCircle } from "lucide-react";
import { baseapi } from "@/app/constants/api";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Optional callback to refresh data after success
}

export default function UserModal({ isOpen, onClose, onSuccess }: UserModalProps) {
  const defaultFormState = {
    name: "",
    email: "",
    phone: "",
    dob: "",
    role: "emitr",
    status: "pending",
    verified: "not_verified",
  };

  const [formData, setFormData] = useState(defaultFormState);
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
      setFormData(defaultFormState);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error as soon as the user starts typing again
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Frontend Validation
    if (!formData.name.trim()) {
      setError("Name is required.");
      setIsLoading(false);
      return;
    }

    if (!formData.phone.trim()) {
      setError("Phone number is required.");
      setIsLoading(false);
      return;
    }

    try {
      // Replace '/api/user' with your actual API endpoint path
      const response = await baseapi("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email ? formData.email : null,
          phone: formData.phone,
          dob: formData.dob ? formData.dob : null,
          role: formData.role,
          status: formData.status,
          verified: formData.verified,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Something went wrong while creating the user.");
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
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-indigo-500 text-white shadow-inner">
              <UserPlus size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                Create New User
              </h2>
              <p className="text-sm font-medium text-gray-500 mt-0.5">
                Add a new user to the system
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

            {/* Name and Phone Row */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Jane Doe"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  required
                />
              </div>

         <div>
  <label
    htmlFor="phone"
    className="mb-2 block text-sm font-semibold text-gray-700"
  >
    Phone Number <span className="text-red-500">*</span>
  </label>

  <div className="flex rounded-xl border border-gray-200 bg-gray-50/50 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
    <span className="flex items-center px-4 border-r border-gray-200 text-gray-600 font-medium">
      +91
    </span>

    <input
      id="phone"
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      placeholder="9876543210"
      maxLength={10}
      inputMode="numeric"
      className="w-full bg-transparent px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
      required
    />
  </div>
</div>


            </div>

            {/* Email and DOB Row */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
              <div>
                <label htmlFor="dob" className="mb-2 block text-sm font-semibold text-gray-700">
                  Date of Birth <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Role, Status, and Verification Row */}
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label htmlFor="role" className="mb-2 block text-sm font-semibold text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none cursor-pointer"
                >
                  <option value="emitr">Emitr</option>
                  <option value="admin">Admin</option>
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
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>

              <div>
                <label htmlFor="verified" className="mb-2 block text-sm font-semibold text-gray-700">
                  Verification
                </label>
                <select
                  id="verified"
                  value={formData.verified}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 outline-none transition-all hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 appearance-none cursor-pointer"
                >
                  <option value="not_verified">Not Verified</option>
                  <option value="verified">Verified</option>
                </select>
              </div>
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
              className="w-full sm:w-auto rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}