import "./home.css"
import React, { useState, useRef, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

function Homepage() {
 
  const slides = [
    {
      url: require("../assets/n-1.jpeg"),
    },
    {
      url: require("../assets/n-2.jpeg"),
    },
    {
      url: require("../assets/n-3.jpeg"),
    },

    {
      url: require("../assets/n-4.jpeg"),
    },
    {
      url: require("../assets/n-5.jpeg"),
    },
    {
      url: require("../assets/n-6.jpeg"),
    },
    {
      url: require("../assets/n-7.jpeg"),
    },
    {
      url: require("../assets/n-8.jpeg"),
    },
    {
      url: require("../assets/n-9.jpeg"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };



  console.log(currentIndex);

  return (
    <div className="home">
      {/* <div className="gradient-border" id="box"> */}

      <h2 className="gradient-heading">
        Explore, Create and Trade digital art
      </h2>
      <h2>like never before</h2>
      <br />

      {/* slide animation using tailwind */}
      <div className="slide-box max-w-[1550px] h-[500px] w-full mt-5  relative group">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        ></div>
        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Homepage;