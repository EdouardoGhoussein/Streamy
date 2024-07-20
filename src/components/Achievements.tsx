import { useEffect, useState } from "react";
import { Achievement } from "../entities/Achievements";
import AchievementDesc from "./AchievementDesc";

interface Props {
  id: number;
}

const Achievements = ({ id }: Props) => {
  const [achievements, setAchievements] = useState<Achievement[] | undefined>(
    []
  );
  const REACT_APP_RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
  useEffect(() => {
    const fetchTrailers = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games/${id}/achievements?key=${REACT_APP_RAWG_API_KEY}`
      );

      const result = await response.json();
      setAchievements(result.results);
    };
    fetchTrailers();
  }, [id]);
  return (
    <div className="mt-5">
      <h1 className="p-2">Achivements</h1>
      <div className="list-group">
        {achievements?.map((achievement, index) => (
          <div
            className="list-group-item"
            style={{ backgroundColor: "transparent", border: "none" }}
            key={index}
          >
            <AchievementDesc
              name={achievement.name}
              description={achievement.description}
              image={achievement.image}
              percent={achievement.percent}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
