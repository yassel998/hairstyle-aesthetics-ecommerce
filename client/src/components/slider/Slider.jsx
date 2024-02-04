import React, { useState } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import "./slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    "https://images.squarespace-cdn.com/content/v1/569dca5b0ab377a22475c51c/1535344441764-VL6FYCCZ4OYN5D6KXO4M/CFC_Pack.gif?format=2500w",
    "https://images.squarespace-cdn.com/content/v1/569dca5b0ab377a22475c51c/1536038004137-WWORTXG5DZU4YHA9RVSA/Main+3_2.jpg?format=2500w",
    "https://images.squarespace-cdn.com/content/v1/569dca5b0ab377a22475c51c/1678557757295-TEMT83F8BYDZO2N4YKKX/AllBrightCSerum_Q1_2021_Image2.jpg?format=2500w",
    "https://images.squarespace-cdn.com/content/v1/569dca5b0ab377a22475c51c/1535840105242-NKO7Q4ZYCYHASFPPA5SK/CFC_Color_Group_01.gif?format=2500w",
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 3 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 3 ? 0 : (prev) => prev + 1);
  };

  return (
    <div className="slider">
      <div
        className="container"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <img src={data[0]} alt="" />
        <img src={data[1]} alt="" />
        <img src={data[2]} alt="" />
        <img src={data[3]} alt="" />
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <WestOutlinedIcon />
        </div>
        <div className="icon" onClick={nextSlide}>
          <EastOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;
