import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-[calc(100vh-64px)] bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Contact Us
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              name="user_name"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="user_email"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Message</label>
            <textarea
              name="message"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            value="send"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Get in Touch</h3>
          <p className="text-gray-600">
            Feel free to reach out to us for any inquiries, feedback, or
            assistance. We are happy to help!
          </p>

          <div className="space-y-2">
            <p className="text-gray-700">
              📍 Address: 123 Tech Street, Dhaka, Bangladesh
            </p>
            <p className="text-gray-700">📧 Email: contact@autoworx.com</p>
            <p className="text-gray-700">📞 Phone: +880 123 456 7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
