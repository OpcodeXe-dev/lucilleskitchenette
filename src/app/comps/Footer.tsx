'use client';
import { useRouter } from 'next/navigation';
const Footer = () => {
    const router = useRouter();
    return (
        <div className="bg-yellow-300 px-4 py-8 md:px-[5%] mt-[3rem]">
            <div className="mx-auto">
                <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
                    <div className="flex flex-col gap-4 w-full md:w-1/3">
                        <h2 className="font-bold text-xl md:text-2xl">
                            Lucille's Kitchenette
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base">
                            Lucille's Kitchenette brings the comfort of home to your table,
                            where every bite is a blend of love, tradition, and homemade goodness.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-1/3">
                        <h2 className="font-bold text-xl md:text-2xl">
                            Contact Us
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base">
                            Phone: 0933 336 6674
                        </p>
                        <p className="text-gray-700 text-sm md:text-base">
                            Email: lucilleskitchenette@gmail.com
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-1/3">
                        <h2 className="font-bold text-xl md:text-2xl">
                            Legal
                        </h2>
                        <p onClick={() => router.push('/user/privacy')} className="text-gray-700 hover:text-black text-sm md:text-base transition-colors cursor-pointer">
                            Privacy Policy
                        </p>
                        <p onClick={() => router.push('/user/terms')} className="text-gray-700 hover:text-black text-sm md:text-base transition-colors cursor-pointer">
                            Terms of Service
                        </p>
                    </div>
                </div>

                <div className="border-t border-yellow-600 pt-4 text-center text-sm text-gray-700">
                    © 2025 Lucille's Kitchenette, All Rights Reserved.
                </div>
            </div>
        </div>
    );
}

export default Footer;