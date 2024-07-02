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
  return (
    <div className="card h-100 rounded-3 shadow-sm">
      <img src={image} className="card-img-top rounded-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Rating: {rating}/10</p>
        <div className="platform-icons d-flex justify-content-start">
          {uniquePlatforms.map((slug) => {
            const platformIcon = getPlatformIcon(slug);
            return platformIcon ? (
              <span key={slug} className="me-2" title={platformIcon.alt}>
                {platformIcon.icon}
              </span>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
