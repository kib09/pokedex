// src/App.tsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PokemonCard from "./components/PokemonCard";
import type { PokemonWithNames, NameEntry, PokemonType } from "./types/pokemon";
import Modal from "./components/Modal";
import PokedexLogo from "./assets/pokedexLogo.png"

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonWithNames[]>([]);
  const [language, setLanguage] = useState<"en" | "ko">("en");
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonWithNames | null>(null);
  const pokeCount = 20; // 

  useEffect(() => {
    const fetchPokemons = async () => {
      const results: PokemonWithNames[] = [];


      for (let i = 1; i <= pokeCount; i++) {
        const [pokemonData, speciesData] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json()),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`).then((res) => res.json()),
        ]);


        const name_ko = (speciesData.names as NameEntry[]).find((n) => n.language.name === "ko")?.name ?? pokemonData.name;

        const typesWithKorean = await Promise.all(
          (pokemonData.types as PokemonType[]).map(async (t) => {
            const typeData = await fetch(t.type.url).then((res) => res.json());
            const typeKo = (typeData.names as NameEntry[]).find((n) => n.language.name === "ko")?.name ?? t.type.name;
            return { en: t.type.name, ko: typeKo };
          })
        );

        results.push({
          id: pokemonData.id,
          name: {
            en: pokemonData.name,
            ko: name_ko,
          },
          types: typesWithKorean,
          weight: pokemonData.weight,
        });
      }

      setPokemons(results);
    };

    fetchPokemons();
  }, []);

  return (
    <Container>
      <Title><img src={PokedexLogo} alt="Pokedex Logo" width="250" /></Title>
      <LangButtons>
        <button onClick={() => setLanguage("en")}>English</button>
        <button onClick={() => setLanguage("ko")}>한국어</button>
      </LangButtons>
      <Grid>
        {pokemons.map((p) => (
          <PokemonCard key={p.id} pokemon={p} language={language} onClick={() => setSelectedPokemon(p)} />
        ))}
      </Grid>
      {selectedPokemon && (
        <Modal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} language={language} />
      )}
    </Container>
  );
};

export default App;

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const LangButtons = styled.div`
  margin-bottom: 2rem;
  button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;
