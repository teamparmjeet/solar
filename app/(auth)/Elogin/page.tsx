"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BASE_URL, baseapi } from "@/app/constants/api";
export default function Page() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const router = useRouter();
    const [phoneError, setPhoneError] = useState("");
    const [otpError, setOtpError] = useState("");

    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval: string | number | NodeJS.Timeout | undefined;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const validatePhone = (number: string) => {
        if (!number) {
            return "Mobile number is required";
        }

        if (!/^[6-9]\d{9}$/.test(number)) {
            return "Enter a valid Indian mobile number";
        }

        return "";
    };

    const handleSendOtp = async () => {
        const error = validatePhone(phone);

        if (error) {
            setPhoneError(error);
            return;
        }

        try {
            setLoading(true);
            setPhoneError("");

            const response = await baseapi(
                "/api/auth/sendotp",
                {
                    method: "POST",
                    body: JSON.stringify({
                        phone,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to send OTP");
            }

            setOtpSent(true);
            setTimer(30);
        } catch (error: any) {
            setPhoneError(error.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
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

            const response = await baseapi(
                "/api/auth/login",
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({
                        phone,
                        otp,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Login failed"
                );
            }
            localStorage.setItem("token", data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );
            document.cookie = `token=${data.token}; path=/`;
            document.cookie = `role=${data.user.role}; path=/`;
            document.cookie = `plan_status=${data.user.active_plan ? "active" : "inactive"
                }; path=/`;
            if (data.user.role === "admin") {
                router.replace("/Admin");
            } else {
                router.replace("/Emitr");
            }
        } catch (error: any) {
            setOtpError(
                error.message || "OTP verification failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const handlePhoneChange = (e: { target: { value: string; }; }) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value.length <= 10) {
            setPhone(value);
            setPhoneError("");
        }
    };

    const handleOtpChange = (e: { target: { value: string; }; }) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value.length <= 6) {
            setOtp(value);
            setOtpError("");
        }
    };

    return (
        <div className="min-h-screen homebg bg-linear-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center p-2 relative overflow-hidden">
            {/* Background Decoration */}


            {/* Solar Grid */}
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
            <div className="relative z-10 w-full max-w-sm mx-auto">

                {/* Back Button */}
                <div className="absolute -top-10 left-0">
                    <button
                        onClick={() => router.back()}
                        className="flex cursor-pointer items-center gap-1 bg-white border border-orange-100 shadow-sm px-3 py-1 rounded-md text-gray-700 hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={16} />
                    </button>
                </div>

                {/* Card */}
                <div className="bg-white border border-orange-100 shadow-lg rounded-md px-5 py-6">

                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Solar Portal
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Login with your mobile number
                        </p>
                    </div>

                    <div className="space-y-4">

                        {/* Mobile Input */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Mobile Number
                            </label>

                            <div className={`flex items-center h-10 rounded-md border overflow-hidden ${phoneError ? "border-red-500" : "border-gray-300"
                                }`}>
                                <div className="px-3 bg-gray-100 h-full flex items-center text-sm border-r">
                                    +91
                                </div>

                                <input
                                    type="tel"
                                    placeholder="9876543210"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    disabled={otpSent}
                                    className="flex-1 h-full px-3 text-sm outline-none disabled:bg-gray-50"
                                />
                            </div>

                            {phoneError && (
                                <p className="text-red-500 text-xs mt-1">
                                    {phoneError}
                                </p>
                            )}
                        </div>

                        {/* Send OTP */}
                        {!otpSent ? (
                            <button
                                onClick={handleSendOtp}
                                disabled={loading || phone.length !== 10}
                                className="w-full h-10 rounded-md text-sm font-semibold text-white bg-linear-to-r from-yellow-500 to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition"
                            >
                                {loading ? "Sending OTP..." : "Send OTP"}
                            </button>
                        ) : (
                            <>
                                {/* OTP Input */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Enter OTP
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter 6 digit OTP"
                                        value={otp}
                                        onChange={handleOtpChange}
                                        maxLength={6}
                                        className={`w-full h-10 px-3 rounded-md border text-sm outline-none ${otpError ? "border-red-500" : "border-gray-300"
                                            } focus:border-orange-500`}
                                    />

                                    {otpError && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {otpError}
                                        </p>
                                    )}
                                </div>

                                {/* Verify OTP */}
                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={loading || otp.length !== 6}
                                    className="w-full h-10 rounded-md text-sm font-semibold text-white bg-linear-to-r from-green-500 to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition"
                                >
                                    {loading ? "Verifying..." : "Verify OTP"}
                                </button>

                                {/* Timer / Resend */}
                                <div className="text-center text-xs">
                                    {timer > 0 ? (
                                        <p className="text-gray-500">
                                            Resend OTP in{" "}
                                            <span className="text-orange-600 font-semibold">
                                                {timer}s
                                            </span>
                                        </p>
                                    ) : (
                                        <button
                                            onClick={handleSendOtp}
                                            className="text-orange-600 font-semibold hover:text-orange-700"
                                        >
                                            Resend OTP
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-5 pt-4 border-t border-gray-100 text-center">
                        <p className="text-[11px] text-gray-500">
                            Solar Subsidy e-Mitra Portal
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}