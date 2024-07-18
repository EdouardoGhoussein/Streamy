import { Platform } from "../entities/Platfrom";
import PlatformIcon from "./PlatformIcon";

interface Info {
  name: string;
  released: string;
  parent_platforms: { platform: Platform }[];
  playtime: number;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
};

const GameDescription = ({
  name,
  released,
  parent_platforms,
  playtime,
}: Info) => {
  console.log(parent_platforms);
  return (
    <div>
      <div className="row justify-content-start">
        <div className="col-2 w-auto p-2 align-content-center etiquette">
          {formatDate(released)}
        </div>
        <div className="d-flex col-auto h-100">
          {parent_platforms.map((plat) => (
            <PlatformIcon slug={plat.platform.slug} />
          ))}{" "}
        </div>
        <div className="col-2 w-auto align-content-center">
          AVERAGE PLAYTIME: {playtime} HOURS
        </div>
      </div>
      <h1 className="display-1 fw-bold text-start">{name}</h1>
    </div>
  );
};

export default GameDescription;