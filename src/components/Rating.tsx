import exceptionalIcon from "../assets/exeptional.png";
import recommendedIcon from "../assets/recommended.png";
import mehIcon from "../assets/meh.png";
import skipIcon from "../assets/skip.png";

interface Props {
  rating: number;
  rating_counts: number;
}

const getRatingLabelAndIcon = (rating: number) => {
  if (rating >= 4) {
    return { label: "Exceptional", icon: exceptionalIcon };
  } else if (rating >= 3) {
    return { label: "Recommended", icon: recommendedIcon };
  } else if (rating >= 2) {
    return { label: "Meh", icon: mehIcon };
  } else {
    return { label: "Skip", icon: skipIcon };
  }
};

const Rating = ({ rating, rating_counts }: Props) => {
  const { label, icon } = getRatingLabelAndIcon(rating);

  return (
    <div>
      <div className="d-flex align-items-center">
        <div
          className="fw-bold justify-content-center"
          style={{
            fontSize: "24px",
            fontWeight: 700,
            paddingBottom: "8px",
            letterSpacing: "1.2px",
          }}
        >
          {label}
        </div>
        <img
          src={icon}
          alt={label}
          className="me-2"
          style={{
            marginLeft: "8px",
            width: "32px",
            height: "32px",
            marginBottom: "10px",
          }}
        />
      </div>
      <div>
        <a>{rating_counts} ratings</a>
      </div>
    </div>
  );
};

export default Rating;
