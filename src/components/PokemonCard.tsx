// src/components/PokemonCard.tsx

import React from "react";
import styled, { keyframes } from "styled-components";
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
  pokemon?: PokemonWithNames;
  language: "en" | "ko";
  isLoading?: boolean;
  onClick?: () => void;
}

const PokemonCard: React.FC<Props> = ({ pokemon, language, isLoading = false, onClick }) => {
  if (isLoading || !pokemon) {
    return (
      <Card style={{ backgroundColor: "#eee" }}>
        <ImgContainer>
          <SkeletonCircle />
        </ImgContainer>
        <Info>
          <SkeletonBar width="60%" />
          <SkeletonBar width="80%" />
          <SkeletonBar width="40%" />
        </Info>
      </Card>
    );
  }

  const name = pokemon.name[language];
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
          <p>{language === "ko" ? "타입" : "Type"}: {pokemon.types.map(t => t[language]).join(", ")}</p>
        </Type>
      </Info>
    </Card>
  );
};

export default PokemonCard;

// 스타일 컴포넌트

const Card = styled.div`
  width: 200px;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #eee;

  &:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
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

// 스켈레톤 애니메이션
const pulse = keyframes`
  0% {
    background-color: #ccc;
  }
  50% {
    background-color: #ddd;
  }
  100% {
    background-color: #ccc;
  }
`;

const SkeletonBar = styled.div<{ width?: string }>`
  height: 14px;
  background-color: #ccc;
  border-radius: 4px;
  margin: 8px auto;
  width: ${({ width }) => width || "100%"};
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

const SkeletonCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ccc;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;
