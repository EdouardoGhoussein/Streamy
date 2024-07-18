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
      <h1>About</h1>
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
        <button onClick={toggleDescription}>
          {showFullDescription ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default About;
