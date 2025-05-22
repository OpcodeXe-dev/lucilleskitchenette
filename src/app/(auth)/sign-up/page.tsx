'use client'

import React, { useState } from 'react';
import imageHeader from '../../../../assets/auth/signup.jpg';
import Image from 'next/image';
import logoIcon from '../../../../assets/LOGO.jpg';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import supabase from '@/utils/Supabase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);
        
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            toast.success('Sign up successful! Please check your email for confirmation.');


            setConfirmPassword('');
            setEmail('');
            setPassword('');
            
        } catch (error: any) {
            toast.error(error.message || 'Sign up failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Side (Form) */}
            <ToastContainer position="top-right" />

            <div className="flex flex-col items-center justify-center gap-8 w-full lg:w-1/2 px-6 py-10">
                <form className="w-full max-w-md" onSubmit={handleSubmit}>
                    <Image
                        src={logoIcon}
                        alt="logo"
                        width={300}
                        height={300}
                        className='mb-6 mx-auto'
                    />
                    <h1 className="text-[4.4rem] font-bold text-black mb-6 text-center">Sign Up</h1>

                    <div className="flex flex-col gap-2 mb-4">
                        <label className="text-black text-[xl">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={`w-full py-3 px-4 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} outline-none`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        <label className="text-black text-[xl">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className={`w-full py-3 px-4 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} outline-none`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="flex flex-col gap-2 mb-6">
                        <label className="text-black text-[xl">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            className={`w-full py-3 px-4 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} outline-none`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 transition duration-200 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    <div className="my-5 w-full text-center">
                        <p>
                            Already have an account?{' '}
                            <span 
                                className="text-blue-500 cursor-pointer hover:text-blue-600"
                                onClick={() => router.push('sign-in')}
                            >
                                Sign in here
                            </span>
                        </p>
                    </div>
                </form>
            </div>

            {/* Right Side (Image) */}
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

export default SignUp;
