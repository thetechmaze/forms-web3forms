"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setResult({
      success: true,
      message: "sending.....",
    });

    const body = {
      ...formData,
      access_key: process.env.NEXT_PUBLIC_ACCESS_KEY,
    };

    const response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (data.success) {
      setResult({
        success: true,
        message: "Form Submitted Successfully",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      console.log("Error", data);
      setResult({
        success: false,
        message: data.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900">
          Contact Us
        </h2>
        <p className="mb-8 font-light text-center text-gray-500 sm:text-xl">
          Get In Touch
        </p>
        <form onSubmit={onSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="name"
              className="mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="shadow=sm bg-gray-50 border border-gray-300
              text-gray-900 text-sm rounded-lg w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="shadow=sm bg-gray-50 border border-gray-300
              text-gray-900 text-sm rounded-lg w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="mb-2 text-sm font-medium text-gray-900"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Enter your subject"
              value={formData.subject}
              onChange={handleChange}
              className="shadow=sm bg-gray-50 border border-gray-300
              text-gray-900 text-sm rounded-lg w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-2 text-sm font-medium text-gray-900"
            >
              Message
            </label>
            <textarea
              rows={6}
              id="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              className="shadow=sm bg-gray-50 border border-gray-300
              text-gray-900 text-sm rounded-lg w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:outline-none"
          >
            Submit
          </button>
        </form>
        {result && (
          <>
            {result?.success ? (
              <div className="bg-green-400 mt-10 p-3 rounded-lg">
                {result.message}
              </div>
            ) : (
              <div className="bg-red-400 mt-10 p-3 rounded-lg">
                {result.message}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
