'use client';

const ContactPage = () => {
  return (
    <section className="w-full bg-white text-center">
      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="mb-10">
          <div className="w-12 h-1 bg-pink-500 mx-auto mb-4"></div>
          <h2 className="text-4xl font-extrabold">Contacts</h2>
          <p className="text-sm mt-2 text-gray-500">Join the Best Dance School in Your Town!</p>
        </div>

        {/* Address & Phone */}
        <div className="text-sm md:text-base font-semibold mb-2">
          Address: <span className="font-bold">6036 Richmond Hwy., Alexandria, VA 2230</span> Let’s talk: <span className="text-pink-600">(703) 329–06–32</span>
        </div>

        {/* Working Hours */}
        <div className="text-left mt-4 mb-8 max-w-sm mx-auto text-sm font-semibold">
          We are working on:
          <ul className="mt-2 text-gray-600 font-normal">
            <li><strong>Monday–Thursday:</strong> 10:00 AM – 06 PM</li>
            <li><strong>Friday:</strong> 10:00 AM – 06 PM</li>
            <li><strong>Saturday:</strong> 09:00 AM – 06 PM</li>
          </ul>
        </div>

        {/* Contact Form */}
        <form className="max-w-xl mx-auto grid gap-4 text-left text-sm">
          <div className="grid grid-cols-4 items-center">
            <label className="col-span-1 font-bold">Name:</label>
            <input
              type="text"
              placeholder="Enter please your name"
              className="col-span-3 p-2 border-b border-gray-300 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div className="grid grid-cols-4 items-center">
            <label className="col-span-1 font-bold">E-mail:</label>
            <input
              type="email"
              placeholder="Enter please your e-mail"
              className="col-span-3 p-2 border-b border-gray-300 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div className="grid grid-cols-4 items-center">
            <label className="col-span-1 font-bold">Phone:</label>
            <input
              type="text"
              placeholder="Enter please your phone"
              className="col-span-3 p-2 border-b border-gray-300 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div className="grid grid-cols-4 items-start">
            <label className="col-span-1 font-bold">Message:</label>
            <textarea
              placeholder="Enter please your message"
              className="col-span-3 p-2 border border-gray-300 rounded resize-none h-24 focus:outline-none focus:border-pink-500"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Google Map */}
      <div className="w-full h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.187951245116!2d-77.0726099!3d38.7796038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b0f122a5d6fd%3A0x4e289b55ad31312f!2s6036%20Richmond%20Hwy%2C%20Alexandria%2C%20VA%2022306%2C%20USA!5e0!3m2!1sen!2s!4v1721031113374"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          className="border-0"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactPage;
