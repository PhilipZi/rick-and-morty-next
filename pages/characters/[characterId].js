import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import useFetch from "../../hooks/fetch";

const CharacterDetails = styled.main`
  margin: 1rem;
`;

const CharacterDetailsText = styled.div`
  padding: 1.5rem;
`;

const CharacterDetailsFrame = styled.div`
  max-width: 80rem;
  background-color: black;
  color: ${({ theme }) => theme.colors.fontColor};
  margin: 1rem auto;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export default function Character() {
  const { query } = useRouter();
  const { characterId } = query;

  const {
    data: characterInfo,
    loading,
    error,
  } = useFetch(
    characterId && `https://rickandmortyapi.com/api/character/${characterId}`
  );

  async function buttonHandler() {
    const { id, name, gender, type } = characterInfo;
    const res = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([id, name, gender, type]),
    });
    const message = await res.json();

    console.log(message);
  }

  return (
    <>
      {loading && <h2>Loading…</h2>}
      {error && <div>{error.message}</div>}
      {characterInfo && (
        <CharacterDetails>
          <CharacterDetailsFrame>
            <Image
              src={characterInfo.image}
              alt={`Picture of ${characterInfo.name}`}
              width="200"
              height="200"
            />
            <CharacterDetailsText>
              <h2>{characterInfo.name}</h2>
              <h3>
                First appeared in episode{" "}
                {characterInfo.episode[0].split("/").pop()}
              </h3>
              <h3>Gender: {characterInfo.gender}</h3>
              <h3>Species: {characterInfo.species}</h3>
              <h4>Origin: {characterInfo.origin.name}</h4>
              <p>{characterInfo.type}</p>
              <p>Last seen in {characterInfo.location.name}</p>
              <button onClick={buttonHandler}>Bookmark data</button>
            </CharacterDetailsText>
          </CharacterDetailsFrame>
        </CharacterDetails>
      )}
    </>
  );
}
