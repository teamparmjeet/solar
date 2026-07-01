"use client";

import {
    CreditCard,
    User,
    Bell,
    ChevronRight,
} from "lucide-react";

interface Props {
    onSelect: (value: string) => void;
}

export default function SettingsMenu({ onSelect }: Props) {
    const settings = [
        {
            id: "profile",
            title: "Profile Settings",
            description: "Update your profile information and account details.",
            icon: User,
            color: "bg-green-100 text-green-600",
        },
        {
            id: "plan",
            title: "Plan Settings",
            description: "View your active plan and activate a new subscription.",
            icon: CreditCard,
            color: "bg-blue-100 text-blue-600",
        },
        {
            id: "notification",
            title: "Notification Settings",
            description: "Manage email and system notifications.",
            icon: Bell,
            color: "bg-yellow-100 text-yellow-600",
        },
    ];

    return (
        <div className="  mx-auto bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
            
            {/* Header Section */}
            <div className="border-b border-gray-200 px-6 py-5 bg-gray-50/50">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1 text-sm">
                    Manage your Emitra account settings.
                </p>
            </div>

            {/* List Section */}
            <div className="flex flex-col">
                {settings.map((item) => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                            className="group flex items-center justify-between p-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-all duration-200 text-left w-full"
                        >
                            <div className="flex items-center gap-5">
                                
                                {/* Icon */}
                                <div
                                    className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${item.color}`}
                                >
                                    <Icon size={16} />
                                </div>

                                {/* Text Content */}
                                <div>
                                    <h2 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        {item.description}
                                    </p>
                                </div>
                                
                            </div>

                            {/* Action Arrow */}
                            <ChevronRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                        </button>
                    );
                })}
            </div>
            
        </div>
    );
}