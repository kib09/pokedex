// src/types/pokemon.ts

export type NameEntry = {
  language: { name: string };
  name: string;
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonWithNames = {
  id: number;
  name: {
    en: string;
    ko: string;
  };
  types: {
    en: string;
    ko: string;
  }[];
 weight: number;
};