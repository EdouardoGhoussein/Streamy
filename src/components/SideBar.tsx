import { Link } from "react-router-dom";
import ScrollButton from "./ScrollButton";

const SideBar: React.FC = () => {
  const areas = [
    "Game info",
    "About",
    "Where to buy",
    "Trailers & images",
    "Rating",
    "Platforms",
    "Metacritics",
    "Genres",
    "Release date",
    "Developers",
    "Publishers",
    "Age rating",
    "Games in series",
    "Tags",
    "Website",
    "System requirements",
  ];
  return (
    <div className="sticky-component p-0 m-0">
      <div className="list-group">
        <div className="list-group-item sidebar-element p-1">
          <Link to="/Streamy/">
            <button className="btn btn-transparent p-1">
              <h3 className="text-start">Home</h3>
            </button>
          </Link>
        </div>
        {areas.map((area, index) => (
          <ScrollButton targetId={area} label={area} key={index} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
