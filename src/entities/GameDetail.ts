import { Platform } from "./Platfrom";

export interface GameDetail {
  id: number;
  name: string;
  description: string;
  background_image: string;
  released: string;
  parent_platforms: { platform: Platform }[];
  playtime: number;
  rating: number;
  ratings_count: number;
  ratings: Rating[];
}

export interface Rating {
  title: string;
  count: number;
  percent: number;
}
