"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { baseapi } from "@/app/constants/api";

export default function SignUpPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [globalError, setGlobalError] = useState("");

    // Registration Form States
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
    });

    // OTP States
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [timer, setTimer] = useState(0);

    // Resend OTP Countdown Timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { name: "", email: "", phone: "", dob: "" };

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
            isValid = false;
        }

        if (!formData.phone) {
            newErrors.phone = "Mobile number is required";
            isValid = false;
        } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid 10-digit Indian mobile number";
            isValid = false;
        }

        if (!formData.dob) {
            newErrors.dob = "Date of Birth is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const numericValue = value.replace(/\D/g, "");
            if (numericValue.length <= 10) {
                setFormData((prev) => ({ ...prev, [name]: numericValue }));
                setErrors((prev) => ({ ...prev, [name]: "" }));
            }
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setGlobalError("");
    };

    // Step 1: Send OTP to verify the mobile number
    const handleSendOtp = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            setGlobalError("");
            setOtpError("");

            const response = await baseapi("/api/auth/sendotp", {
                method: "POST",
                body: JSON.stringify({ phone: formData.phone }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to send OTP");
            }

            setOtpSent(true);
            setTimer(30);
        } catch (error: any) {
            setGlobalError(error.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP and subsequently trigger account creation
    const handleVerifyAndSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!otp) {
            setOtpError("Please enter OTP");
            return;
        }

        if (otp.length !== 6) {
            setOtpError("OTP must be 6 digits");
            return;
        }

        try {
            setLoading(true);
            setOtpError("");
            setGlobalError("");

            // 1. Verify the OTP first against your login/verify api
            const verifyResponse = await baseapi("/api/auth/verifyOtp", {
                method: "POST",
                body: JSON.stringify({
                    phone: formData.phone,
                    otp: otp,
                }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyData.success) {
                throw new Error(verifyData.message || "OTP verification failed");
            }

            // 2. If OTP is valid, proceed to save the user into your MySql database
            const signUpResponse = await baseapi("/api/user", {
                method: "POST",
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    dob: formData.dob
                }),
            });

            const signUpData = await signUpResponse.json();

            if (!signUpResponse.ok || !signUpData.success) {
                throw new Error(signUpData.message || "OTP verified, but account registration failed");
            }

            setSuccessMessage("Mobile verified & Account created successfully!");

            setTimeout(() => {
                router.push("/Elogin");
            }, 2000);

        } catch (error: any) {
            setOtpError(error.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen homebg bg-linear-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(#f59e0b 1px, transparent 1px),
                        linear-gradient(90deg, #f59e0b 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative z-10 w-full max-w-md mx-auto">
                {/* Back Button */}
                <div className="absolute -top-12 left-0">
                    <button
                        onClick={() => router.back()}
                        className="flex cursor-pointer items-center gap-1 bg-white border border-orange-100 shadow-sm px-3 py-1.5 rounded-md text-gray-700 hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} />
                        <span className="text-sm font-medium">Back</span>
                    </button>
                </div>

                {/* Card */}
                <div className="bg-white border border-orange-100 shadow-xl rounded-xl px-6 py-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Solar Portal Registration
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            {!otpSent ? "Fill in details to get started" : "Verify your mobile number"}
                        </p>
                    </div>

                    {!otpSent ? (
                        /* Registration Form Details */
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full h-10 px-3 rounded-md border text-sm outline-none transition ${errors.name ? "border-red-500" : "border-gray-300 focus:border-orange-500"
                                        }`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full h-10 px-3 rounded-md border text-sm outline-none transition ${errors.email ? "border-red-500" : "border-gray-300 focus:border-orange-500"
                                        }`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Mobile Number</label>
                                <div className={`flex items-center h-10 rounded-md border overflow-hidden transition ${errors.phone ? "border-red-500" : "border-gray-300 focus-within:border-orange-500"
                                    }`}>
                                    <div className="px-3 bg-gray-50 h-full flex items-center text-sm border-r text-gray-600">+91</div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="9876543210"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="flex-1 h-full px-3 text-sm outline-none"
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className={`w-full h-10 px-3 rounded-md border text-sm outline-none transition ${errors.dob ? "border-red-500" : "border-gray-300 focus:border-orange-500"
                                        }`}
                                />
                                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                            </div>

                            {globalError && (
                                <div className="bg-red-50 text-red-600 p-2 rounded text-xs text-center border border-red-100">{globalError}</div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-10 mt-2 rounded-md text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-orange-500 disabled:opacity-70 transition-all hover:shadow-md"
                            >
                                {loading ? "Sending OTP..." : "Verify Mobile via OTP"}
                            </button>
                        </form>
                    ) : (
                        /* OTP Submission Screen */
                        <form onSubmit={handleVerifyAndSignUp} className="space-y-5">
                            <div className="bg-orange-50 text-orange-800 text-xs rounded-md p-3 border border-orange-100 text-center">
                                An OTP has been sent to <span className="font-bold">+91 {formData.phone}</span>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Enter 6-Digit OTP</label>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    maxLength={6}
                                    onChange={(e) => {
                                        setOtp(e.target.value.replace(/\D/g, ""));
                                        setOtpError("");
                                    }}
                                    className={`w-full h-10 px-3 rounded-md border text-sm outline-none text-center tracking-widest font-semibold ${otpError ? "border-red-500" : "border-gray-300 focus:border-orange-500"
                                        }`}
                                />
                                {otpError && <p className="text-red-500 text-xs mt-1 text-center">{otpError}</p>}
                            </div>

                            {successMessage && (
                                <div className="bg-green-50 text-green-600 p-2 rounded text-xs text-center border border-green-100">{successMessage}</div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                className="w-full h-10 rounded-md text-sm font-semibold text-white bg-linear-to-r from-green-500 to-emerald-600 disabled:opacity-50 transition-all hover:shadow-md"
                            >
                                {loading ? "Registering..." : "Verify & Sign Up"}
                            </button>

                            {/* Timer / Resend */}
                            <div className="text-center text-xs">
                                {timer > 0 ? (
                                    <p className="text-gray-500">
                                        Resend OTP in <span className="text-orange-600 font-semibold">{timer}s</span>
                                    </p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => handleSendOtp()}
                                        className="text-orange-600 font-semibold hover:text-orange-700 underline"
                                    >
                                        Resend OTP
                                    </button>
                                )}
                            </div>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => setOtpSent(false)}
                                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                                >
                                    Change Registration Info
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                        <p className="text-xs text-gray-500">
                            Already have an account?{" "}
                            <button onClick={() => router.push("/Elogin")} className="text-orange-600 font-semibold hover:underline">
                                Log in
                            </button>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}