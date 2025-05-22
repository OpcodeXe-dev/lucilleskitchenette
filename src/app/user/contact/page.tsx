import Footer from "@/app/comps/Footer";
import Header from "@/app/comps/Header";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
    <Header />
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Contact Lucille's Kitchenette
          </h1>
          <p className="text-lg text-gray-600">
            We'd love to hear from you! Reach out through any of these channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Location Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.006 32.006 0 0 0 0 117.66zM192 416l192 64V96L192 32v384zM554.06 33.16L416 96v384l139.88-55.95A31.996 31.996 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86z"></path></svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Location</h2>
            </div>
            <p className="text-gray-600 mb-4">
              11, Old Cabuyao, Sampaloc St, Quezon City, 1116 Metro Manila
            </p>
            <Link
              href="https://maps.app.goo.gl/kLUDPrmJmWc59WEt9?g_st=afm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
            >
              View on Map
            </Link>
          </div>

          {/* Phone Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Phone</h2>
            </div>
            <p className="text-gray-600 mb-4">0933 336 6667</p>
            <Link
              href="tel:+639333366667"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
            >
              Call Now
            </Link>
          </div>

          {/* Email Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"></path></svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Email</h2>
            </div>
            <p className="text-gray-600 mb-4">lucilleskitchenette@gmail.com</p>
            <Link
              href="mailto:lucilleskitchenette@gmail.com"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
            >
              Send Email
            </Link>
          </div>

          {/* Facebook Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Facebook</h2>
            </div>
            <p className="text-gray-600 mb-4">Connect with us on Facebook</p>
            <Link
              href="https://www.facebook.com/share/16BvwY7Lhz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
            >
              Visit Page
            </Link>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
    </>
  );
}
