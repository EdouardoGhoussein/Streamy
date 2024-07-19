import { useState } from "react";

interface Props {
  description: string;
}

const About = ({ description }: Props) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  return (
    <div>
      <h1 className="mb-3">About</h1>
      <div>
        <div
          style={{
            width: "100%",
            maxHeight: showFullDescription ? "none" : "200px",
            overflow: "hidden",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <button className="show-text" onClick={toggleDescription}>
          {showFullDescription ? "show less..." : "show more..."}
        </button>
      </div>
    </div>
  );
};

export default About;
