// RegisteringComponent.tsx
import React, { useEffect, useRef } from "react";
import { useScrollContext } from "../hooks/useScroll";

interface RegisteringComponentProps {
  id: string;
  children: React.ReactNode;
}

const RegisteringComponent: React.FC<RegisteringComponentProps> = ({
  id,
  children,
}) => {
  const { registerRef } = useScrollContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id && ref.current) {
      registerRef(id, ref);
    }
  }, [id, registerRef]);

  return (
    <div className="p-0 m-0" ref={ref}>
      {children}
    </div>
  );
};

export default RegisteringComponent;
