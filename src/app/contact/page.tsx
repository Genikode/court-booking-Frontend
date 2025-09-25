'use client';

import Header from "@/components/Header";
import Footer from "@/sections/Footer";

const ContactPage = () => {
  return (
    <>
      <Header />
      <section className="w-full bg-white text-center text-black">
        <div className="max-w-4xl mx-auto px-4 py-20">
          {/* Header */}
          <div className="mb-10">
            <div className="w-12 h-1 bg-pink-500 mx-auto mb-4"></div>
            <h2 className="text-4xl font-extrabold">Contact</h2>
            <p className="text-sm mt-2">Join the Best Dance School in Your Town!</p>
          </div>

          {/* Address & Phone */}
          <div className="text-sm md:text-base font-semibold mb-2">
            Address:{" "}
            <span className="font-bold">
              Near Diva Marquee, Intellectual Village, Phase 7, Bahria Town
              Rawalpindi
            </span>{" "}
            Let’s talk:{" "}
            <span className="font-bold">(703) 329–06–32</span>
          </div>

          {/* Operating Hours */}
          <div className="text-left mt-4 mb-8 max-w-md mx-auto text-sm font-semibold">
            Operating Hours:
            <ul className="mt-2">
              <li>
                <strong>Daily:</strong> 🕘 9:00 AM – 2:00 AM
              </li>
            </ul>

            <div className="mt-4">
              Peak Hours:
              <ul className="list-disc ml-6 mt-2">
                <li>Weekends (All Day)</li>
                <li>Rate: PKR 7,500 / Hour</li>
              </ul>
            </div>

            <div className="mt-4">
              Off-Peak Hours:
              <ul className="list-disc ml-6 mt-2">
                <li>Weekdays (9:00 AM – 3:00 PM)</li>
                <li>Rate: PKR 5,000 / Hour</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <form className="max-w-xl mx-auto grid gap-4 text-left text-sm">
            <div className="grid grid-cols-4 items-center">
              <label className="col-span-1 font-bold">Name:</label>
              <input
                type="text"
                placeholder="Enter please your name"
                className="col-span-3 p-2 border-b border-gray-300 focus:outline-none focus:border-pink-500 text-black"
              />
            </div>

            <div className="grid grid-cols-4 items-center">
              <label className="col-span-1 font-bold">E-mail:</label>
              <input
                type="email"
                placeholder="Enter please your e-mail"
                className="col-span-3 p-2 border-b border-gray-300 focus:outline-none focus:border-pink-500 text-black"
              />
            </div>

            <div className="grid grid-cols-4 items-center">
              <label className="col-span-1 font-bold">Phone:</label>
              <input
                type="text"
                placeholder="Enter please your phone"
                className="col-span-3 p-2 border-b border-gray-300 focus:outline-none focus:border-pink-500 text-black"
              />
            </div>

            <div className="grid grid-cols-4 items-start">
              <label className="col-span-1 font-bold">Message:</label>
              <textarea
                placeholder="Enter please your message"
                className="col-span-3 p-2 border border-gray-300 rounded resize-none h-24 focus:outline-none focus:border-pink-500 text-black"
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
        <div className="w-full h-[400px]">
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
