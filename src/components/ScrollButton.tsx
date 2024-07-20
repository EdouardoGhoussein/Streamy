// ScrollButton.tsx
import React from "react";
import { useScrollContext } from "../hooks/useScroll";

interface ScrollButtonProps {
  targetId: string;
  label: string;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ targetId, label }) => {
  const { getRef } = useScrollContext();

  return (
    <div className="list-group-item sidebar-element p-1">
      <button
        className="btn btn-transparent p-1"
        onClick={() => {
          getRef(targetId)?.current?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <h3 className="text-start m-0">{label}</h3>
      </button>
    </div>
  );
};

export default ScrollButton;
