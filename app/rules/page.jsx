import React from 'react';
import { ScrollText } from 'lucide-react';
import { rules } from '@/data/rules';

export default function Rules() {
    return (
        <div className="max-w-full w-5xl mx-auto px-4 py-8 overflow-y-scroll">
            <div className="flex items-center space-x-4 mb-8">
                <ScrollText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Tournament Rules</h1>
            </div>

            <div className="space-y-8">
                {rules.map((section, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3">
                            <h2 className="text-xl font-semibold">{section.category}</h2>
                        </div>
                        <div className="p-6">
                            <ul className="space-y-3">
                                {section.items.map((rule, ruleIndex) => (
                                    <li key={ruleIndex} className="flex items-start">
                                        <span className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            {ruleIndex + 1}
                                        </span>
                                        <span className="ml-3 text-gray-900 dark:text-gray-200">{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-blue-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Important Notes
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>All decisions by the referee are final</li>
                    <li>Teams must arrive 15 minutes before their scheduled match time</li>
                    <li>Rules are subject to modification by tournament organizers</li>
                    <li>Fair play is expected from all participants</li>
                </ul>
            </div>
        </div>
    );
}
