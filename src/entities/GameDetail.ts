import { Platform } from "./Platfrom";
import { StoreID } from "./Store";

export interface GameDetail {
  id: number;
  name: string;
  description: string;
  background_image: string;
  released: string;
  parent_platforms: { platform: Platform }[];
  platforms: PlatformDetail[];
  playtime: number;
  metacritic: number;
  rating: number;
  ratings_count: number;
  ratings: Rating[];
  stores: StoreID[];
  genres: Genre[];
  developers: Developer[];
  publishers: Publisher[];
  esrb_rating: ESRBRating;
  tags: Tag[];
  website: string;
}

export interface PlatformDetail {
  platform: Platform;
  requirements: { minimum: string; recommended: string };
  released_at: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Developer {
  id: number;
  name: string;
}

export interface Publisher {
  id: number;
  name: string;
}

export interface ESRBRating {
  id: number;
  name: string;
}

export interface Genre {
  name: string;
}

export interface Rating {
  title: string;
  count: number;
  percent: number;
}
