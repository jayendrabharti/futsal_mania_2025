"use client";
import { ArrowBigRight, Calendar, Info, MapPin, Trophy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import heroBg from "@/public/images/heroBg.png"
import heroImage from "@/public/images/heroImage.png"
import { Wallpoet } from 'next/font/google';

const wallpoet = Wallpoet({
  subsets: ['latin'],
  weight: '400', // Wallpoet only has one weight
});

export default function Home() {
  return (
    <div className="overflow-y-scroll">
      {/* Hero Section */}
      <div 
        className="flex flex-col justify-center items-center p-6 min-h-full mb-6 bg-cover bg-center"
        style={{backgroundImage: `url(${heroBg.src})`}}
      >
        <div className="flex flex-col space-y-8 max-w-7xl mx-auto px-4 h-full justify-center items-center text-center">
          <Image
            src={heroImage}
            alt='heroImage'
            width={500}
            height={500}
            className=''
          />
            {/* <h1 className="text-5xl font-bold mb-4">Futsal Mania 2025</h1> */}
                <p className={`${wallpoet.className} text-2xl text-blue-300 font-bold max-w-md`}>The biggest futsal tournament in Lovely Professional University</p>

                <div className='flex flex-col space-y-2 md:space-y-0 md:flex-row space-x-2'>
                  <Link
                  href="/register"
                  className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 transition duration-300 flex flex-row items-center active:scale-75"
                  >
                    Register Now
                    <ArrowBigRight className='ml-2 size-6 transition-all duration-200'/>
                  </Link>

                  <button 
                    className="flex flex-row bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-300 active:scale-75"
                    onClick={()=>document.getElementById('details').scrollIntoView({behavior:'smooth'})}  
                  >
                    Learn More
                    <Info className='ml-2 size-6 group-hover:ml-3 transition-all duration-200'/>
                  </button>
                </div>
              </div>
              </div>

        {/* Event Details */}
      <section id='details' className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tournament Details</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Date */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Date & Time</h3>
              <p className="text-gray-400">13 April - 20 April 2025</p>
            </div>

            {/* Venue */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Venue</h3>
              <p className="text-gray-400">Block 18 Ground</p>
            </div>

            {/* Prize Pool */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-md flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Prize Pool</h3>
              <p className="text-gray-400">₹ 10,000 /- plus</p>
            </div>
          </div>
        </div>
      </section>


      {/* about */}
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
