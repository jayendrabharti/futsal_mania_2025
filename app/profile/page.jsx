"use client";
import { User, Mail, Phone, Trophy, Calendar, Shield, Pencil } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from "react";
import { signIn, useSession, getProviders } from 'next-auth/react';
import uploadImage from '@/utils/uploadImage';
import { updatePP } from '@/actions/profile';


export default function Profile(){
  
  const { data: session, update} = useSession();
  const [providers, setProviders] = useState(null);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
    try {
      
      const data = await uploadImage(file);
      console.log(data);
      await updatePP(data.url);
      update();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
    }
  } 
  
  useEffect(()=>{
              const setUpProviders = async () => {
                  const response = await getProviders();
                  setProviders(response);
              } 
              setUpProviders();
  },[]);
          
  if(!session?.user)return(
      <div className="flex flex-col w-full h-full justify-center items-center">
          <span className="text-2xl font-bold">You need to Sign In to access this page</span>
          {providers && 
          Object.values(providers).map((provider,index)=>(
          <button
              key={index}
              className="text text-gray-300 hover:text-[#66f] p-2 hover:bg-zinc-800 rounded-xl transition-all duration-300 mt-5 flex flex-row items-center justify-center border border-gray-600 bg-zinc-900 cursor-pointer active:scale-90 scale-100"
              onClick={() => signIn(provider.id)}
          >
              Sign In with Google 
  
              <svg className="size-8 ml-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                  <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
          
          </button>
          ))}
      </div>
  )


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="bg-blue-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
            {session?.user?.image
                ?
                <Image
                    src={session?.user?.image}
                    alt='user'
                    width={100}
                    height={100}
                />
                :
                <User className="h-12 w-12 text-gray-400" />
            }
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{session?.user?.name}</h1>
              <p className="text-blue-200">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-200">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>{session?.user?.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-5 w-5 text-gray-400" />
                <span>{session?.user?.phone || "Not available"}</span>
              </div>
            </div>
          </div>
          
          {/* update pp */}
          <div className='flex flex-row'>
            <button className='relative border border-gray-600 w-full m-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-all duration-150 active:scale-75'>
              <span className='absolute left-1/2 -translate-x-1/2 w-max top-1/2 -translate-y-1/2'>Upload New Profile Picture</span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleChange} 
              className="w-full h-full opacity-0 m-2"
              />
            </button>
          </div>
      </div>
    </div>
  );
};
