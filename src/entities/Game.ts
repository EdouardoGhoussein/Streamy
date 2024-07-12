import { Platform } from "./Platfrom";

interface Plt {
  platform: Platform;
}

export interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number;
  platforms: Plt[];
}
