"use client";

import { useState, useEffect } from "react";
import Container from "../components/Container";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Easy Slot Booking",
      description: "Quickly secure your slot with our user-friendly interface. No hassle, just a few clicks!",
    },
    {
      title: "Real-Time Availability",
      description: "Check availability in real-time and ensure you get the time and date you want.",
    },
    {
      title: "Exclusive Offers",
      description: "Enjoy special discounts and offers when you book through our platform.",
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Autoplay logic
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="">
      {/* Welcome Section */}
      <Container>



        <section className="text-center bg-gray-100 p-6  rounded-md shadow-md h-[500px] flex justify-center items-center">

          <div className="">
            <h1 className="text-3xl font-bold text-[#41a6d4]">Welcome to Our Booking Platform!</h1>
            <p className="mt-[6px] text-gray-700">
              Secure your spot effortlessly! Book your slot now and never miss out on the opportunity.
            </p>
          </div>


        </section>


        {/* Carousel Section */}
        <section className="mt-8 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold  text-center justify-center text-gray-800">Explore Our Features</h2>
          <div className="relative  mt-5">
            <div className="overflow-hidden  h-[150px]">
              <div
                className="whitespace-nowrap transition-transform duration-500"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="inline-block w-full p-6   text-center"
                  >
                    <h3 className="text-lg font-semibold text-[#41a6d4]">{slide.title}</h3>
                    <p className="text-gray-600">{slide.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
            >
              &lt;
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
            >
              &gt;
            </button>
          </div>
        </section>

        {/* Guest View Section */}
        <section className="mt-12 bg-gray-100 p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Guest View</h2>
          <p className="mt-3 text-center text-gray-700">
            As a guest, you can explore our slots, view detailed availability, and secure bookings without signing up.
          </p>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-md shadow-md">
              <h3 className="text-lg font-semibold text-[#41a6d4]">Browse Available Slots</h3>
              <p className="text-gray-600">See what times are open and book instantly.</p>
            </div>
            <div className="p-4 bg-white rounded-md shadow-md">
              <h3 className="text-lg font-semibold text-[#41a6d4]">Customizable Preferences</h3>
              <p className="text-gray-600">Filter slots by your preferred date and time.</p>
            </div>
            <div className="p-4 bg-white rounded-md shadow-md">
              <h3 className="text-lg font-semibold text-[#41a6d4]">Instant Confirmation</h3>
              <p className="text-gray-600">Get immediate confirmation of your booking.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 text-center bg-[#41a6d4] text-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-bold">Ready to Book?</h2>
          <p className="mt-3">
            Take control of your schedule. Sign up or book as a guest today!
          </p>
          <button className="mt-5 px-6 py-3 bg-white text-[#41a6d4] rounded-md shadow-md hover:bg-gray-200 font-semibold">
            Book Your Slot
          </button>
        </section>
      </Container>
    </div>
  );
}
