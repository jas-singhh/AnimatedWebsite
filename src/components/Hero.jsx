import { useState, useRef } from "react";

const Hero = () => {
  // Starts with the first video since it is called hero-1.mp4
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedVideosCount, setLoadedVideosCount] = useState(0);

  const totalVideos = 3;
  const nextVideoRef = useRef(null);

  const handleMiniVideoClick = () => {
    setHasClicked(true);

    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % totalVideos);
  };

  const getVideoSrc = (index) => {
    return `/videos/hero-${index}.mp4`;
  };

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
              className="origin-center scale-50 object-cover object-center
                opacity-0 transition-all duration-400 ease-in hover:scale-100 hover:opacity-100"
            >
              {/* Mini video */}
              <video
                src={getVideoSrc(currentVideoIndex + 1)}
                autoPlay
                loop
                muted
                id="current-video"
                ref={nextVideoRef}
                className="size-64 origin-center scale-150 object-cover object-center"
              />
            </div>
          </div>

          {/* Next video */}
          <video
            src={getVideoSrc(currentVideoIndex)}
            autoPlay
            loop
            muted
            ref={nextVideoRef}
            id="next-video"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
