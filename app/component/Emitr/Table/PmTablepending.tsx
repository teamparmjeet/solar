"use client";

import React from "react";
import {
    Sun,
    Eye,
    CheckCircle,
    Clock3,
} from "lucide-react";

type PmItem = {
    status: string;
    id: string | number;
    applicant_name?: string;
    mobile?: string;
    village?: string;
    district?: string;
    consumer_number?: string | number;
    solar_capacity_kw?: string | number;
    sanctioned_load?: string | number;
    loan_required?: boolean;
};

export default function PmTablePending({ data }: { data: PmItem[] }) {


    return (
        <div className=" ">
            <div className="overflow-hidden rounded border border-yellow-200 bg-white ">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-275">
                        <thead>
                            <tr className="bg-blue-900 text-white">
                                <th className="px-5 py-2 text-left">
                                    Applicant
                                </th>
                                <th className="px-5 py-2 text-left">
                                    Mobile
                                </th>
                                <th className="px-5 py-2 text-left">
                                    Location
                                </th>
                                <th className="px-5 py-2 text-left">
                                    Consumer No.
                                </th>
                                <th className="px-5 py-2 text-center">
                                    Solar Capacity
                                </th>
                                <th className="px-5 py-2 text-center">
                                    Load
                                </th>
                                <th className="px-5 py-2 text-center">
                                    Loan
                                </th>
                                <th className="px-5 py-2 text-center">
                                    Status
                                </th>
                                <th className="px-5 py-2 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-yellow-50 transition"
                                >

                                    <td className="px-5 py-2">
                                        <div>
                                            <p className=" font-normal text-gray-600">
                                                {item.applicant_name}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-5 py-2">
                                        {item.mobile}
                                    </td>

                                    <td className="px-5 py-2">
                                        {item.village}, {item.district}
                                    </td>

                                    <td className="px-5 py-2 font-medium">
                                        {item.consumer_number}
                                    </td>

                                    <td className="px-5 py-2 text-center">
                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                                            {item.solar_capacity_kw} KW
                                        </span>
                                    </td>

                                    <td className="px-5 py-2 text-center">
                                        {item.sanctioned_load} KW
                                    </td>

                                    <td className="px-5 py-2 text-center">
                                        {item.loan_required ? (
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                YES
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                                                NO
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-5 py-2 text-center">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                                            <Clock3 size={14} />
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-2">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200">
                                                <Eye size={18} />
                                            </button>

                                            <button className="rounded-lg bg-green-100 p-2 text-green-600 hover:bg-green-200">
                                                <CheckCircle size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}