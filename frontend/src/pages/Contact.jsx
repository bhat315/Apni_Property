import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaTag, FaComment } from "react-icons/fa";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const name = form.current.from_name.value.trim();
    const email = form.current.from_email.value.trim();
    const subject = form.current.subject.value.trim();
    const message = form.current.message.value.trim();

    if (!name || !email || !subject || !message) {
      toast.error("Please fill out all fields.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          toast.success("Message sent successfully!", {
            position: "top-center",
            autoClose: 3000,
          });
          form.current.reset();
        },
        (error) => {
          toast.error("Failed to send message. Please try again.", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      );
  };

  return (
    <section className="bg-gradient-to-r from-blue-100 to-purple-200 py-8 mt-10">
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="text-4xl font-extrabold text-indigo-900 text-center mb-4 ">
          Get in Touch with Us
        </h2>
        {/* <p className="mb-8 lg:mb-16 font-light text-center text-gray-700">
          Facing a technical issue or have feedback on a new feature? We’re here
          to help and would love to hear from you.
        </p> */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-8 bg-white p-8 rounded-lg shadow-lg"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-semibold text-gray-700"
            >
              Name
            </label>
            <div className="flex items-center mt-1">
              <FaUser className="text-gray-400 text-xl mr-3" />
              <input
                id="name"
                type="text"
                name="from_name"
                placeholder="Enter your name"
                className="form_input w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md text-gray-700 placeholder-gray-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-gray-700"
            >
              Email Address
            </label>
            <div className="flex items-center mt-1">
              <FaEnvelope className="text-gray-400 text-xl mr-3" />
              <input
                type="email"
                id="email"
                name="from_email"
                placeholder="yourname@example.com"
                className="form_input w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md text-gray-700 placeholder-gray-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-lg font-semibold text-gray-700"
            >
              Topic
            </label>
            <div className="flex items-center mt-1">
              <FaTag className="text-gray-400 text-xl mr-3" />
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="How can we assist you?"
                className="form_input w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md text-gray-700 placeholder-gray-500"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-lg font-semibold text-gray-700"
            >
              Message
            </label>
            <div className="flex items-start mt-1">
              <FaComment className="text-gray-400 text-xl mr-3" />
              <textarea
                rows={4}
                id="message"
                name="message"
                placeholder="Write your message here..."
                className="form_input w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md text-gray-700 placeholder-gray-500"
              />
            </div>
          </div>
          <button
            type="submit"
            value="Send"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg py-3 px-6 rounded-lg shadow-md w-full sm:w-auto"
          >
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Contact;
