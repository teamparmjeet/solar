import React from 'react'

interface Props {
    onBack: () => void;
}

export default function ProfileSettings({ onBack }: Props) {
    return (
        <div className=" mx-auto flex flex-col">

            <button
                onClick={onBack}
                className="mb-2 px-4 py-2 rounded w-fit bg-gray-200 hover:bg-gray-300"
            >
                ← Back to Settings
            </button>

            ProfileSettings
        </div>
    );
}