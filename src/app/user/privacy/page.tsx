"use client";

import Head from "next/head";
import Header from "@/app/comps/Header";
import { useRouter } from "next/navigation";

export default function PrivacyPolicyPage() {
  const router = useRouter();
  return (
    <>
      <Header />
      <Head>
        <title>Privacy Policy - Lucille's Kitchenette</title>
        <meta
          name="description"
          content="Privacy Policy for Lucille's Kitchenette"
        />
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
                      <span className="block">Your Privacy</span>
                      <span className="block text-yellow-100">
                        Our Commitment
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-yellow-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                      How we protect and use your information at Lucille's
                      Kitchenette
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
            <svg
              className="w-64 h-64 text-yellow-400 opacity-20"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                Privacy Policy
              </h2>

              <div className="w-full bg-yellow-500 p-4 rounded-lg mb-8">
                <h3 className="text-2xl font-bold text-white text-center">
                  Privacy Policy
                </h3>
              </div>

              <div className="prose prose-lg text-gray-700 space-y-6">
                <p>
                  At Lucille's Kitchenette, we are committed to protecting your
                  privacy and ensuring the security of any personal information
                  you provide through our website. When you interact with
                  us—such as placing an order, making a reservation, or
                  contacting us—we may collect personal details including your
                  name, email, phone number, address, and payment information.
                  We also collect technical data like your IP address, browser
                  type, and usage patterns via cookies to improve our website
                  and services. This information is used solely to process
                  transactions, manage reservations, respond to inquiries,
                  enhance user experience, and send occasional updates or
                  promotions if you've opted in.
                </p>

                <p>
                  We implement strict security measures to safeguard your data
                  and do not sell or share your information with third parties,
                  except trusted partners who help operate our website and
                  fulfill services under confidentiality agreements. Our site
                  may contain links to other websites, and we are not
                  responsible for their privacy practices. You have the right to
                  access, modify, or delete your personal information at any
                  time by contacting us. By using our website, you consent to
                  this policy, which may be updated periodically.
                </p>

                <p>
                  Lucille's Kitchenette reserves the right to update or modify
                  this Privacy Policy at any time. Changes will be posted on
                  this page with an updated effective date. For any questions or
                  concerns about your data, please reach out to us at{" "}
                  <a
                    href="tel:09333366667"
                    className="text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    0933 336 6667
                  </a>{" "}
                  or{" "}
                  <a
                    href="mailto:lucilleskitchenette@gmail.com"
                    className="text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    lucilleskitchenette@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:p-12 text-center">
              <h3 className="text-2xl font-extrabold text-white mb-4">
                Privacy Concerns?
              </h3>
              <p className="text-xl text-yellow-100 mb-8">
                Contact us for any questions about your personal data
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="tel:09333366667"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-yellow-700 bg-white hover:bg-yellow-50 transition-colors duration-200"
                >
                  <svg
                    className="h-5 w-5 mr-2 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call Us
                </a>
                <a
                  href="mailto:lucilleskitchenette@gmail.com"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition-colors duration-200"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-yellow-300 px-4 py-8 md:px-[5%] mt-[3rem]">
        <div className="mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div className="flex flex-col gap-4 w-full md:w-1/3">
              <h2 className="font-bold text-xl md:text-2xl">
                Lucille's Kitchenette
              </h2>
              <p className="text-gray-700 text-sm md:text-base">
                Lucille's Kitchenette brings the comfort of home to your table,
                where every bite is a blend of love, tradition, and homemade
                goodness.
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-1/3">
              <h2 className="font-bold text-xl md:text-2xl">Contact Us</h2>
              <p className="text-gray-700 text-sm md:text-base">
                Phone: 0933 336 6674
              </p>
              <p className="text-gray-700 text-sm md:text-base">
                Email: lucilleskitchenette@gmail.com
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-1/3">
              <h2 className="font-bold text-xl md:text-2xl">Legal</h2>
              <p
                onClick={() => router.push("/user/terms")}
                className="text-gray-700 hover:text-black text-sm md:text-base transition-colors cursor-pointer"
              >
                Terms of Service
              </p>
            </div>
          </div>

          <div className="border-t border-yellow-600 pt-4 text-center text-sm text-gray-700">
            © 2025 Lucille's Kitchenette, All Rights Reserved.
          </div>
        </div>
      </div>
    </>
  );
}
