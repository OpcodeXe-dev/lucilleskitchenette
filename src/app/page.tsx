'use client';

import Image from "next/image";
import headerOne from '../../assets/landing.jpeg';
import logoImage from '../../assets/LOGO-removebg-preview.png';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
 
  
  const routes = {
    'MENU TODAY': '/our-menu',
    'SIGN UP': '/sign-up',
    'SIGN IN': '/sign-in',
    'FAQS': '/faqs',
    'ABOUT US': '/user/discover-more',
    'CONTACT US': '/user/contact',
    'ADMIN': '/admin/sign-in'
  };

  return (
    <div className="min-h-screen w-full relative overflow-auto">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={headerOne}
          alt="header background"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Logo and Tagline */}
        <div className="w-full max-w-4xl flex flex-col items-center text-center mb-8">
          <Image
            src={logoImage}
            alt="logo"
            width={400}
            height={300}
            className="object-contain w-full max-w-xs sm:max-w-md md:max-w-lg"
            priority
          />
          <p className=" text-white text-lg sm:text-xl md:text-2xl mt-2 font-bold drop-shadow-lg px-2">
            "MASARAP SA UNANG TINGIN, PAG-KINAIN GUSTO MO NG ULIT-ULITIN"
          </p>
          <small className="text-white text-lg sm:text-xl md:text-2xl mt-4 font-bold drop-shadow-lg px-2 hidden lg:flex">
          Hindi lang paningin ang mabibighani—pati panlasa mo mapapa-‘Wow!’
          </small>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-md bg-white bg-opacity-90 rounded-xl p-4 shadow-xl flex flex-col gap-4">
          {Object.entries(routes).map(([label, path]) => (
            <button
              key={label}
              onClick={() => router.push(path)}
              className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white rounded-lg transition-colors font-bold text-base sm:text-lg"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
