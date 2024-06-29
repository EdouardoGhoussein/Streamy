import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DarkModeSwitch from "./components/DarkModeSwitch";
import SearchBar from "./components/SearchBar";
import Genres from "./components/Genres";
import DataFetcher from "./components/DataFetcher";

function App() {
  return (
    <div className="App container-fluid">
      <header className="row align-items-center my-3">
        <div className="col-md-1">
          <img src="image.png" alt="The Game Hub" className="img-fluid" />
        </div>
        <div className="col-md-8">
          <SearchBar /> {/* SearchBar component */}
        </div>
        <div className="col-md-2 text-right">
          <DarkModeSwitch /> {/* DarkModeSwitch component */}
        </div>
      </header>
      <div className="row align-items-center my-3">
        <div className="col-md-1">
          <Genres />
        </div>
      </div>
      {/* Other content goes here */}
    </div>
  );
}

export default App;
