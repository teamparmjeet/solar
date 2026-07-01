"use client";

import React, { useEffect, useState } from "react";
import { baseapi } from "@/app/constants/api";
import PaymentModal from "./PaymentModal";


interface Props {
    onBack: () => void;
}
export interface Plan {
    id: number;
    user_id?: number;
    plan_id?: number;

    name: string;
    price: number | string;
    type?: string;

    duration_type: string;
    duration_value?: number;

    status: number | string;
    description?: string;

    start_date?: string;
    end_date?: string;
    plan_type?: string;
}
export default function PlanSettings({ onBack }: Props) {
    const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
    const [availablePlans, setAvailablePlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [showPayment, setShowPayment] = useState(false);
    useEffect(() => {
        fetchPlanData();
    }, []);

    const fetchPlanData = async () => {
        setLoading(true);

        try {
            const userData = localStorage.getItem("user");

            if (!userData) {
                setLoading(false);
                return;
            }

            const user = JSON.parse(userData);

            const response = await baseapi("/api/plan/plans/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: user.id,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setCurrentPlan(data.current_plan);

                const plans = data.plans

                setAvailablePlans(plans);
            }
        } catch (error) {
            console.error("Failed to fetch plans", error);
        } finally {
            setLoading(false);
        }
    };


    const loadScript = () => {
        return new Promise<boolean>((resolve) => {

            const existingScript = document.getElementById("razorpay-script");

            if (existingScript) {
                resolve(true);
                return;
            }

            const script = document.createElement("script");

            script.id = "razorpay-script";
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => resolve(true);

            script.onerror = () => resolve(false);

            document.body.appendChild(script);

        });
    };


    const handlePayment = async () => {

        if (!selectedPlan) return;

        const loaded = await loadScript();

        if (!loaded) {
            alert("Razorpay SDK failed.");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user")!);

        const orderResponse = await baseapi("/api/plan/create-order", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                plan_id: selectedPlan.id

            })

        });

        const orderData = await orderResponse.json();

        if (!orderData.success) {

            alert(orderData.message);

            return;

        }

        const options = {

            key: orderData.key,

            amount: orderData.order.amount,

            currency: orderData.order.currency,

            name: "Your Company",

            description: selectedPlan.name,

            order_id: orderData.order.id,

            handler: async function (response: any) {

                const verify = await baseapi("/api/plan/verify-payment", {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        razorpay_order_id: response.razorpay_order_id,

                        razorpay_payment_id: response.razorpay_payment_id,

                        razorpay_signature: response.razorpay_signature,

                        user_id: user.id,

                        plan_id: selectedPlan.id

                    })

                });

                const result = await verify.json();

                if (result.success) {

                    alert("Payment Successful");

                    setShowPayment(false);

                    window.location.reload();
                    document.cookie = "plan_status=active; path=/";

                } else {

                    alert(result.message);

                }

            },

            prefill: {

                name: user.name,

                email: user.email,

                contact: user.mobile

            },

            theme: {

                color: "blue"

            }

        };

        const paymentObject = new (window as any).Razorpay(options);

        paymentObject.open();

    };

    const formatPrice = (price: number | string) => {
        return `₹${Number(price).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
        })}`;
    };

    if (loading) {
        return (
            <div className="p-8 text-center text-blue-900 font-semibold">
                Loading your plan details...
            </div>
        );
    }

    return (
        <div className="mx-auto flex flex-col">
            <button
                onClick={onBack}
                className="mb-2 w-fit border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
            >
                ← Back to Settings
            </button>

            <h1 className="mb-6 text-2xl font-bold text-blue-900">
                Manage Your Subscription
            </h1>

            {/* Current Plan */}
            <div className="mb-8 border-2 border-blue-600 bg-white shadow-sm">
                <div className="bg-blue-900 px-6 py-3 font-semibold text-white">
                    Current Active Plan
                </div>

                <div className="p-6">
                    {currentPlan ? (
                        <div className="flex flex-col justify-between md:flex-row md:items-center">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {currentPlan.name}
                                </h2>

                                <p className="mt-1 text-gray-600">
                                    {currentPlan.description}
                                </p>

                                <p className="mt-2 text-sm text-gray-500">
                                    Billed:{" "}
                                    {currentPlan.duration_type === "lifetime"
                                        ? "Once (Lifetime)"
                                        : `Every ${currentPlan.duration_value} ${currentPlan.duration_type}`}
                                </p>

                                {currentPlan.start_date && (
                                    <p className="mt-1 text-sm text-gray-500">
                                        Active From:{" "}
                                        {new Date(
                                            currentPlan.start_date
                                        ).toLocaleDateString("en-IN")}
                                    </p>
                                )}

                                {currentPlan.end_date &&
                                    currentPlan.duration_type !==
                                    "lifetime" && (
                                        <p className="text-sm text-gray-500">
                                            Expires On:{" "}
                                            {new Date(
                                                currentPlan.end_date
                                            ).toLocaleDateString("en-IN")}
                                        </p>
                                    )}
                            </div>

                            <div className="mt-4 text-right md:mt-0">
                                <span className="text-2xl font-bold text-blue-600">
                                    {formatPrice(currentPlan.price)}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            You do not currently have an active plan.
                        </p>
                    )}
                </div>
            </div>

            {/* Available Plans */}
            <h2 className="mb-4 text-xl font-bold text-blue-900">
                Available Plans
            </h2>

            {availablePlans.length === 0 ? (
                <div className="rounded border bg-gray-50 p-6 text-center text-gray-500">
                    No other plans available.
                </div>
            ) : (
                <div className="flex flex-col space-y-2">
                    {availablePlans.map((plan) => (
                        <div
                            key={plan.id}
                            className="flex flex-col md:items-center justify-between border border-gray-200 bg-white p-3 shadow-sm md:flex-row"
                        >
                            <div className="mb-4 flex-1 md:mb-0">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {plan.name}
                                </h3>

                                <p className="mt-1 text-sm text-gray-600">
                                    {plan.description}
                                </p>

                                <div className="mt-2 font-semibold text-blue-800">
                                    {formatPrice(plan.price)}

                                    <span className="ml-1 text-sm font-normal text-gray-500">
                                        /
                                        {plan.duration_type === "lifetime"
                                            ? " Lifetime"
                                            : ` ${plan.duration_value} ${plan.duration_type}`}
                                    </span>
                                </div>
                            </div>
                            <PaymentModal
                                open={showPayment}
                                plan={selectedPlan}
                                loading={updating}
                                onClose={() => setShowPayment(false)}
                                onPay={handlePayment}
                            />
                            <button
                                onClick={() => {
                                    setSelectedPlan(plan);
                                    setShowPayment(true);
                                }}
                                disabled={
                                    updating ||
                                    currentPlan?.plan_id === plan.id
                                }
                                className={`w-full px-6 py-2 font-semibold md:w-auto ${currentPlan?.plan_id === plan.id
                                    ? "cursor-not-allowed bg-gray-300 text-gray-600"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                            >
                                {currentPlan?.plan_id === plan.id
                                    ? "Current Plan"
                                    : updating
                                        ? "Updating..."
                                        : "Select Plan"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}