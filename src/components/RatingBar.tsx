import exceptionalIcon from "../assets/exeptional.png";
import recommendedIcon from "../assets/recommended.png";
import mehIcon from "../assets/meh.png";
import skipIcon from "../assets/skip.png";
import { Rating } from "../entities/GameDetail";
import { useRef } from "react";

interface Props {
  ratings: Rating[];
}

const RatingBar = ({ ratings }: Props) => {
  const barRef = useRef<(HTMLDivElement | null)[]>([]);
  const infoRef = useRef<(HTMLDivElement | null)[]>([]);

  const getIcon = (type: string) => {
    switch (type) {
      case "exceptional":
        return exceptionalIcon;
      case "recommended":
        return recommendedIcon;
      case "meh":
        return mehIcon;
      case "skip":
        return skipIcon;
      default:
        return null;
    }
  };

  const renderIcon = (percentage: number, type: string) => {
    if (percentage > 15) {
      const IconComponent = getIcon(type);
      if (IconComponent) {
        return (
          <img
            src={IconComponent}
            alt={type}
            style={{
              width: "60px",
              height: "60px",
              position: "absolute",
              bottom: "-11px",
              left: "-17px",
            }}
          />
        );
      }
    }
    return null;
  };

  return (
    <div className="mb-5">
      <div className="hstack progression">
        {ratings.map((rating, index) => (
          <div
            className={`progress-bar ${rating.title}-bar`}
            role="progressbar"
            style={{ width: `${rating.percent}%` }}
            aria-valuenow={rating.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            key={index}
            ref={(el) => {
              barRef.current[index] = el;
            }}
            onMouseEnter={() =>
              infoRef.current[index]?.classList.add("info-hovered")
            }
            onMouseLeave={() =>
              infoRef.current[index]?.classList.remove("info-hovered")
            }
          >
            {renderIcon(rating.percent, rating.title)}
          </div>
        ))}
      </div>

      <div className="d-flex flex-wrap">
        {ratings.map((rating, index) => (
          <div
            className="rating-info button-container d-flex align-items-center p-2"
            key={index}
            ref={(el) => {
              infoRef.current[index] = el;
            }}
            onMouseEnter={() =>
              barRef.current[index]?.classList.add("bar-hovered")
            }
            onMouseLeave={() =>
              barRef.current[index]?.classList.remove("bar-hovered")
            }
          >
            <div
              className={`rounded-circle bg-primary p-1 ${rating.title}-bar`}
              style={{
                width: "15px",
                height: "15px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            ></div>
            <div className="ml-auto p-1 text-capitalize">{rating.title}</div>
            <div className="ml-auto p-1" style={{ opacity: "0.4" }}>
              {rating.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingBar;
