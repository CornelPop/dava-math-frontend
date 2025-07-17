import React from "react"

export default function Header() {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-600 rounded-lg" />
                <h1 className="text-3xl font-bold text-slate-800">Mathematical Calculator</h1>
            </div>
            <p className="text-slate-600">Solve mathematical problems with ease and precision</p>
        </div>
    )
}
