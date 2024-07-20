import { useEffect, useState } from "react";
import {
  Developer,
  ESRBRating,
  Genre,
  PlatformDetail,
  Publisher,
  Tag,
} from "../entities/GameDetail";
import { formatDate } from "./GameDescription";
import { Game } from "../entities/Game";
import RegisteringComponent from "./RegisteringComponent";

interface Props {
  id: number;
  platforms: PlatformDetail[];
  metacritic: number;
  genres: Genre[];
  developers: Developer[];
  publishers: Publisher[];
  released: string;
  esrb_rating: ESRBRating | undefined;
  tags: Tag[];
  website: string;
}

const esrbRatingMap: Record<string, string> = {
  "Early Childhood": "3+",
  Everyone: "6+",
  "Everyone 10+": "10+",
  Teen: "13+",
  Mature: "17+",
  "Adults Only": "18+",
  "Not Rated": "",
};

const GameAdditionalInfo = ({
  id,
  platforms,
  metacritic,
  genres,
  developers,
  publishers,
  released,
  esrb_rating,
  tags,
  website,
}: Props) => {
  const [games, setGames] = useState<Game[] | undefined>([]);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const REACT_APP_RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
  useEffect(() => {
    const fetchTrailers = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games/${id}/game-series?key=${REACT_APP_RAWG_API_KEY}`
      );

      const result = await response.json();
      setGames(result.results);
    };
    fetchTrailers();
  }, [id]);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 p-0 me-4">
          <RegisteringComponent id="Platforms">
            <div>
              <h4 className="p-0 mb-3">Platforms</h4>
              <div className="d-flex flex-wrap p-0">
                {platforms.map((platform, index) => (
                  <div key={index} className="me-2 text-decoration-underline">
                    <a>{platform.platform.name},</a>
                  </div>
                ))}
              </div>
            </div>
          </RegisteringComponent>
        </div>
        <div className="col-md-5 p-0">
          <RegisteringComponent id="Metacritics">
            <div>
              <h4 className="p-0 mb-3">Metacritics</h4>
              <div
                className="d-inline p-1 pe-2 ps-2"
                style={{
                  color: "#6dc849",
                  border: "1.5px solid rgba(109, 200, 73, .4)",
                  borderRadius: "5px",
                  fontWeight: 700,
                }}
              >
                {metacritic}
              </div>
            </div>
          </RegisteringComponent>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 p-0 me-4">
          <RegisteringComponent id="Genres">
            <h4 className="p-0 mb-3">Genre</h4>
            <div className="d-flex flex-wrap p-0">
              {genres.map((genres, index) => (
                <div key={index} className="me-2 text-decoration-underline">
                  <a>{genres.name},</a>
                </div>
              ))}
            </div>
          </RegisteringComponent>
        </div>

        <div className="col-md-5 p-0">
          <RegisteringComponent id="Release date">
            <h4 className="p-0 mb-3">Release date</h4>
            <div className="text-capitalize">
              {formatDate(released).toLowerCase()}
            </div>
          </RegisteringComponent>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 p-0 me-4">
          <RegisteringComponent id="Developers">
            <h4 className="p-0 mb-3">Developer</h4>
            <div className="d-flex flex-wrap p-0">
              {developers.map((developer, index) => (
                <div key={index} className="me-2 text-decoration-underline">
                  <a>{developer.name},</a>
                </div>
              ))}
            </div>
          </RegisteringComponent>
        </div>

        <div className="col-md-5 p-0">
          <RegisteringComponent id="Publishers">
            <h4 className="p-0 mb-3">Publisher</h4>
            <div className="d-flex flex-wrap p-0">
              {publishers.map((publisher, index) => (
                <div key={index} className="me-2 text-decoration-underline">
                  <a>{publisher.name},</a>
                </div>
              ))}
            </div>
          </RegisteringComponent>
        </div>
      </div>

      <div className="row mt-5">
        <RegisteringComponent id="Age rating">
          <h4 className="p-0 mb-3">Age rating</h4>
          <div className="p-0">
            {esrbRatingMap[esrb_rating ? esrb_rating.name : "Not Rated"] +
              " " +
              esrb_rating?.name}
          </div>
        </RegisteringComponent>
      </div>

      <div className="row mt-5">
        <RegisteringComponent id="Games in series">
          <h4 className="p-0 mb-3">Other games in the series</h4>
          <div className="d-flex flex-wrap p-0">
            {games?.map((game, index) => (
              <div key={index} className="me-2 text-decoration-underline">
                <a href={`${game.id}`}>{game.name},</a>
              </div>
            ))}
          </div>
        </RegisteringComponent>
      </div>

      <div className="row mt-5">
        <RegisteringComponent id="Tags">
          <h4 className="p-0 mb-3">Tags</h4>
          <div className="d-flex flex-wrap p-0">
            {tags.map((tag) => (
              <div key={tag.id} className="me-2 text-decoration-underline">
                <a>{tag.name},</a>
              </div>
            ))}
          </div>
        </RegisteringComponent>
      </div>

      <div className="row mt-5 mb-5">
        <RegisteringComponent id="Website">
          <h4 className="p-0 mb-3">Website</h4>
          <div className="me-2 p-0 text-decoration-underline">
            <a href={website}>{website}</a>
          </div>
        </RegisteringComponent>
      </div>

      <RegisteringComponent id="System requirements">
        <div
          className="row p-0"
          style={{
            maxHeight: showFullDescription ? "none" : "150px",
            overflowY: "hidden",
          }}
        >
          {platforms.map((platform, index) => (
            <div key={index} className="row mt-1">
              <h3 className="p-0 mb-3">
                System requirements for {platform.platform.name}
              </h3>
              <div className="me-2 p-0 text-decoration-underline">
                {platform.requirements.minimum && (
                  <p>Minimum: {platform.requirements.minimum}</p>
                )}
                {platform.requirements.recommended && (
                  <p>Recommended: {platform.requirements.recommended}</p>
                )}
              </div>
            </div>
          ))}{" "}
        </div>
      </RegisteringComponent>

      <button className="show-text" onClick={toggleDescription}>
        {showFullDescription ? "show less..." : "show more..."}
      </button>
    </div>
  );
};

export default GameAdditionalInfo;
