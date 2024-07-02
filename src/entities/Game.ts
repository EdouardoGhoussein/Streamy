import { Platform } from "./Platfrom";

export interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number;
  platforms: Platform[];
}
