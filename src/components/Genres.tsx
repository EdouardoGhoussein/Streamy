import { useContext, useEffect, useState } from "react";
import { GenreContext } from "../App";

interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

interface Genres {
  count: number;
  next: string;
  previous: string;
  results: Genre[];
}

const Genres = () => {
  const [data, setData] = useState<Genres>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const genreContext = useContext(GenreContext);

  const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/genres?key=${RAWG_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  let content;
  if (error) {
    content = <h3>Error: {error}</h3>;
  } else if (loading) {
    content = <h3>Loading...</h3>;
  } else {
    content = (
      <ul className="list-group">
        {data?.results.map((genre) => (
          <li
            key={genre.id}
            className="list-group-item-custom d-flex align-items-center"
          >
            <button
              type="button"
              className="btn w-100 d-flex align-items-center text-start"
              style={{ padding: "10px 5px" }}
              onClick={() =>
                genreContext.setGenre({ id: genre.id, name: genre.name })
              }
            >
              <img
                src={genre.image_background}
                alt={genre.name}
                className="me-3"
                style={{ width: "40px", height: "40px", borderRadius: "10px" }}
              />
              <h3
                className={
                  (genreContext.genre.id === genre.id ? "highlighted " : "") +
                  "h5 mb-0"
                }
              >
                {genre.name}
              </h3>
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h2>Genres</h2>

      {content}
    </>
  );
};

export default Genres;
