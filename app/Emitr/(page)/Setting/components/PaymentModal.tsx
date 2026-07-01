import { Plan } from "./PlanSettings";

interface Props {
    open: boolean;
    plan: Plan | null;
    onClose: () => void;
    onPay: () => void;
    loading: boolean;
}

export default function PaymentModal({
    open,
    plan,
    onClose,
    onPay,
    loading
}: Props) {

    if (!open || !plan) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl w-105 p-6">

                <h2 className="text-xl font-bold">
                    Confirm Subscription
                </h2>

                <p className="mt-3">
                    <b>{plan.name}</b>
                </p>

                <p>
                    ₹{plan.price}
                </p>

                <p className="mt-2 text-gray-500">
                    Duration :
                    {
                        plan.duration_type === "lifetime"
                            ?
                            "Lifetime"
                            :
                            `${plan.duration_value} ${plan.duration_type}`
                    }
                </p>

                <div className="mt-6 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 border"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onPay}
                        disabled={loading}
                        className="bg-blue-600 text-white px-5 py-2 rounded"
                    >
                        {loading ? "Processing..." : "Pay Now (Demo)"}
                    </button>

                </div>

            </div>

        </div>
    );
}