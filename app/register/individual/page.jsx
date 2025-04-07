'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { RegisterIndividual } from '@/actions/registeration';
import Link from 'next/link';
import { ThumbsUp } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function IndividualRegistrationForm() {

    const {data:session} = useSession();
    const [submitted, setSubmitted] = useState(false);
    const [success,setSuccess] = useState(false);

  const initialValues = {
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    regNo: '',
    year: '',
    course: '',
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
  });

const handleSubmit = async (values) => {
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

return (
    <div className="flex flex-col items-center overflow-y-scroll pb-10">

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

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
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
