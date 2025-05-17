'use client'

import Image from "next/image";
import headerOne from '../../../../assets/homepage/one.jpg'
import spag from '../../../../assets/homepage/menu/Spag.jpg'
import ChickenWings from '../../../../assets/homepage/menu/Chicken.jpg'
import KareKare from '../../../../assets/homepage/menu/KARE-KARE BAGNET.jpg'
import Header from "@/app/comps/Header";
import IsLoggedIn from "@/utils/IsloggedIn";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [user] = IsLoggedIn()
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log(user)
    }
  }, [user])
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemArr = [
    {
      id: 1,
      title: "Filipino Spaghetti",
      image: spag
    },
    {
      id: 2,
      title: "Kare Kare",
      image: KareKare
    },
    {
      id: 3,
      title: "Chicken Wings",
      image: ChickenWings
    },
    {
      id: 4,
      title: "Filipino Spaghetti",
      image: spag
    },
    {
      id: 5,
      title: "Kare Kare",
      image: KareKare
    },
    {
      id: 7,
      title: "Chicken Wings",
      image: ChickenWings
    },
    {
      id: 8,
      title: "Filipino Spaghetti",
      image: spag
    },
    {
      id: 9,
      title: "Kare Kare",
      image: KareKare
    },
    {
      id: 10,
      title: "Chicken Wings",
      image: ChickenWings
    },
  ]

  const maxIndex = itemArr.length - 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };


  const [search, setSearch] = useState('')



  return (
    <div>

      {
        user != null &&
        <>
          <Header />
          <div className="px-4 sm:px-[10%] lg:px-[20%] mt-[50px]">

            <div className="flex flex-col lg:flex-row items-start gap-5 justify-start">

              <div className="flex flex-col gap-5 w-full">
                <div className="font-bold text-[2rem] sm:text-[2.5rem] lg:text-[3.8rem] leading-[110%]">
                  "Masarap sa unang tingin, pag-kinain gusto mo ng ulit-ulitin."
                </div>
                <p className="text-[#888]">
                  For individuals aspiring to venture into the food industry
                  or enhance their culinary expertise, Developing Delectable Cuisine serves as a crucial asset.
                </p>

                <div className="relative">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-[300px] py-[10px] px-[20px] rounded-[30px] border border-[#888] outline-none w-full"
                    type="text"
                    placeholder="Find more of our specialty"
                  />
                  <div
                    onClick={() => { search != '' && router.push(`/user/menu?search=${search}`) }}
                    className="bg-yellow-500 px-[20px] py-[5px] rounded-[30px] font-bold absolute top-[5px] right-[10px] hover: cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                  </div>
                </div>
              </div>



              <div className="w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-[2rem] sm:rounded-[3rem] relative overflow-hidden mt-5 lg:mt-0">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 rounded-[3rem] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/80" style={{ height: '100%', bottom: 0 }} />

                {/* Top left icon and button */}
                <div className="flex gap-5 items-center absolute left-[10px] top-[20px] z-10">
                  <div className="bg-black w-[50px] h-[50px] flex items-center justify-center rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                    </svg>
                  </div>

                  <div className="bg-white px-5 py-2 rounded-[2rem] flex items-center gap-5 cursor-pointer">
                    <div
                      onClick={() => router.push('/user/discover-more')}
                      className="text-black">Discover more</div>
                    <div className="p-2 rounded-full bg-black">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom text */}
                <div className="flex gap-5 items-center absolute left-[15px] bottom-[20px] z-10">
                  <div className="text-white font-bold text-[3rem]">
                    Nourish, Energize, and Thrive
                  </div>
                </div>

                {/* Background image */}
                <Image
                  src={headerOne}
                  alt="headerOne"
                  className="w-full h-full rounded-[3rem] object-cover"
                />
              </div>

            </div>


            <div className="w-full h-auto lg:h-[500px] mt-[50px] flex flex-col lg:flex-row gap-5">

              <div className="w-full h-full bg-yellow-500 rounded-[5rem] relative overflow-hidden">
                {/* Left Arrow */}
                <div onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-black/30 hover:bg-black/60 p-3 rounded-full transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </div>

                {/* Slide View */}
                <div className="w-full h-full flex justify-center items-center gap-5 px-10 z-0 relative transition-all duration-500">
                  <div
                    className="flex gap-5 transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 270}px)` }}
                  >
                    {itemArr.map((item) => (
                      <div
                        key={item.id}
                        className={` ${item.id === 2 && "bg-white rounded-[5rem]"}  rounded-[2rem] p-7 w-[250px] h-[320px] flex-shrink-0 flex flex-col justify-between items-center`}
                      >
                        <div className="h-[100px] w-[70px] relative rounded-full overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h2 className="text-lg font-semibold text-center text-black">{item.title}</h2>
                        <div className="flex mt-2">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-yellow-400"
                                fill="black"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 .587l3.668 7.571 8.332 1.151-6.064 5.828 1.552 8.281L12 18.896l-7.488 4.522 1.552-8.281-6.064-5.828 8.332-1.151z" />
                              </svg>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Arrow */}
                <div onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-black/30 hover:bg-black/60 p-3 rounded-full transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>


              <div className="w-full h-full bg-black rounded-[5rem] flex flex-col justify-between">

                <div className=" px-[2rem] pt-[3rem] text-white flex justify-between gap-5">
                  <div className="font-bold text-[2rem]">
                    4.500+ Ratings
                  </div>
                  <div className="flex gap-5 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                    </svg>
                  </div>
                </div>

                <div className="h-[100%] mt-[1rem] w-full bg-blue-500 rounded-[5rem] overflow-hidden">
                  <Image
                    src={headerOne}
                    alt="headerOne"
                    className="w-full h-full rounded-[3rem] object-cover"
                  />
                </div>

              </div>


            </div>
          </div>

        </>
      }
    </div>
  )
}


