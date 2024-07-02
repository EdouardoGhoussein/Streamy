import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Platform, getPlatformIcon } from "../entities/Platfrom";

interface Props {
  name: string;
  image: string;
  rating: number;
  platforms: Platform[];
}

const GameCard = ({ name, image, rating, platforms }: Props) => {
  const uniquePlatforms = Array.from(
    new Set(
      platforms.map((platform) => {
        if (platform.platform.slug.startsWith("playstation"))
          return "playstation";
        if (platform.platform.slug.startsWith("xbox")) return "xbox";
        if (platform.platform.slug.startsWith("nintendo")) return "nintendo";
        return platform.platform.slug;
      })
    )
  );

  // Calculate stars for rating
  const getStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 2 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={stars.length} />);
    }
    return stars;
  };

  return (
    <div className="card h-100 rounded-3 shadow-sm">
      <img src={image} className="card-img-top rounded-top" alt={name} />
      <div className="card-body">
        <div className="platform-icons d-flex justify-content-start mb-3">
          {uniquePlatforms.map((slug) => {
            const platformIcon = getPlatformIcon(slug);
            return platformIcon ? (
              <span
                key={slug}
                className="platform-icon me-2"
                title={platformIcon.alt}
              >
                {platformIcon.icon}
              </span>
            ) : null;
          })}
        </div>
        <h5 className="mb-3 card-title">{name}</h5>
        <div className="mb-3 card-text">
          <div
            className="rating d-flex align-items-center"
            style={{ color: "gold" }}
          >
            {getStars(rating)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
