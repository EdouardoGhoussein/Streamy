import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import DarkModeSwitch from "./components/DarkModeSwitch";
import SearchBar from "./components/SearchBar";
import Genres from "./components/Genres";
import Games from "./components/Games";
import { createContext, useEffect, useState } from "react";
import { ParentPlatform } from "./entities/Platfrom";

/* Genre context */
interface GenreTrans {
  id: number;
  name: string;
}

interface GenreContextProps {
  genre: GenreTrans;
  setGenre: React.Dispatch<React.SetStateAction<GenreTrans>>;
}

const defaultGenreContext: GenreContextProps = {
  genre: { id: 4, name: "Action" },
  setGenre: () => {},
};

export const GenreContext = createContext(defaultGenreContext);

/* ***************************************************************** */

/* Search context */

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const defaultSearchContext: SearchProps = {
  search: "",
  setSearch: () => {},
};

export const SearchContext = createContext(defaultSearchContext);

/* ***************************************************************** */

function App() {
  const [genre, setGenre] = useState<GenreTrans>(defaultGenreContext.genre);
  const [search, setSearch] = useState<string>(defaultSearchContext.search);

  const [platformOptions, setplatformOptions] = useState<ParentPlatform[]>([]);
  const REACT_APP_RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/platforms/lists/parents?key=${REACT_APP_RAWG_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      // Map the response to extract id and name
      const platforms: ParentPlatform[] = result.results.map(
        (platform: ParentPlatform) => ({
          id: platform.id,
          name: platform.name,
        })
      );
      setplatformOptions([...platforms, { id: -1, name: "Platform" }]);
    };

    fetchData();
  }, []);

  return (
    <div className="App container-fluid mb-5">
      <header className="row align-items-center my-3">
        <div className="col-md-1">
          <img src="image.png" alt="The Game Hub" className="img-fluid" />
        </div>
        <div className="col-md-8">
          <SearchContext.Provider value={{ search, setSearch }}>
            <SearchBar /> {/* SearchBar component */}
          </SearchContext.Provider>
        </div>
        <div className="col-md-2 text-right">
          <DarkModeSwitch /> {/* DarkModeSwitch component */}
        </div>
      </header>
      <div className="row align-items-top">
        <div className="col-md-2">
          <GenreContext.Provider value={{ genre, setGenre }}>
            <Genres />
          </GenreContext.Provider>
        </div>
        <div className="col-md-10">
          <SearchContext.Provider value={{ search, setSearch }}>
            <GenreContext.Provider value={{ genre, setGenre }}>
              <Games platformOptions={platformOptions} />
            </GenreContext.Provider>
          </SearchContext.Provider>
        </div>
      </div>
      {/* Other content goes here */}
    </div>
  );
}

export default App;
