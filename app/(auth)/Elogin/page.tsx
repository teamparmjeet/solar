"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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

        setPhoneError("");
        setLoading(true);

        try {
            // Replace this with your API call
            const newOtp = Math.floor(
                1000 + Math.random() * 9000
            ).toString();

            await new Promise((resolve) => setTimeout(resolve, 1500));

            setGeneratedOtp(newOtp);
            setOtpSent(true);
            setTimer(30);

            console.log("Generated OTP:", newOtp);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setPhoneError("Failed to send OTP. Please try again.");
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp.trim()) {
            setOtpError("Please enter OTP");
            return;
        }

        if (otp.length !== 4) {
            setOtpError("OTP must be 4 digits");
            return;
        }

        if (otp !== generatedOtp) {
            setOtpError("Invalid OTP");
            return;
        }

        setOtpError("");
        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            alert("Login Successful");

            setLoading(false);
        } catch {
            setLoading(false);
            setOtpError("Verification failed");
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

        if (value.length <= 4) {
            setOtp(value);
            setOtpError("");
        }
    };

    return (
        <div className="min-h-screen homebg bg-linear-to-br from-yellow-50 via-white to-orange-50 flex items-center justify-center p-2 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl" />

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

            <div className="relative z-10 w-full max-w-md">
                {/* Header */}
                <div className=" absolute">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 cursor-pointer bg-gray-50 backdrop-blur-md border border-orange-100 px-4 py-1 rounded transition-all duration-300 text-gray-700 font-medium"
                    >
                        <ArrowLeft size={18} />
                        <span>Back</span>
                    </button>
                </div>

                <div className="bg-white rounded  border border-orange-100 shadow-2xl px-2 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Solar Portal
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Login with your mobile number
                        </p>
                    </div>

                    <div className="space-y-5">
                        {/* Phone Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mobile Number
                            </label>

                            <div
                                className={`flex items-center h-12 rounded  border overflow-hidden ${phoneError
                                    ? "border-red-500"
                                    : "border-gray-300"
                                    }`}
                            >
                                <div className="px-4 bg-gray-100 h-full flex items-center font-medium text-gray-700 border-r">
                                    +91
                                </div>

                                <input
                                    type="tel"
                                    placeholder="9876543210"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    disabled={otpSent}
                                    className="flex-1 h-full px-4 outline-none text-gray-800 disabled:bg-gray-50"
                                />
                            </div>

                            {phoneError && (
                                <p className="text-red-500 text-sm mt-2">
                                    {phoneError}
                                </p>
                            )}
                        </div>

                        {!otpSent ? (
                            <button
                                onClick={handleSendOtp}
                                disabled={loading || phone.length !== 10}
                                className="w-full h-12 rounded  font-semibold text-white bg-linear-to-r from-yellow-500 to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg"
                            >
                                {loading ? "Sending OTP..." : "Send OTP"}
                            </button>
                        ) : (
                            <>
                                {/* OTP Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Enter OTP
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter 4 Digit OTP"
                                        value={otp}
                                        onChange={handleOtpChange}
                                        maxLength={4}
                                        className={`w-full h-14 px-4 rounded-xl border outline-none ${otpError
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            } focus:border-orange-500`}
                                    />

                                    {otpError && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {otpError}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={loading || otp.length !== 4}
                                    className="w-full h-14 rounded-xl font-semibold text-white bg-linear-to-r from-green-500 to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg"
                                >
                                    {loading ? "Verifying..." : "Verify OTP"}
                                </button>

                                {timer > 0 ? (
                                    <p className="text-center text-sm text-gray-500">
                                        Resend OTP in{" "}
                                        <span className="font-semibold text-orange-600">
                                            {timer}s
                                        </span>
                                    </p>
                                ) : (
                                    <button
                                        onClick={handleSendOtp}
                                        className="w-full text-orange-600 font-semibold hover:text-orange-700"
                                    >
                                        Resend OTP
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-xs text-gray-500">
                            Solar Subsidy e-Mitra Portal
                        </p>
                    </div>
                </div>


            </div>
        </div>
    );
}