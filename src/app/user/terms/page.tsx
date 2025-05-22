"use client";

import Head from "next/head";
import Header from "@/app/comps/Header";
import { useRouter } from "next/navigation";

export default function TermsConditionsPage() {
  const router = useRouter();
  return (
    <>
      <Header />
      <Head>
        <title>Terms & Conditions - Lucille's Kitchenette</title>
        <meta
          name="description"
          content="Terms and Conditions for using Lucille's Kitchenette services"
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
                      <span className="block">Terms &</span>
                      <span className="block text-yellow-100">Conditions</span>
                    </h1>
                    <p className="mt-3 text-base text-yellow-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                      Guidelines for using our website and services
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

        {/* Terms & Conditions Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                Terms & Conditions
              </h2>

              <div className="w-full bg-yellow-500 p-4 rounded-lg mb-8">
                <h3 className="text-2xl font-bold text-white text-center">
                  Terms & Conditions
                </h3>
              </div>

              <div className="prose prose-lg text-gray-700 space-y-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    1. Acceptance of Terms
                  </h4>
                  <p>
                    By accessing or using the Lucille's Kitchenette website, you
                    agree to comply with and be bound by these Terms and
                    Conditions.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    2. Website Use
                  </h4>
                  <p>
                    The website is provided for informational purposes and to
                    facilitate orders, reservations, and customer inquiries. You
                    must not use the website for unlawful purposes or in a way
                    that may harm or impair the functionality of the site.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    3. Intellectual Property
                  </h4>
                  <p>
                    All content on this website, including text, images,
                    graphics, logos, and branding, is the exclusive property of
                    Lucille's Kitchenette. Unauthorized use, reproduction, or
                    distribution of any content is strictly prohibited without
                    prior written consent.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    4. Account Registration
                  </h4>
                  <p>
                    To access certain features of the website such as placing
                    orders or viewing order history, users may be required to
                    register an account. You agree to provide accurate, current,
                    and complete information during registration and to keep
                    your login credentials secure. You are responsible for all
                    activity that occurs under your account. Lucille's
                    Kitchenette reserves the right to suspend or terminate
                    accounts that violate these terms or are suspected of
                    fraudulent activity.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    5. Orders and Reservations
                  </h4>
                  <p>
                    Orders and reservations made through the website are subject
                    to availability and confirmation. We reserve the right to
                    refuse or cancel any order or reservation at our discretion.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    6. Pricing and Menu Information
                  </h4>
                  <p>
                    All prices and menu items are subject to change without
                    prior notice. While we strive to maintain accuracy,
                    Lucille's Kitchenette is not responsible for typographical
                    errors or outdated information.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    7. User Conduct
                  </h4>
                  <p>
                    Users agree not to engage in any activity that could harm
                    the website, such as attempting unauthorized access,
                    uploading malicious content, or interfering with site
                    operations.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    8. Third-Party Links
                  </h4>
                  <p>
                    Our website may include links to third-party websites for
                    your convenience. Lucille's Kitchenette is not responsible
                    for the content or privacy practices of those external
                    sites.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    9. Changes to Terms
                  </h4>
                  <p>
                    We reserve the right to modify or update these Terms and
                    Conditions at any time. Continued use of the website
                    following any changes implies acceptance of those changes.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    10. Contact Information
                  </h4>
                  <p>
                    If you have any questions, concerns, or feedback regarding
                    these Terms and Conditions, you may contact us using the
                    information provided on our website.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:p-12 text-center">
              <h3 className="text-2xl font-extrabold text-white mb-4">
                Need Clarification?
              </h3>
              <p className="text-xl text-yellow-100 mb-8">
                Contact us for any questions about our terms
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
                onClick={() => router.push("/user/privacy")}
                className="text-gray-700 hover:text-black text-sm md:text-base transition-colors cursor-pointer"
              >
                Privacy Policy
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
