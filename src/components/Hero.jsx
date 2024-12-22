import { useState, useRef } from "react";
import Button from "./Button";
import { IoPlayCircleSharp } from "react-icons/io5";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  // Starts with the first video since it is called hero-1.mp4
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);

  const handleMiniVideoClick = () => {
    setHasClicked(true);

    setCurrentVideoIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  const handleVideoLoad = () => {
    setLoadedVideos((prevCount) => prevCount + 1);
  };

  const getVideoSrc = (index) => {
    return `/videos/hero-${index}.mp4`;
  };

  //   ANIMATIONS

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          duration: 1,
          scale: 1,
          ease: "power1.inOut",
          width: "100%",
          height: "100%",
          onStart: () => {
            nextVideoRef.current.play();
          },
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          duration: 1.5,
          scale: 0,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentVideoIndex],
      revertOnUpdate: true,
    }
  );

  return (
    <div className="h-dvh relative w-screen overflow-x-hidden">
      {/* Next video container */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-x-hidden rounded-lg
      bg-blue-75"
      >
        <div>
          <div
            className="absolute absolute-center z-50 mask-clip-path size-64
          cursor-pointer overflow-hidden rounded-lg"
          >
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 object-cover object-center z-50
                opacity-0 transition-all duration-400 ease-in hover:scale-100 hover:opacity-100"
            >
              {/* Mini video */}
              <video
                src={getVideoSrc((currentVideoIndex % totalVideos) + 1)}
                loop
                muted
                id="current-video"
                ref={nextVideoRef}
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          {/* Video for zooming effect */}
          <video
            src={getVideoSrc(currentVideoIndex)}
            ref={nextVideoRef}
            loop
            muted
            id="next-video"
            className="absolute-center z-20 size-64 invisible object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          {/* Main background video */}
          <video
            src={getVideoSrc(currentVideoIndex)}
            autoPlay
            loop
            muted
            className="absolute-center size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* Heading */}
        <h1 className="absolute hero-heading z-40 bottom-5 right-5 text-blue-75 special-font">
          G<b>A</b>MING
        </h1>

        {/* Black effect for the heading */}
        <h1 className="absolute hero-heading bottom-5 right-5 text-black special-font">
          G<b>A</b>MING
        </h1>

        {/* Top content container */}
        <div className="absolute top-0 left-0 z-30 size-full">
          <div className="mt-24 px-4 sm:px-10">
            {/* Heading */}
            <h1 className="special-font hero-heading text-blue-100 tracking-tighter">
              Redefi<b>n</b>e
            </h1>
            {/* Paragraph */}
            <p className="mb-5 text-blue-100 max-w-64 font-robert-regular tracking-wider px-2">
              Enter the Metagame Layer
              <br />
              Unleash the Play Economy
            </p>

            {/* Button */}
            <Button
              id="trailer-btn"
              title="Watch Trailer"
              leftIcon={<IoPlayCircleSharp />}
              containerClass="bg-yellow-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
