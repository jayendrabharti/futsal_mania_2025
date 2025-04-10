'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { RegisterIndividual } from '@/actions/registeration';
import Link from 'next/link';
import { LoaderCircle, ThumbsUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import paymentQR from '@/public/images/paymentQR.jpg';
import Image from 'next/image';
import uploadImage from '@/utils/uploadImage';

export default function IndividualRegistrationForm() {

    const {data:session} = useSession();
    const [submitted, setSubmitted] = useState(false);
    const [success,setSuccess] = useState(false);
    const [paymentImageURL,setPaymentImageURL] = useState(null);
    const [agreed,setAgreed] = useState(false);
    const [gettingURL,setGettingURL] = useState(false);

  const initialValues = {
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    regNo: '',
    year: '',
    course: '',
    transactionId: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Enter a valid 10-digit phone number')
      .required('Phone number is required'),
    regNo: Yup.string()
      .matches(/^[A-Za-z0-9\-]+$/, 'Invalid registration number')
      .required('Registration number is required'),
    year: Yup.string()
      .oneOf(['1', '2', '3', '4', '5'], 'Select a valid year')
      .required('Year is required'),
    course: Yup.string(),
    transactionId: Yup.string().required(),
  });

const handleSubmit = async (values) => {
    if(!paymentImageURL){
      alert("You must Upload payment Screenshot");
      return;
    }
    values.paymentImageURL = paymentImageURL;
    console.log(values);
    setSubmitted(true);
    try {
        const data = JSON.parse(await RegisterIndividual(values));
        if (data) {
            setSuccess(true);
        } else {
            setSubmitted(false);
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        setSubmitted(false);
        console.error('Error during registration:', error);
        alert('An error occurred. Please try again later.');
    }
};
const handleChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
        try {
            setGettingURL(true);
            const data = await uploadImage(file);
            console.log(data);
            setPaymentImageURL(data.url);
            setGettingURL(false);
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        }
        }
    }

return (
  <div className="flex flex-col items-center overflow-y-scroll pb-10 px-2">

    <h2 className="text-4xl font-bold mb-10 text-center sticky top-0 bg-black pt-5 p-2 w-full z-10">Individual Registration</h2>

    {success
    ?
    <div className='flex flex-col justify-center h-full w-full items-center'>
      <span className='text-2xl text-green-400 flex flex-row mb-4'>You are Successfully registered<ThumbsUp className='ml-2'/></span>
      <Link 
        href={'/dashboard'}
        className='py-2 px-4 hover:bg-gray-900 bg-gray-700 transition-all duration-100 active:scale-90 rounded-full'
      >Go to Dashboard</Link>
    </div>
    :
    submitted
    ?
    <div>Registering you...</div>
    :
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
    <Form className="space-y-6 w-full max-w-2xl">

      <div className="my-8 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-600 p-4">
        <p className="text-yellow-700 dark:text-yellow-300">
        Note: You will be put in a team by organizers.
        </p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <span className="font-semibold">Guidelines:</span>
        <ul className="list-disc list-inside text-gray-300 mt-2">
            <li>Do not attempt to register twice.</li>
            <li>Ensure no two players are registered with the same email ID.</li>
            <li>Check if all inputs are valid before submitting.</li>
            <li>If any input is invalid, the form won't submit.</li>
        </ul>
    </div>

      <InputField label="Name" name="name" />
      <InputField label="Email" name="email" type="email" disabled={true} />
      <InputField label="Phone" name="phone" />
      <InputField label="Registration Number" name="regNo" />

      <div className='relative'>
        <label className="block mb-2 font-medium text-gray-300">Year</label>
        <Field
          as="select"
          name="year"
          className="w-full border border-gray-700 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" className="bg-black text-gray-300">Select Year</option>
          <option value="1" className="bg-black text-gray-300">1st Year</option>
          <option value="2" className="bg-black text-gray-300">2nd Year</option>
          <option value="3" className="bg-black text-gray-300">3rd Year</option>
          <option value="4" className="bg-black text-gray-300">4th Year</option>
          <option value="5" className="bg-black text-gray-300">5th Year</option>
        </Field>
        <ErrorMessage
          name="year"
          component="p"
          className="text-red-400 text-sm mt-2 absolute bottom-0 right-2"
        />
      </div>

      <InputField label="Course" name="course" />

      
      <div className='p-4 bg-zinc-700 rounded-3xl flex flex-col justify-between items-center'>
        <Image
        src={paymentQR}
        alt={'paymentqr'}
        width={500}
        height={500}
        className='w-[200px] mx-auto rounded-2xl'
        />
        <span className='font-bold text-2xl p-2'>Pay ₹ 79 /- </span>
        <span className='line-through text-xl p-2'>₹ 99 /- </span>
        <span>Make payment, Upload Payment Screenshot and fill in transaction ID </span>
      </div>
      
      <div className="relative">
        <label className="block mb-2 font-medium text-gray-300">Upload Payment Screenshot</label>
        <input 
        type="file" 
        accept="image/*" 
        onChange={handleChange} 
        className="block w-full text-sm text-gray-300 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
      </div>

      {gettingURL
        && 
          <div className='flex flex-col justify-center items-center'>
              <span>Uploading Image...</span>
              <LoaderCircle className='mt-2 mx-auto animate-spin'/>
          </div>
      }

      {paymentImageURL && 
        <img
          src={paymentImageURL}
          alt='paymentss'
          width={200}
          height={200}
          className='mx-auto'
        />
      }

      <InputField label="Transaction ID" name="transactionId" />

          <div className='w-full flex'>
              <p>

                  <input type="checkbox" checked={agreed} onChange={(e)=>setAgreed(e.target.checked)} className='mr-2'/>
                  I agree to the&nbsp;
                  <a 
                      href='/docs/futsal_captains_undertaking.docx'
                      // target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 underline"
                  >Terms and Conditions</a>.
              </p>
          </div>


          <button
              disabled={!agreed || !paymentImageURL}
              type="submit"
              className="w-full disabled:cursor-not-allowed disabled:bg-gray-600 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
              Submit
          </button>
    </Form>
    </Formik>
    }
    
  </div>
);
}

// 🔧 Reusable input field component using Formik <Field>
function InputField({ label, name, type = 'text',disabled=false }) {
  return (
    <div className='relative'>
      <label htmlFor={name} className="block mb-2 font-medium">
        {label}
      </label>
      <Field
        type={type}
        name={name}
        id={name}
        disabled={disabled}
        className="w-full border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:brightness-40"
      />
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-sm mt-2 absolute bottom-0 right-2"
      />
    </div>
  );
}
