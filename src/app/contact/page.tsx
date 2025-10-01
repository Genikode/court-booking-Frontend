'use client';

import Header from "@/components/Header";
import PageBanner from "@/components/PageBanner";
import Footer from "@/sections/Footer";

const ContactPage = () => {
  return (
    <>
      <Header />
      <section className="w-full bg-white dark:bg-gray-900 text-black dark:text-gray-200 transition-colors duration-300">
         <PageBanner
              title="Contact"
              subtitle="Learn More About Us"
              backgroundImage="/image4.jpeg"
            />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          {/* Header */}

          {/* Address & Phone */}
          <div className="text-sm md:text-base font-semibold mb-6 text-center">
            Address:{" "}
            <span className="font-bold">
              Near Diva Marquee, Intellectual Village, Phase 7, Bahria Town Rawalpindi
            </span>
            <br />
            Let’s talk:{" "}
            <span className="font-bold text-pink-600 dark:text-pink-400">(703) 329–06–32</span>
          </div>

          {/* Operating Hours */}
          <div className="text-left mt-4 mb-10 max-w-md mx-auto text-sm font-semibold bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Operating Hours:</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Daily:</strong> 🕘 9:00 AM – 2:00 AM
              </li>
            </ul>

            <div className="mt-4">
              <h5 className="font-bold">Peak Hours:</h5>
              <ul className="list-disc ml-5 mt-2 text-gray-700 dark:text-gray-300">
                <li>Weekends (All Day)</li>
                <li>Rate: PKR 7,500 / Hour</li>
              </ul>
            </div>

            <div className="mt-4">
              <h5 className="font-bold">Off-Peak Hours:</h5>
              <ul className="list-disc ml-5 mt-2 text-gray-700 dark:text-gray-300">
                <li>Weekdays (9:00 AM – 3:00 PM)</li>
                <li>Rate: PKR 5,000 / Hour</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <form className="max-w-2xl mx-auto grid gap-6 text-left text-sm bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
              <label className="font-bold col-span-1">Name:</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="col-span-3 p-2 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-pink-500 text-black dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
              <label className="font-bold col-span-1">E-mail:</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="col-span-3 p-2 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-pink-500 text-black dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2">
              <label className="font-bold col-span-1">Phone:</label>
              <input
                type="text"
                placeholder="Enter your phone"
                className="col-span-3 p-2 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-pink-500 text-black dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-2">
              <label className="font-bold col-span-1">Message:</label>
              <textarea
                placeholder="Enter your message"
                className="col-span-3 p-2 border border-gray-300 dark:border-gray-600 rounded resize-none h-28 focus:outline-none focus:border-pink-500 bg-transparent text-black dark:text-white"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Google Map */}
        <div className="w-full h-[300px] md:h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.540456598431!2d73.0891!3d33.5127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df9593b9f1b69d%3A0x5b3816c19b4a2f7c!2sIntellectual%20Village%20Phase%207%20Bahria%20Town%20Rawalpindi!5e0!3m2!1sen!2s!4v1721031113374"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            className="border-0"
          ></iframe>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactPage;
