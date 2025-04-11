'use client';

import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GetAllPlayerEmailIds, RegisterTeam } from '@/actions/registeration';
import { useEffect, useState } from 'react';
import { LoaderCircle, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import paymentQR from '@/public/images/paymentQR.jpg';
import Image from 'next/image';
import uploadImage from '@/utils/uploadImage';

export default function TeamRegistrationForm() {

    const {data:session} = useSession();
    const [submitted, setSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [paymentImageURL,setPaymentImageURL] = useState(null);
    const [agreed,setAgreed] = useState(false);
    const [gettingURL,setGettingURL] = useState(false);

    useEffect(()=>{
        const call = async()=>{
            const data = JSON.parse(await GetAllPlayerEmailIds());
            console.log(data);
        } 
        call();
    },[])

    const initialPlayer = { name: '', regNo: '', year: '', course: '', email: '', phone: '' };

    const initialValues = {
        teamName: '',
        captain: { 
            name: session?.user?.name || '', 
            email: session?.user?.email || '', 
            regNo: '', 
            year: '', 
            course: '', 
            phone: '' 
        },
        players: Array(4).fill({ ...initialPlayer }),
        substitutes: [],
        transactionId: "",
    };

    const playerSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        regNo: Yup.string().required('Reg No is required'),
        year: Yup.string().oneOf(['1', '2', '3', '4', '5']).required('Year is required'),
        course: Yup.string().required('Course is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string()
            .matches(/^\d{10}$/, 'Phone must be a 10-digit number')
            .required('Phone is required'),
    });

    const validationSchema = Yup.object({
        teamName: Yup.string().required('Team name is required'),
        captain: playerSchema,
        players: Yup.array().of(playerSchema),
        substitutes: Yup.array().of(playerSchema),
        transactionId: Yup.string().required(),
    });
 
    const handleSubmit = async (values) => {


        const captain = { ...values.captain, category: "captain" };
        const players = values.players.map(p => ({ ...p, category: "player" }));
        const substitutes = values.substitutes.map(p => ({ ...p, category: "player" }));

        const teamList = [
            captain,
            ...players,
            ...substitutes,
        ];

        let sameEmail=false;
        const emailSet = new Set();
        for (const member of teamList) {
            if (emailSet.has(member.email)) {
            sameEmail = true;
            alert(`The email ${member.email} is repeated. Please ensure all emails are unique.`);
            return;
            }
            emailSet.add(member.email);
        }

        const alreadyRegisteredEmails = JSON.parse(await GetAllPlayerEmailIds());
        for (const member of teamList) {
            if (alreadyRegisteredEmails.includes(member.email)) {
            alert(`The email ${member.email} is already registered..`);
            return;
            }
        }

        if(!paymentImageURL){
            alert("You must Upload payment Screenshot");
            return;
          }
        values.paymentImageURL = paymentImageURL;
        setSubmitted(true);
        try {
            console.log(values)
            const data = JSON.parse(await RegisterTeam(values));
            if (data) {
                setSuccess(true);
            } else {
                setSubmitted(false);
                alert('Registration failed. Refresh this page to confirm registration status.');
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
            <h2 className="text-4xl font-bold mb-10 text-center sticky top-0 bg-black pt-5 p-2 w-full z-10">
                Team Registration
            </h2>

            {success ? (
                <div className='flex flex-col justify-center h-full w-full items-center'>
                    <span className='text-2xl text-green-400 flex flex-row mb-4'>Team Successfully registered<ThumbsUp className='ml-2'/></span>
                    <Link 
                        href={'/dashboard'}
                        className='py-2 px-4 hover:bg-gray-900 bg-gray-700 transition-all duration-100 active:scale-90 rounded-full'
                    >Go to Dashboard</Link>
                </div>
            ) : submitted ? (
                <div>Registering team...</div>
            ) : (
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values }) => (
                        <Form className="space-y-6 w-full max-w-3xl px-2">

                            <div className="my-8 bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-600 p-4">
                            <p className="text-yellow-700 dark:text-yellow-300">
                            Note: The team name should not contain references of any region, state, city or area. It is strictly prohibited from the university.
                                </p>
                            </div>
                            
                            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                                <span className="font-semibold">Guidelines:</span>
                                <ul className="list-disc list-inside text-gray-300 mt-2">
                                    <li>Contact <b>+91 8800534849</b> in case of any issues.</li>
                                    <li>Do not attempt to register twice.</li>
                                    <li>Ensure no two players are registered with the same email ID.</li>
                                    <li>Check if all inputs are valid before submitting.</li>
                                    <li>If any input is invalid, the form won't submit.</li>
                                </ul>
                            </div>

                            <InputField label="Team Name" name="teamName" />

                            <h3 className="text-2xl font-semibold mt-6 mb-2 ml-2">Captain</h3>
                            <PlayerFields baseName="captain" disableEmail={true}/>

                            {values.players.map((_, index) => (
                                <div key={index}>
                                    <h3 className="text-xl font-semibold mt-6 mb-2 ml-2">Player {index + 2}</h3>
                                    <PlayerFields baseName={`players[${index}]`} />
                                </div>
                            ))}

                            <FieldArray name="substitutes">
                                {({ push, remove }) => (
                                    <>
                                        <div className="flex justify-between items-center mt-6">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if(values.substitutes.length < 3)
                                                    push({ ...initialPlayer })
                                                }}
                                                className="px-3 py-1 bg-blue-700 text-white rounded-md hover:bg-blue-800 ml-auto"
                                            >
                                                + Add Player
                                            </button>
                                        </div>

                                        {values.substitutes.map((_, index) => (
                                            <div key={index} className="relative border border-gray-600 p-4 mt-4 rounded-lg">
                                                <h4 className="font-medium">Player {index + 6}</h4>
                                                <PlayerFields baseName={`substitutes[${index}]`} />
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="absolute top-2 right-2 text-sm text-blue-700 hover:underline"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </FieldArray>

                            <div className='p-4 bg-zinc-700 rounded-3xl flex flex-col justify-between items-center'>
                                <Image
                                    src={paymentQR}
                                    alt={'paymentqr'}
                                    width={500}
                                    height={500}
                                    className='w-[200px] mx-auto rounded-2xl'
                                />
                                <span className='font-bold text-2xl p-2'>Pay ₹ 399 /- </span>
                                <span className='line-through text-xl p-2'>₹ 599 /- </span>
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

                            <InputField label={"Transaction ID"} name="transactionId"/>


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
                    )}
                </Formik>
            )}
        </div>
    );
}

// 👤 Reusable player fields for captain, players, substitutes
function PlayerFields({ baseName,disableEmail}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border bg-zinc-900 border-gray-600 p-4 rounded-lg">
            <InputField label="Name" name={`${baseName}.name`} />
            <InputField label="Registration Number" name={`${baseName}.regNo`} />
            <SelectField label="Year" name={`${baseName}.year`} />
            <InputField label="Course" name={`${baseName}.course`} />
            <InputField label="Email" name={`${baseName}.email`} type="email" disabled={disableEmail}/>
            <InputField label="Phone" name={`${baseName}.phone`} type="tel" />
        </div>
    );
}
 
// 🧱 Input field component
function InputField({ label, name, type = 'text',disabled=false}) {
    return (
        <div className="relative">
            <label htmlFor={name} className="block mb-2 font-medium text-gray-300">
                {label}
            </label>
            <Field
                type={type}
                name={name}
                id={name}
                placeholder={label}
                disabled={disabled}
                className="w-full border border-gray-700 text-gray-300 bg-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:brightness-40"
            />
            <ErrorMessage name={name} component="p" className="text-red-400 text-sm mt-1" />
        </div>
    );
}

// 📘 Year selector
function SelectField({ label, name }) {
    return (
        <div className="relative">
            <label className="block mb-2 font-medium text-gray-300">{label}</label>
            <Field
                as="select"
                name={name}
                className="w-full border border-gray-700 text-gray-300 bg-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
            </Field>
            <ErrorMessage name={name} component="p" className="text-red-400 text-sm mt-1" />
        </div>
    );
}
