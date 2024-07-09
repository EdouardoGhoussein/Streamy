import { useEffect, useState } from "react";
import {
  FaWindows,
  FaLinux,
  FaApple,
  FaAndroid,
  FaPlaystation,
  FaXbox,
} from "react-icons/fa";
import { SiIos, SiNintendo } from "react-icons/si";

export interface Platform {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

export interface ParentPlatform {
  id: number;
  name: string;
}

const platformIcons = new Map<string, { icon: JSX.Element; alt: string }>([
  [
    "pc",
    { icon: <FaWindows className="platform-icon me-2" />, alt: "Windows" },
  ],
  ["linux", { icon: <FaLinux className="platform-icon me-2" />, alt: "Linux" }],
  ["mac", { icon: <FaApple className="platform-icon me-2" />, alt: "MacOS" }],
  [
    "android",
    { icon: <FaAndroid className="platform-icon me-2" />, alt: "Android" },
  ],
  ["ios", { icon: <SiIos className="platform-icon me-2" />, alt: "iOS" }],
  [
    "playstation",
    {
      icon: <FaPlaystation className="platform-icon me-2" />,
      alt: "PlayStation",
    },
  ],
  [
    "nintendo",
    { icon: <SiNintendo className="platform-icon me-2" />, alt: "Nintendo" },
  ],
  ["xbox", { icon: <FaXbox className="platform-icon me-2" />, alt: "Xbox" }],
]);

export const getPlatformIcon = (
  slug: string
): { icon: JSX.Element; alt: string } | null => {
  for (const [key, value] of platformIcons) {
    if (slug.startsWith(key)) {
      return value;
    }
  }
  return null;
};

export const useFetchPlatforms = () => {
  const [platformOptions, setplatformOptions] = useState<ParentPlatform[]>([]);
  const [loadingPlatform, setLoading] = useState(true);
  const [errorPlatform, setError] = useState<null | string>(null);

  const REACT_APP_RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/platforms/lists/parents?key=${REACT_APP_RAWG_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        // Map the response to extract id and name
        const platforms: ParentPlatform[] = result.results.map(
          (platform: ParentPlatform) => ({
            id: platform.id,
            name: platform.name,
          })
        );
        setplatformOptions(platforms);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [REACT_APP_RAWG_API_KEY]);

  return { platformOptions, loadingPlatform, errorPlatform };
};
