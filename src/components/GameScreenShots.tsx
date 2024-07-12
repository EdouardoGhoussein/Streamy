import { useEffect, useState, useRef } from "react";
import { Spinner, Alert } from "react-bootstrap";

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

const GameScreenShots = ({ id }: Props) => {
  const [screenshots, setScreenshots] = useState<Image[]>([]);
  const [shotLoading, setShotLoading] = useState(true);
  const [shotError, setShotError] = useState<null | string>(null);

  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [trailerLoading, setTrailerLoading] = useState(true);
  const [trailerError, setTrailerError] = useState<null | string>(null);

  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [selectedMediaType, setSelectedMediaType] = useState<
    "image" | "video" | null
  >(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const REACT_APP_RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

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
        setSelectedMedia(result.results[0]?.image || null); // Set initial selected media
        setSelectedMediaType("image");
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
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${id}/movies?key=${REACT_APP_RAWG_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setTrailers(result.results);
      } catch (err) {
        if (err instanceof Error) {
          setTrailerError(err.message);
        } else {
          setTrailerError("An unknown error occurred");
        }
      } finally {
        setTrailerLoading(false);
      }
    };
    fetchTrailers();
  }, []);

  const handleThumbnailClick = (media: string, type: "image" | "video") => {
    setSelectedMedia(media);
    setSelectedMediaType(type);
  };

  return (
    <div className="container game-screenshots-container ">
      {shotLoading && <Spinner animation="border" />}
      {shotError && <Alert variant="danger">{shotError}</Alert>}
      <div className="row">
        <div className="col-8 main-display mb-3">
          {selectedMedia && selectedMediaType === "video" ? (
            <video src={selectedMedia} controls className="main-media"></video>
          ) : (
            <img
              src={selectedMedia || ""}
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
          <div className="game-screenshots flex-grow-1" ref={scrollRef}>
            {screenshots.map((image) => (
              <div
                key={image.id}
                className={`thumbnail-container ${
                  selectedMedia === image.image ? "selected" : ""
                }`}
              >
                <img
                  src={image.image}
                  className="thumbnail-img"
                  alt={`Screenshot ${image.id}`}
                  onClick={() => handleThumbnailClick(image.image, "image")}
                />
                {selectedMedia === image.image && (
                  <i className="bi bi-triangle-fill triangle"></i>
                )}
              </div>
            ))}
            {trailers.map((trailer, index) => (
              <div
                key={index}
                className={`thumbnail-container ${
                  selectedMedia === trailer.data.max ? "selected" : ""
                }`}
              >
                <img
                  src={trailer.preview}
                  className="thumbnail-img"
                  alt={trailer.name}
                  onClick={() =>
                    handleThumbnailClick(trailer.data.max, "video")
                  }
                />
                {selectedMedia === trailer.data.max && (
                  <i className="bi bi-triangle-fill triangle"></i>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreenShots;
