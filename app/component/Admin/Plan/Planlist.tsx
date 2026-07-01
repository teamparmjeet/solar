import React from "react";
import {
    CheckCircle2,
    XCircle,
    Edit,
    Trash2,
    Crown,
} from "lucide-react";

type PlanlistProps = {
    data: {
        type: any;
        id?: number;
        name: string;
        price: number;
        duration_type: "days" | "months" | "years" | "lifetime";
        duration_value?: number | null;
        status: number;
        description?: string;
    }[];
    onDelete: (id: number) => void;
};

export default function Planlist({ data, onDelete }: PlanlistProps) {
    const getDuration = (plan: PlanlistProps["data"][0]) => {
        if (plan.duration_type === "lifetime") return "Lifetime";

        return `${plan.duration_value} ${plan.duration_type}`;
    };

    return (
        <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 bg-linear-to-r from-amber-50 via-orange-50 to-white px-4 sm:px-4 lg:px-6 py-4 lg:py-5">
                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                        Subscription Plans
                    </h2>

                    <p className="mt-1 text-xs sm:text-sm text-slate-500">
                        Manage all available plans
                    </p>
                </div>


            </div>

            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-275 w-full">
                    <thead>
                        <tr className="bg-slate-50/80">
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                Plan
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                Price
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                Plan Type
                            </th>


                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                Duration
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                Description
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
                        {data.map((plan, index) => (
                            <tr
                                key={plan.id || index}
                                className="group border-b border-slate-100 transition-all hover:bg-amber-50/40"
                            >
                                {/* Plan */}
                                <td className="px-4 lg:px-6 py-4 lg:py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-r from-amber-400 to-orange-500 text-white">
                                            <Crown size={18} />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-slate-800">
                                                {plan.name}
                                            </h3>

                                            <span className="text-xs text-slate-500">
                                                ID #{plan.id}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Price */}
                                <td className="px-4 lg:px-6 py-4 lg:py-5">
                                    <span className="rounded-xl bg-green-50 px-3 py-2 text-sm font-bold text-green-700">
                                        ₹{Number(plan.price).toLocaleString()}
                                    </span>
                                </td>

                                {/* Type */}
                                <td className="px-4 lg:px-6 py-4 lg:py-5">
                                    <span className="rounded-xl bg-green-50 px-3 py-2 text-sm font-bold text-green-700">
                                        {plan.type
                                            ?.replace(/_/g, " ")
                                            .replace(/\b\w/g, (char: string) => char.toUpperCase())}
                                    </span>
                                </td>

                                {/* Duration */}
                                <td className="px-4 lg:px-6 py-4 lg:py-5">
                                    <span className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700">
                                        {getDuration(plan)}
                                    </span>
                                </td>

                                {/* Description */}
                                <td className="px-4 lg:px-6 py-4 lg:py-5 max-w-xs">
                                    <p className="truncate text-sm text-slate-600">
                                        {plan.description || "No description available"}
                                    </p>
                                </td>

                                {/* Status */}
                                <td className="px-4 lg:px-6 py-4 lg:py-5 text-center">
                                    {plan.status === 1 ? (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                                            <CheckCircle2 size={14} />
                                            Active
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700">
                                            <XCircle size={14} />
                                            Inactive
                                        </span>
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="px-4 lg:px-6 py-4 lg:py-5">
                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() => {
                                                if (plan.id && window.confirm("Are you sure you want to delete this plan?")) {
                                                    onDelete(plan.id);
                                                }
                                            }}
                                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100">
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
                                    No plans available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Mobile View */}
            <div className="md:hidden divide-y divide-slate-200">
                {data.map((plan, index) => (
                    <div
                        key={plan.id || index}
                        className="p-5 hover:bg-slate-50 transition"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-amber-400 to-orange-500 text-white">
                                    <Crown size={18} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-800">
                                        {plan.name}
                                    </h3>

                                    <p className="text-xs text-slate-500">
                                        ID #{plan.id}
                                    </p>
                                </div>
                            </div>

                            {plan.status === 1 ? (
                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                    Active
                                </span>
                            ) : (
                                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                                    Inactive
                                </span>
                            )}
                        </div>

                        <div className="mt-5 space-y-3 text-sm">

                            <div className="flex justify-between">
                                <span className="text-slate-500">Price</span>
                                <span className="font-semibold text-green-700">
                                    ₹{Number(plan.price).toLocaleString()}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-slate-500">Type</span>
                                <span className="font-medium">
                                    {plan.type
                                        ?.replace(/_/g, " ")
                                        .replace(/\b\w/g, (c: string) => c.toUpperCase())}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-slate-500">Duration</span>
                                <span>{getDuration(plan)}</span>
                            </div>

                            <div>
                                <p className="text-slate-500 mb-1">
                                    Description
                                </p>

                                <p className="text-slate-700">
                                    {plan.description || "No description available"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    if (
                                        plan.id &&
                                        window.confirm(
                                            "Are you sure you want to delete this plan?"
                                        )
                                    ) {
                                        onDelete(plan.id);
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
                        No plans available
                    </div>
                )}
            </div>
        </div>
    );
}