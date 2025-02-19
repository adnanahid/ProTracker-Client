import { useRef } from "react";
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
    <div className="max-w-5xl mx-auto pt-28 min-h-[calc(100vh-152px)] px-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Get in Touch
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Send Us a Message
          </h3>
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Message
              </label>
              <textarea
                name="message"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col justify-center bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Information
          </h3>
          <p className="text-gray-600 mb-4">
            Feel free to reach out for inquiries, feedback, or assistance.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Address:</strong> Nirala R/A, Khulna, Bangladesh
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:nahidhasan3.1416@gmail.com"
                className="text-blue-600 hover:underline"
              >
                nahidhasan3.1416@gmail.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong> +880 123 456 7890
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
