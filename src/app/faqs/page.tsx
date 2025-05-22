'use client';

import { useState } from 'react';
import Head from 'next/head';
import Header from '../comps/Header';

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What kind of food do you offer?",
      answer: "We serve a variety of home-cooked Filipino comfort meals with our own recipes. Every item is made with love and fresh ingredients."
    },
    {
      question: "How can I place an order?",
      answer: "You can place your orders through our website, Facebook page, or by sending us a message via SMS or chat. We recommend ordering in advance, especially for large or bulk orders."
    },
    {
      question: "Are your ingredients fresh and homemade?",
      answer: "Always! We take pride in using fresh, locally sourced ingredients. Every meal is cooked with care, just like how we'd serve it at home."
    },
    {
      question: "Do you accept same-day orders?",
      answer: "Yes, we do accept same-day orders, but it depends on availability. For guaranteed service, pre-orders are highly encouraged."
    },
    {
      question: "Do you deliver?",
      answer: "Yes! We offer delivery within selected areas. Delivery fees may apply depending on your location. You can also opt for pickup if preferred."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We currently accept Cash on Delivery (COD), GCash, and bank transfers. Payment details will be provided upon order confirmation."
    },
    {
      question: "Do you cater for events or bulk orders?",
      answer: "Yes, we do! Whether it's a family gathering, office lunch, or special event, we offer catering and party trays. Kindly contact us at least 2–3 days in advance."
    },
    {
      question: "Are your meals available every day?",
      answer: "Our regular menu is available daily, but we also offer weekly specials and limited-time dishes, which we announce on our social media pages."
    },
    {
      question: "Where are you located?",
      answer: "Lucille's Kitchenette is a home-based business located in Old Cabuyao, Sampaloc St, Quezon City. Pickup instructions will be given upon confirmation."
    },
    {
      question: "How do I stay updated on your latest dishes and promos?",
      answer: "Follow us on Facebook @LucillesKitchenette to get the latest updates, menu announcements, and exclusive offers."
    }
  ];

  return (
    <>
    <Header />
      <Head>
        <title>FAQs - Lucille's Kitchenette</title>
        <meta name="description" content="Frequently asked questions about Lucille's Kitchenette" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-yellow-500 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
                <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                  <div className="sm:text-center lg:text-left">
                    <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                      <span className="block">Got Questions?</span>
                      <span className="block text-yellow-100">We've Got Answers</span>
                    </h1>
                    <p className="mt-3 text-base text-yellow-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                      Everything you need to know about Lucille's Kitchenette
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
            <svg className="w-64 h-64 text-yellow-400 opacity-20" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`border-2 rounded-xl overflow-hidden transition-all duration-200 ${activeIndex === index ? 'border-yellow-400 shadow-md' : 'border-gray-100 hover:border-yellow-200'}`}
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className={`flex justify-between items-center w-full p-6 text-left focus:outline-none ${activeIndex === index ? 'bg-yellow-50' : 'bg-white'}`}
                    >
                      <h3 className="text-xl font-semibold text-gray-800">
                        {faq.question}
                      </h3>
                      <span className="ml-4 flex-shrink-0">
                        <svg
                          className={`h-6 w-6 transform ${activeIndex === index ? 'rotate-180 text-yellow-600' : 'rotate-0 text-gray-400'}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    {activeIndex === index && (
                      <div className="px-6 pb-6">
                        <div className="prose prose-yellow text-gray-600 max-w-none">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:p-12 text-center">
              <h3 className="text-2xl font-extrabold text-white mb-4">Still have questions?</h3>
              <p className="text-xl text-yellow-100 mb-8">
                We're here to help! Contact us anytime.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="tel:+639123456789"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-yellow-700 bg-white hover:bg-yellow-50 transition-colors duration-200"
                >
                  <svg className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us
                </a>
                <a
                  href="https://facebook.com/LucillesKitchenette"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition-colors duration-200"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Message on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}