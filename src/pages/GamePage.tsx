import { useParams } from "react-router-dom";
import GameScreenShots from "../components/GameScreenShots";
import "./GamePage.css";
import { useEffect, useState } from "react";
import GameDescription from "../components/GameDescription";
import { Platform } from "../entities/Platfrom";
import Rating from "../components/Rating";

interface Game {
  id: number;
  name: string;
  description: string;
  background_image: string;
  released: string;
  parent_platforms: { platform: Platform }[];
  playtime: number;
  rating: number;
  ratings_count: number;
}

const GamePage = () => {
  const params = useParams<string>();

  const [data, setData] = useState<Game | null>(null);

  const REACT_APP_RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games/${params.id}?key=${REACT_APP_RAWG_API_KEY}`
      );
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div
      className="container-fluid vh-100 d-flex flex-column"
      style={{
        backgroundImage: document.body.classList.contains("dark-mode")
          ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1)), url(${data?.background_image})`
          : `linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1)), url(${data?.background_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className={true && "row justify-content-center"}>
        <div className="col-md-2"></div>
        <div className="col-md-4">
          <GameDescription
            name={data ? data.name : "Undefined"}
            released={data ? data.released : "01-01-2000"}
            parent_platforms={data ? data.parent_platforms : []}
            playtime={data ? data.playtime : 0}
          />
          <Rating
            rating={data ? data.rating : 0}
            rating_counts={data ? data.ratings_count : 0}
          />
          <div
            style={{ width: "100%" }}
            dangerouslySetInnerHTML={{ __html: data ? data.description : "" }}
          />
        </div>
        <div className="col-md-4">
          <GameScreenShots id={params.id} />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
