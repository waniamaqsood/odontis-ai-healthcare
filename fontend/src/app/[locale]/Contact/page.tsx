"use client";
import { useState } from "react";


type FormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // later: send to API route or email service
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-400 to-blue-500">

      {/* TOP SECTION */}
      <div className="relative px-12 pt-16 pb-48 text-white">
        <h1 className="text-5xl mt-20 font-bold leading-tight">ODONTIS</h1>
        <p className="text-4xl mt-2 font-bold">Send Us A Message</p>

        <div className="mt-4 space-y-2">We would be delighted to hear from you. Your thoughts and feedback are always welcome and appreciated.
        </div>
      </div>

      <div className="bg-white rounded-t-[60px] px-12 py-16 -mt-32 min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl grid md:grid-cols-2 overflow-hidden">

          {/* Left Info Section */}
          <div className="bg-blue-400 text-white p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-blue-100 mb-8">
              Have a question or want to work together?
              Fill out the form and we’ll get back to you soon.
            </p>

            <div className="space-y-4 text-sm">
              <p>📧 contact@yourbrand.com</p>
              <p>📞 +92 300 1234567</p>
              <p>📍 Pakistan</p>
            </div>
          </div>

          {/* Right Form Section */}
          <form onSubmit={handleSubmit} className="p-10 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-400 text-white py-3 rounded-xl font-semibold hover:bg-blue-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}