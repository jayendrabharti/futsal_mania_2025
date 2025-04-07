import { Calendar, MapPin, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-12 overflow-y-scroll max-w-full">
      {/* Hero Section */}
      <div 
        className="h-[500px] bg-cover bg-center"
      >
        <div className="flex flex-col  max-w-7xl mx-auto px-4 h-full justify-center items-center">
          <h1 className="text-5xl font-bold mb-4">Futsal Mania 2025</h1>
            <p className="text-xl mb-8">The biggest futsal tournament of the year</p>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Register Now
            </Link>
        </div>
      </div>

      {/* Event Details */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-start space-x-4">
            <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Date & Time</h3>
              <p className="text-gray-600 dark:text-gray-400">March 15-20, 2025</p>
              <p className="text-gray-600 dark:text-gray-400">9:00 AM - 6:00 PM</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-start space-x-4">
            <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Venue</h3>
              <p className="text-gray-600 dark:text-gray-400">City Sports Complex</p>
              <p className="text-gray-600 dark:text-gray-400">123 Sports Avenue</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-start space-x-4">
            <Trophy className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">Prize Pool</h3>
              <p className="text-gray-600 dark:text-gray-400">1st Place: $1,000</p>
              <p className="text-gray-600 dark:text-gray-400">2nd Place: $500</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">About the Tournament</h2>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Join us for the most exciting futsal tournament of the year! Futsal Mania 2025 brings together the best teams from across the region to compete for glory and amazing prizes.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Whether you're a seasoned player or new to the sport, this tournament offers an incredible opportunity to showcase your skills and be part of an unforgettable experience.
          </p>
          <div className="mt-8 text-center">
            <Link
              href="/rules"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-500"
            >
              View Tournament Rules →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
