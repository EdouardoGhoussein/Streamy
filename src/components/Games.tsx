import { useContext, useEffect, useState } from "react";
import GameCard from "./GameCard";
import { GenreContext } from "../App";
import { Game } from "../entities/Game";

interface Games {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

const Games = () => {
  const [data, setData] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const genreContext = useContext(GenreContext);

  const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  const fetchGames = async (page: number) => {
    try {
      console.log(data);
      setLoading(true);
      const response = await fetch(
        `https://api.rawg.io/api/games?genres=${genreContext.genre.id}&page_size=50&page=${page}&key=${RAWG_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result: Games = await response.json();
      setData(result.results);
      setTotalPages(Math.ceil(result.count / 20)); // Assuming 20 games per page
      setError(null);
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

  useEffect(() => {
    fetchGames(currentPage);
  }, [currentPage, genreContext.genre.id]);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (startPage < 1) {
      startPage = 1;
      endPage = 5;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - 4;
    }

    if (startPage < 1) {
      startPage = 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`page-button ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          className="page-arrow"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </button>
        {pageButtons}
        <button
          className="page-arrow"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </button>
      </div>
    );
  };

  if (error) {
    return <h3>Error: {error}</h3>;
  }

  return (
    <div className="container">
      <h1>{genreContext.genre.name} Games</h1>
      <div className="row">
        {data.map((game) => (
          <div className="col-md-3 mb-3" key={game.id}>
            <GameCard
              name={game.name}
              image={game.background_image}
              rating={game.rating}
              platforms={game.platforms}
            />
          </div>
        ))}
      </div>
      {loading && <h3>Loading...</h3>}
      <div className="d-flex justify-content-center">{renderPageButtons()}</div>
    </div>
  );
};

export default Games;
