// src/components/Modal.tsx

import React, { useEffect } from "react";
import styled from "styled-components";
import type { PokemonWithNames } from "../types/pokemon";

interface Props {
    pokemon: PokemonWithNames;
    onClose: () => void;
    language?: "en" | "ko";
}

const Modal: React.FC<Props> = ({ pokemon, onClose, language = "en" }) => {
    // ESC 키 눌렀을 때 모달 닫기
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const name = pokemon.name[language];
    const id = pokemon.id.toString().padStart(3, "0");
    const type = pokemon.types[0]?.[language] ?? "normal";
    const weight = pokemon.weight / 10;

    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <ImageContainer>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                        alt={name}
                    />
                </ImageContainer>
                <Info>
                    <h2>
                        #{id} {name}
                    </h2>
                    <p>Type: {type}</p>
                    <p>Weight: {weight}kg</p>
                    {/* 추가 정보도 여기에 넣어도 좋아요 */}
                </Info>
            </ModalContainer>
        </Overlay>
    );
};

export default Modal;

export const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  background: linear-gradient(145deg, #2e2e2e, #232323);
  border-radius: 20px;
  padding: 2rem;
  width: 320px;
  box-shadow:
    0 4px 8px rgba(0,0,0,0.6),
    inset 0 2px 5px rgba(255,255,255,0.1);
  color: #f0f0f0;
  font-family: 'Press Start 2P', cursive;  /* 게임 폰트 추천 */
  position: relative;
  text-align: center;
  user-select: none;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #ff5555;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(255, 0, 0, 0.7);
  transition: background 0.3s ease;

  &:hover {
    background: #ff2222;
  }
`;

export const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto 1rem auto;
  background: radial-gradient(circle at center, #444, #111);
  border-radius: 50%;
  box-shadow:
    0 0 10px 2px #ffcb05,
    inset 0 0 8px #fff8b8;
  
  img {
    width: 80%;
    height: 80%;
    object-fit: contain;
    margin-top: 12px;
  }
`;

export const Info = styled.div`
  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    letter-spacing: 1.5px;
   
  }
  p {
    margin: 0.2rem 0;
    font-weight: 700;
   
  
  }
`;