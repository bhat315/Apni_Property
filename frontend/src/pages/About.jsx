import React from "react";
import {
  FaBuilding,
  FaBullseye,
  FaHandshake,
  FaStar,
  FaUserFriends,
  FaShieldAlt,
  FaMapSigns,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="px-20  bg-gradient-to-r from-blue-100 to-purple-200 py-10 mt-10 ">
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-900 text-center">
        About Apni Property
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6  shadow-lg rounded-lg  duration-500 hover:scale-105 bg-blue-50">
          <div className="flex items-center mb-4">
            <FaBuilding className="text-3xl text-blue-500 mr-4" />
            <h2 className="text-xl font-semibold text-slate-800">Who We Are</h2>
          </div>
          <p className="text-slate-700">
            Apni Property is your trusted partner in the real estate market,
            known for our expertise in buying, selling, and renting properties
            in premium neighborhoods. We take pride in our tailored approach,
            ensuring every client's needs are met with precision.
          </p>
        </div>

        <div className="p-6  shadow-lg rounded-lg  duration-500 hover:scale-105 bg-green-50">
          <div className="flex items-center mb-4">
            <FaBullseye className="text-3xl text-green-500 mr-4" />
            <h2 className="text-xl font-semibold text-slate-800">
              Our Mission
            </h2>
          </div>
          <p className="text-slate-700">
            Our mission is to turn your real estate dreams into reality. We
            offer personalized guidance, expert advice, and an in-depth
            understanding of the local market, making your buying, selling, or
            renting experience seamless and rewarding.
          </p>
        </div>

        <div className="p-6  shadow-lg rounded-lg  duration-500 hover:scale-105 bg-red-50">
          <div className="flex items-center mb-4">
            <FaHandshake className="text-3xl text-red-500 mr-4" />
            <h2 className="text-xl font-semibold text-slate-800">
              Why Choose Us
            </h2>
          </div>
          <p className="text-slate-700">
            With years of industry experience, our dedicated agents are
            committed to providing the highest level of service. We believe that
            every transaction should be a positive, memorable experience, and
            we're here to guide you every step of the way.
          </p>
        </div>

        <div className="p-6  shadow-lg rounded-lg  duration-500 hover:scale-105 bg-yellow-50">
          <div className="flex items-center mb-4">
            <FaStar className="text-3xl text-yellow-500 mr-4" />
            <h2 className="text-xl font-semibold text-slate-800">
              Our Expertise
            </h2>
          </div>
          <p className="text-slate-700">
            Apni Property specializes in high-value property transactions,
            offering expert insights into market trends and property
            evaluations. Whether you're looking to invest, find your dream home,
            or maximize your property's value, our team is equipped with the
            skills and knowledge to achieve outstanding results.
          </p>
        </div>

        <div className="p-6  shadow-lg rounded-lg  duration-500 hover:scale-105 bg-purple-50">
          <div className="flex items-center mb-4">
            <FaUserFriends className="text-3xl text-purple-500 mr-4" />
            <h2 className="text-xl font-semibold text-slate-800">
              Client-Centered Approach
            </h2>
          </div>
          <p className="text-slate-700">
            We place our clients at the heart of everything we do. Our agents
            take the time to understand your unique needs and goals, offering
            personalized solutions that align with your vision. Your
            satisfaction is our top priority.
          </p>
        </div>

        <div className="p-6  shadow-lg rounded-lg  duration-500 hover:scale-105 bg-teal-50">
          <div className="flex items-center mb-4">
            <FaShieldAlt className="text-3xl text-teal-500 mr-4" />
            <h2 className="text-xl font-semibold text-slate-800">
              Comprehensive Support
            </h2>
          </div>
          <p className="text-slate-700">
            Beyond buying and selling, Apni Property offers comprehensive
            support services, including property management, legal guidance, and
            market analysis. We're here to ensure your real estate journey is
            smooth and successful from start to finish.
          </p>
        </div>

        {/* <div className="p-6  shadow-lg rounded-lg transform transition duration-500 hover:scale-105 bg-pink-50">
          <div className="flex items-center mb-4">
            <FaMapSigns className="text-3xl text-pink-500 mr-4" />
            <h2 className="text-xl font-semibold text-slate-800">
              Our Locations
            </h2>
          </div>
          <p className="text-slate-700">
            Apni Property operates in the most sought-after neighborhoods,
            offering a wide range of properties across various prime locations.
            Whether you're looking for a cozy apartment or a luxury estate, we
            have the perfect spot for you.
          </p>
        </div> */}
      </div>
    </div>
  );
}
