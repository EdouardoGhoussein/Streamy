// RefContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

// Define the shape of the context value
interface RefContextType {
  registerRef: (id: string, ref: React.RefObject<HTMLElement>) => void;
  getRef: (id: string) => React.RefObject<HTMLElement> | undefined;
}

// Create the context
const RefContext = createContext<RefContextType | undefined>(undefined);

// Create the provider component
export const RefProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [refs, setRefs] = useState<Map<string, React.RefObject<HTMLElement>>>(
    new Map()
  );

  const registerRef = useCallback(
    (id: string, ref: React.RefObject<HTMLElement>) => {
      setRefs((prevRefs) => {
        const updatedRefs = new Map(prevRefs);
        if (ref.current) {
          updatedRefs.set(id, ref);
        }
        return updatedRefs;
      });
    },
    []
  );

  const getRef = useCallback(
    (id: string) => {
      return refs.get(id);
    },
    [refs]
  );

  return (
    <RefContext.Provider value={{ registerRef, getRef }}>
      {children}
    </RefContext.Provider>
  );
};

// Custom hook to use the context
export const useScrollContext = () => {
  const context = useContext(RefContext);
  if (context === undefined) {
    throw new Error("useScrollContext must be used within a RefProvider");
  }
  return context;
};
