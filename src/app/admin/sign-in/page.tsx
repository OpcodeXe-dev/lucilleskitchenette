'use client'
import supabase from "@/utils/Supabase";
import { useRouter } from "next/navigation";
import imageHeader from '../../../../assets/auth/signin.jpg';
import { useState } from "react";

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const signIn = async (e: any) => {
        e.preventDefault();
    
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
    
        try {
            const { data, error } = await supabase
                .from('admin_account')
                .select('*')
                .eq('email', email)
                .eq('password', password);
    
            if (error) {
                console.log(error);
                alert('An error occurred during login');
                return;
            }
    
            if (data.length === 0) {
                alert('Invalid email or password');
                return;
            }
    

            localStorage.setItem('adminAccount', JSON.stringify(data[0]));


            alert('Successfully logged in');


            router.push('/admin/dashboard')
            // You can now handle setting auth state here if needed
        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    };
    

    return (
        <div
            className='min-h-screen flex items-center justify-center bg-cover bg-center'
            style={{
                backgroundImage: `url(${imageHeader.src})`,
            }}
        >
            <div className='flex flex-col items-center justify-center w-full lg:w-1/3 bg-white bg-opacity-90 border-4 border-yellow-500 rounded-lg shadow-xl p-8'>
                <h1 className='text-3xl font-semibold text-black mb-6 text-center'>Admin Sign In</h1>
    
                <form 
                onSubmit={signIn}
                className='w-full'>
                    {/* Email Input */}
                    <div className='flex flex-col gap-2 mb-4'>
                        <label className='text-black font-medium'>User</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder='Enter admin user'
                            className='w-full py-3 px-4 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200'
                        />
                    </div>
    
                    {/* Password Input */}
                    <div className='flex flex-col gap-2 mb-6'>
                        <label className='text-black font-medium'>Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Enter your password'
                            className='w-full py-3 px-4 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200'
                        />
                    </div>
    
                    {/* Sign In Button */}
                    <button
                        type='submit'
                        className='w-full bg-yellow-500 cursor-pointer text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 transition duration-200'
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
    
}

export default SignIn;
