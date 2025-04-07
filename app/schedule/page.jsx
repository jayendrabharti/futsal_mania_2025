import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { schedule } from '@/data/schedule';

export default function Schedule() {
    return (
        <div className="max-w-full w-4xl mx-auto px-4 py-8 overflow-y-scroll">
            <div className="flex items-center space-x-4 mb-8">
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Tournament Schedule
                </h1>
            </div>

            <div className="my-8 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-600 p-4">
                <p className="text-yellow-700 dark:text-yellow-300">
                    Note: Schedule is subject to change. Please check back regularly for
                    updates.
                </p>
            </div>

            <div className="space-y-8">
                {schedule?.map((day, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3">
                            <h2 className="text-xl font-semibold">{day.date}</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {day.events.map((event, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                    >
                                        <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                        <div className="flex-grow">
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                {event.time}
                                            </p>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">
                                                {event.event}
                                            </p>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                {event.venue}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
