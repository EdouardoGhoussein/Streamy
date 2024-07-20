import { useParams } from "react-router-dom";
import GameScreenShots from "../components/GameScreenShots";
import "./GamePage.css";
import { useEffect, useState } from "react";
import GameDescription from "../components/GameDescription";
import Rating from "../components/Rating";
import { GameDetail } from "../entities/GameDetail";
import RatingBar from "../components/RatingBar";
import About from "../components/About";
import WhereToBy from "../components/WhereToBy";
import GameAdditionalInfo from "../components/GameAdditionalInfo";
import Achievements from "../components/Achievements";
import SideBar from "../components/SideBar";
import RegisteringComponent from "../components/RegisteringComponent";

const GamePage = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    const isDarkMode = savedTheme ? JSON.parse(savedTheme) : true;
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  const params = useParams<string>();

  const [data, setData] = useState<GameDetail | null>(null);

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
      className="container-fluid ms-0 vh-100 d-flex flex-column"
      style={{
        backgroundImage: document.body.classList.contains("dark-mode")
          ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1)), url(${data?.background_image})`
          : `linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1)), url(${data?.background_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-3 mt-5">
          <SideBar />
        </div>

        <div className="col-md-4 m-5 p-0">
          <RegisteringComponent id="Game info">
            <GameDescription
              name={data ? data.name : "Undefined"}
              released={data ? data.released : "01-01-2000"}
              parent_platforms={data ? data.parent_platforms : []}
              playtime={data ? data.playtime : 0}
            />
          </RegisteringComponent>
          <RegisteringComponent id="Rating">
            <Rating
              rating={data ? data.rating : 0}
              rating_counts={data ? data.ratings_count : 0}
            />
            <RatingBar ratings={data ? data.ratings : []} />
          </RegisteringComponent>
          <RegisteringComponent id="About">
            <About description={data ? data.description : ""} />
          </RegisteringComponent>
          <GameAdditionalInfo
            id={data ? data.id : 0}
            platforms={data ? data.platforms : []}
            metacritic={data ? data.metacritic : 0}
            genres={data ? data.genres : []}
            developers={data ? data.developers : []}
            publishers={data ? data.publishers : []}
            released={data ? data.released : "01-01-2000"}
            esrb_rating={data?.esrb_rating}
            tags={data ? data.tags : []}
            website={data ? data.website : ""}
          />
        </div>
        <div className="col-md-4">
          <RegisteringComponent id="Trailers & images">
            <GameScreenShots id={params.id} />
          </RegisteringComponent>
          <RegisteringComponent id="Where to buy">
            <WhereToBy stores={data ? data.stores : []} />
          </RegisteringComponent>
          <RegisteringComponent id="Achievements">
            <Achievements id={data ? data.id : 0} />
          </RegisteringComponent>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
