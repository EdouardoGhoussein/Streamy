import { useParams } from "react-router-dom";
import GameScreenShots from "../components/GameScreenShots";
import "./GamePage.css";
const GamePage = () => {
  const params = useParams<string>();
  return (
    <div>
      GamePage {params.id}
      <GameScreenShots id={params.id} />
    </div>
  );
};

export default GamePage;
