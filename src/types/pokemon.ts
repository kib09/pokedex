export interface PokemonWithNames {
  id: number;
  name: {
    en: string;
    ko: string;
  };
  types: {
    en: string;
    ko: string;
  }[];
}

export interface NameEntry {
  language: { name: string };
  name: string;
}

export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}