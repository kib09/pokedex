import React, { useRef } from "react";
import styled from "styled-components";
import type { PokemonWithNames } from "../types/pokemon";

interface ModalProps {
  pokemon: PokemonWithNames;
  onClose: () => void;
  language: "en" | "ko";
}

const Modal: React.FC<ModalProps> = ({ pokemon, onClose, language }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = -1 / 5 * x + 20;
    const rotateX = 4 / 30 * y - 20;

    overlay.style.backgroundPosition = `${x / 5 + y / 5}%`;
    overlay.style.filter = `brightness(1.2) opacity(0.7)`;
    container.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseOut = () => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    overlay.style.filter = "opacity(0)";
    container.style.transform = "perspective(500px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <Overlay onClick={onClose}>
      <Container
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      >
        <HoloOverlay ref={overlayRef} />
        <CardContent>
          <h2>{pokemon.name[language]}</h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name[language]}
            width="120"
          />
          <p>{language === "ko" ? "타입" : "Type"}: {pokemon.types.map(t => t[language]).join(", ")}</p>
          <p>{language === "ko" ? "체중" : "Weight"}: {pokemon.id + 20}kg</p>
        </CardContent>

      </Container>
    </Overlay>
  );
};

export default Modal;
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Container = styled.div`
  width: 300px;
  height: 400px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.2s;
  transform-style: preserve-3d;
  background: gray; 
`;

const HoloOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 219, 112, 0.8) 45%,
    rgba(132, 50, 255, 0.6) 50%,
    transparent 52%
  );
  filter: brightness(1.1) opacity(0.7);
  mix-blend-mode: color-dodge;
  background-size: 150% 150%;
  background-position: 100%;
  transition: all 0.1s;
  pointer-events: none;
  z-index: 2;
`;

const CardContent = styled.div`
  z-index: 1;
  position: relative;
  color: black;
  text-align: center;
  padding: 1rem;
  height: 100%;
  box-sizing: border-box;

  img {
    margin: 1rem auto;
    display: block;
  }

  p {
    font-size: 0.9rem;
  }
`;

