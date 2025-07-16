import React, {useState} from "react"
import viteLogo from "/vite.svg"
import javascriptLogo from "./javascript.svg"

import Card from "./components/Card.jsx";
import Label from "./components/Label.jsx";
import Button from "./components/Button.jsx";
import Badge from "./components/Badge.jsx";
import {Input} from "./components/Input.jsx";
import {Trash2} from "lucide-react";

export default function App() {
    const [activeSubject, setActiveSubject] = useState("matematica-1")

    const subjects = [
        { id: "matematica-1", name: "Mathematics 1", icon: "📐" },
        { id: "matematica-2", name: "Mathematics 2", icon: "📊" },
        { id: "matematica-3", name: "Mathematics 3", icon: "∫" },
    ]

    const currentSubject = subjects.find((s) => s.id === activeSubject)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            {/*<Calculator className="w-6 h-6 text-white" />*/}
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800">Mathematical Calculator</h1>
                    </div>
                    <p className="text-slate-600">Solve mathematical problems with ease and precision</p>
                </div>

                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="p-4 space-y-3">
                            <div className="flex items-center gap-2 text-lg font-semibold text-slate-700 mb-2">
                                {/*<BookOpen className="w-5 h-5" />*/}
                                Subjects
                            </div>
                            {subjects.map((subject) => (
                                <button
                                    key={subject.id}
                                    onClick={() => setActiveSubject(subject.id)}
                                    className={`w-full p-3 rounded-lg text-left flex items-center gap-3 ${
                                        activeSubject === subject.id
                                            ? "bg-blue-50 border-2 border-blue-300"
                                            : "bg-white border border-slate-200 hover:bg-slate-50"
                                    }`}
                                >
                                    <span className="text-xl">{subject.icon}</span>
                                    <div className="flex flex-col">
                                        <span className="text-slate-800 font-medium">{subject.name}</span>
                                        {activeSubject === subject.id && (
                                            <Badge className="mt-1 text-xs">Active</Badge>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card className="shadow-lg">
                            {/* Subject Header */}
                            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center gap-2 text-lg font-semibold">
                                <span className="text-2xl">{currentSubject.icon}</span>
                                {currentSubject.name}
                            </div>

                            {/* Form Content */}
                            <div className="p-6 space-y-6">
                                {/* Input Section */}
                                <div className="space-y-3">
                                    <Label htmlFor="input" className="flex items-center gap-2 font-semibold">
                                        {/*<Zap className="w-4 h-4 text-blue-600" />*/}
                                        Enter Your Expression
                                    </Label>
                                    <Input
                                        id="input"
                                        placeholder="e.g., 2 + 3 * 4 or (5 + 3) / 2"
                                    />
                                    <p className="text-sm text-slate-500">
                                        Supports basic arithmetic operations: +, -, *, /, and parentheses
                                    </p>
                                </div>

                                {/* Buttons */}
                                <Button className="w-full">Calculate Result</Button>

                                {/* Answer */}
                                <div>
                                    <Label className="font-semibold">Your Answer</Label>
                                    <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 text-slate-400 mt-2">
                                        Your calculated result will appear here
                                    </div>
                                </div>

                                {/* Clear Button */}
                                <Button
                                    variant="outline"
                                    className="w-full flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear All
                                </Button>
                            </div>
                        </Card>

                        {/* Quick Tips */}
                        <Card className="border border-blue-200 bg-blue-50 p-4">
                            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                <span>💡</span>
                                Quick Tips
                            </h3>
                            <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                                <li>Use parentheses to control order of operations</li>
                                <li>Press Enter in the input field to calculate quickly</li>
                                <li>Switch between different mathematics subjects using the sidebar</li>
                                <li>Clear button resets both input and answer fields</li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )

}
