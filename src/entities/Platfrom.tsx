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
