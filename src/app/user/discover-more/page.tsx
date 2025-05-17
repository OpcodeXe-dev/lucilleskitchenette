'use client'


import Head from 'next/head';
import Image from 'next/image';
import discImage from '../../../../assets/discover/disc.jpeg';
import ownerImage from '../../../../assets/discover/owner.jpeg';
import { useRouter } from 'next/navigation';

//reviews imgs
import review1 from '../../../../assets/reviews/1.jpg';
import review2 from '../../../../assets/reviews/2.jpg';
import review3 from '../../../../assets/reviews/3.jpg';
import review4 from '../../../../assets/reviews/4.jpg';
import review5 from '../../../../assets/reviews/5.jpg';
import review6 from '../../../../assets/reviews/6.jpg';



import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function About() {

  const router = useRouter();
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Our Story | Lucille's Kitchenette</title>
      </Head>
      <header className='flex gap-5 justify-between items-center p-5'>
        <div className='flex items-center gap-3 px-3 py-2 rounded-md bg-yellow-500 cursor-pointer'>
          <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 512 512" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"></path></svg>

          <div
            onClick={() => router.back()}
            className='font-bold text-white'>
            Go back
          </div>

        </div>

        <div className="flex items-center gap-5">
          <div className="bg-yellow-500 h-[30px] w-[30px] rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
          </div>
        </div>
      </header>


      <main className="max-w-4xl mx-auto px-5 pb-16">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">
            Our Story
          </h1>
          <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-lg mb-8">
            <Image
              src={discImage}
              alt="Lucille's Kitchenette"
              fill
              className="object-cover transition-opacity duration-500 hover:opacity-90"
              priority
            />
          </div>
        </section>

        <section className="mb-24">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Image on left - hidden on mobile, shown on md+ */}
            <div className="hidden md:block relative w-1/3 min-w-[300px] h-[500px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={ownerImage}
                alt="Lucille's Kitchenette"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Text content */}
            <div className="prose prose-lg max-w-none text-gray-700 flex-1">
              <p className="text-xl font-medium text-gray-800 mb-8 flex items-center gap-3">
                <span className='bg-yellow-500 h-[20px] w-[20px] rounded-full'></span>
                Hello, I'm Lucille—founder and proud owner of Lucille's Kitchenette.
              </p>

              <div className="space-y-6">
                <p>
                  We started in the year 2020, what began as a humble dream in my cozy home kitchen has grown into a beloved small food business rooted in passion, tradition, and love for home-cooked meals. At first, I simply wanted to share the joy of cooking with friends and neighbors. Using time-honored family recipes, a simple stove, and a deep dedication to quality, I began preparing dishes that brought comfort and warmth to every table they reached.
                </p>

                <p>
                  In the early days, orders were placed through text messages, and meals were delivered in carefully packed containers—each one made with care and attention to detail. Word quickly spread, and soon, what started as a small effort turned into something much bigger than I had imagined. Customers returned not just for the generous servings or rich flavors, but for the sense of home they found in every bite.
                </p>

                <p>
                  Over the years, Lucille's Kitchenette has grown steadily, but it remains true to its original values: authenticity, quality, and heartfelt service. Every dish I prepare is a reflection of who I am and what I believe in—food that brings people together, food that tells a story, and food that feels like home.
                </p>

                <p>
                  Today, as we continue to serve my community with the same dedication that inspired this journey, I remain committed to creating meals that nourish both the body and the soul. Whether it's a quick lunch, a family celebration, or simply a craving for comfort food, Lucille's Kitchenette is here to make every mealtime a little more special, just like home.
                </p>

                <p className="font-medium italic">
                  Thank you for being a part of our story.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full mb-5 h-auto py-5">
          <h1 className='font-bold mb-5'>
            Reviews:
          </h1>
          <Swiper
            spaceBetween={10}
            slidesPerView="auto"
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="py-5"
          >
            <SwiperSlide>
              <Image src={review1} alt="Review 1" className="w-full h-auto object-cover shadow rounded-lg" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={review2} alt="Review 2" className="w-full h-auto object-cover shadow rounded-lg"  />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={review3} alt="Review 3" className="w-full h-auto object-cover shadow rounded-lg"  />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={review4} alt="Review 4" className="w-full h-auto object-cover shadow rounded-lg"  />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={review5} alt="Review 5" className="w-full h-auto object-cover shadow rounded-lg"  />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={review6} alt="Review 6" className="w-full h-auto object-cover shadow rounded-lg"  />
            </SwiperSlide>
          </Swiper>
        </div>
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="group">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></span>
              MISSION
            </h2>
            <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-100 transition-all duration-300 group-hover:shadow-lg">
              <p className="text-gray-700 leading-relaxed">
                At Lucille's Kitchenette, our mission is to deliver heartwarming, home-cooked meals made with love and the freshest ingredients—bringing the comfort of a family kitchen to your doorstep with speed, care, and a personal touch.
              </p>
            </div>
          </section>

          <section className="group">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></span>
              VISION
            </h2>
            <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-100 transition-all duration-300 group-hover:shadow-lg">
              <p className="text-gray-700 leading-relaxed">
                We envision becoming the most trusted name in food delivery by creating a community that values quality, tradition, and convenience—nourishing not just bodies, but hearts, one meal at a time.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}