'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import imageHeader from '../../../../assets/auth/signin.jpg';
import logoIcon from '../../../../assets/LOGO.jpg';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import supabase from '@/utils/Supabase';



const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const router = useRouter();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!password) {
            newErrors.password = 'Password is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);
        
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            toast.success('Sign in successful!');
            router.push('/user/home'); 
        } catch (error: any) {
            toast.error(error.message || 'Sign in failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    // const handleSignInWithGoogle = async () => {
    //     try {
    //         const { error } = await supabase.auth.signInWithOAuth({
    //             provider: 'google',
    //             // options: {
    //             //     redirectTo: `${location.origin}/auth/callback`,
    //             // },
    //         });

    //         if (error) throw error;
    //     } catch (error: any) {
    //         toast.error(error.message || 'Google sign in failed');
    //     }
    // };

    return (
        <div className='min-h-screen flex flex-col lg:flex-row'>
            {/* Left Side (Form) */}
            <ToastContainer position="top-right" />
            <div className='flex flex-col items-center justify-center gap-8 w-full lg:w-1/2 px-6 py-10'>
                <form 
                    className='w-full max-w-md flex flex-col'
                    onSubmit={handleSubmit}
                >
                    <Image
                        src={logoIcon}
                        alt="logo"
                        width={300}
                        height={300}
                        className='mb-6 mx-auto'
                    />
                    <h1 className='text-[4.4rem] font-bold text-black mb-6 text-center'>Sign In</h1>

                    <div className='flex flex-col gap-2 mb-4'>
                        <label className='text-black text-xl'>Email</label>
                        <input
                            type="email"
                            placeholder='Enter your email'
                            className={`w-full py-3 px-4 text-black text-xl rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} outline-none`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className='flex flex-col gap-2 mb-6'>
                        <label className='text-black text-xl'>Password</label>
                        <input
                            type="password"
                            placeholder='Enter your password'
                            className={`w-full py-3 px-4 text-black text-xl rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} outline-none`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className='text-xl w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 transition duration-200 disabled:opacity-50'
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>

                    <div className="flex items-center my-4">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-3 text-gray-500">or</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* <button
                        type="button"
                        onClick={handleSignInWithGoogle}
                        className="w-full flex items-center justify-center gap-2 bg-white text-black border border-gray-300 font-semibold py-3 rounded-lg hover:bg-gray-50 transition duration-200"
                    >
                        <Image 
                            src="https://www.google.com/favicon.ico" 
                            alt="Google" 
                            width={20} 
                            height={20} 
                        />
                        Continue with Google
                    </button> */}

                    <div className='my-5 w-full text-center'>
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link 
                                href="/sign-up" 
                                className='text-blue-500 hover:text-blue-600 font-medium'
                            >
                                Register here
                            </Link>
                        </p>
                    </div>

                    <div className='text-center mt-2'>
                       
                        <Link 
                            href="/reset" 
                            className='text-blue-500 hover:text-blue-600 text-sm'
                        >
                            Forgot password?
                        </Link>
                        
                    </div>
                    <Link 
                        href="/" 
                        className="text-black-500 hover:text-gray-700 text-sm"
                        >
                        Back
                    </Link>
                </form>
            </div>

            {/* Right Side (Image/Decoration) */}
            <div className="w-full lg:w-1/2 h-[300px] lg:h-auto flex justify-center items-center bg-yellow-500 
                            rounded-t-[3rem] lg:rounded-tr-none lg:rounded-br-none 
                            lg:rounded-tl-[3rem] lg:rounded-bl-[3rem] overflow-hidden">
                <div className="relative w-full h-full">
                    <Image
                        src={imageHeader}
                        alt="headerOne"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignIn;