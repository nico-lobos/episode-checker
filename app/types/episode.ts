import { Character } from "@/types/character";

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: (Character | string)[];
  url: string;
  created: string;
}; 