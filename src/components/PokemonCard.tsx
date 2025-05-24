// src/components/PokemonCard.tsx

import React from "react";
import styled from "styled-components";
import type { PokemonWithNames } from "../types/pokemon";

const typeColors: Record<string, string> = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
};

interface Props {
    pokemon: PokemonWithNames;
    language: "en" | "ko";
    onClick?: () => void;  // onClick prop 추가 (선택적)
}

const PokemonCard: React.FC<Props> = ({ pokemon, language, onClick }) => {
    const name = pokemon.name[language];
    const type = pokemon.types[0][language];
    const id = pokemon.id.toString().padStart(3, "0");
    const baseTypeEn = pokemon.types[0].en;
    const bgColor = typeColors[baseTypeEn] || "#eee";

    return (
        <Card style={{ backgroundColor: bgColor }} onClick={onClick}>
            <ImgContainer>
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt={name}
                />
            </ImgContainer>
            <Info>
                <Number>#{id}</Number>
                <Name>{name}</Name>
                <Type>
                    Type: <span>{type}</span>
                </Type>
            </Info>
        </Card>
    );
};

export default PokemonCard;

const Card = styled.div`
  width: 200px;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
   &:hover {
    transform: scale(1.05);
    transition: all .3s ease-in-out;
    cursor: pointer;
  }
`;

const ImgContainer = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  
`;

const Info = styled.div`
  margin-top: 10px;
`;

const Number = styled.span`
  font-weight: bold;
`;

const Name = styled.h3`
  margin: 5px 0;
`;

const Type = styled.small`
  span {
    font-weight: bold;
  }
`;
