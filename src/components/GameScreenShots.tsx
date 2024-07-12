import { useEffect, useState, useRef } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { usePageVisibility } from "../hooks/usePageVisibility";
import { useTimer } from "react-timer-hook";

interface Props {
  id: string | undefined;
}

interface Image {
  id: number;
  image: string;
}

interface Trailer {
  name: string;
  preview: string;
  data: { max: string };
}

interface SelectedMedia {
  index: number;
  url: string;
  type: "video" | "image";
}

const GameScreenShots = ({ id }: Props) => {
  const nbFirstTrailers = 2;
  const seconds = 5;

  const [screenshots, setScreenshots] = useState<Image[]>([]);
  const [shotLoading, setShotLoading] = useState(true);
  const [shotError, setShotError] = useState<null | string>(null);

  const [trailers, setTrailers] = useState<Trailer[]>([]);

  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia | null>(
    null
  );

  const scrollRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isVisible = usePageVisibility();

  const REACT_APP_RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  const expiryTimestamp = new Date();

  const roll = () => {
    let nextIndex =
      selectedMedia?.index != undefined ? selectedMedia.index + 1 : undefined;
    if (nextIndex === undefined) return;
    if (nextIndex > scrollRef.current.length) nextIndex = 0;

    scrollRef.current[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    scrollRef.current[nextIndex]?.click();
  };

  const { pause, resume, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      if (selectedMedia?.type === "video") return;
      roll();
    },
  });

  useEffect(() => {
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + seconds);
    restart(expiryTimestamp);
  }, [selectedMedia]);

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${id}/screenshots?key=${REACT_APP_RAWG_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setScreenshots(result.results);
      } catch (err) {
        if (err instanceof Error) {
          setShotError(err.message);
        } else {
          setShotError("An unknown error occurred");
        }
      } finally {
        setShotLoading(false);
      }
    };
    fetchScreenshots();
  }, []);

  useEffect(() => {
    const fetchTrailers = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games/${id}/movies?key=${REACT_APP_RAWG_API_KEY}`
      );

      const result = await response.json();
      setTrailers(result.results);
      setSelectedMedia({
        index: 0,
        url: result.results[0]?.data.max || null,
        type: "video",
      }); // Set initial selected media
    };
    fetchTrailers();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (!isVisible) {
        video.pause();
        pause();
      } else {
        resume();
      }
    }
  }, [isVisible]);

  const handleThumbnailClick = (media: SelectedMedia) => {
    setSelectedMedia(media);
  };

  const displayVideo = (trailer: Trailer, index: number) => {
    return (
      <div
        key={index}
        className={`thumbnail-container ${
          selectedMedia?.url === trailer.data.max ? "selected" : ""
        }`}
      >
        <img
          src={trailer.preview}
          className="thumbnail-img"
          alt={trailer.name}
          ref={(el) => {
            scrollRef.current[index] = el;
          }}
          onClick={() =>
            handleThumbnailClick({
              index: index,
              url: trailer.data.max,
              type: "video",
            })
          }
        />
        <i className="bi bi-caret-right-square-fill"></i>
        <i className="bi bi-caret-right-fill"></i>
        {selectedMedia?.url === trailer.data.max && (
          <i className="bi bi-triangle-fill triangle"></i>
        )}
      </div>
    );
  };

  return (
    <div className="container game-screenshots-container ">
      {shotLoading && <Spinner animation="border" />}
      {shotError && <Alert variant="danger">{shotError}</Alert>}
      <div className="row">
        <div className="col-8 main-display mb-3">
          {selectedMedia && selectedMedia.type === "video" ? (
            <video
              src={selectedMedia.url}
              controls
              autoPlay
              ref={videoRef}
              className="main-media"
              onEnded={roll}
              onPlay={() => {
                if (!isVisible && videoRef.current !== null)
                  videoRef.current.pause();
              }}
            ></video>
          ) : (
            <img
              src={selectedMedia?.url || ""}
              alt="Selected"
              className="main-media"
            />
          )}
        </div>
      </div>
      <div className="row">
        <div
          className="col-8 d-flex align-items-center position-relative"
          style={{ padding: 0 }}
        >
          <div className="game-screenshots flex-grow-1">
            {trailers
              .slice(0, nbFirstTrailers)
              .map((trailer, index) => displayVideo(trailer, index))}
            {screenshots.map((image, index) => (
              <div
                key={nbFirstTrailers + index}
                className={`thumbnail-container ${
                  selectedMedia?.url === image.image ? "selected" : ""
                }`}
              >
                <img
                  src={image.image}
                  className="thumbnail-img"
                  alt={`Screenshot ${image.id}`}
                  ref={(el) => {
                    scrollRef.current[nbFirstTrailers + index] = el;
                  }}
                  onClick={() =>
                    handleThumbnailClick({
                      index: index + nbFirstTrailers,
                      url: image.image,
                      type: "image",
                    })
                  }
                />
                {selectedMedia?.url === image.image && (
                  <i className="bi bi-triangle-fill triangle"></i>
                )}
              </div>
            ))}
            {trailers
              .slice(nbFirstTrailers)
              .map((trailer, index) =>
                displayVideo(
                  trailer,
                  index + nbFirstTrailers + screenshots.length
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreenShots;
