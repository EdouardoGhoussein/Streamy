import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import DarkModeSwitch from "./components/DarkModeSwitch";
import SearchBar from "./components/SearchBar";
import Genres from "./components/Genres";
import Games from "./components/Games";
import { createContext, useState } from "react";

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

  return (
    <div className="App container-fluid">
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
              <Games />
            </GenreContext.Provider>
          </SearchContext.Provider>
        </div>
      </div>
      {/* Other content goes here */}
    </div>
  );
}

export default App;
