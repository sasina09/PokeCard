import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Pokemondex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0); 
  useEffect(() => {
    getCard();
  }, []);



  const getCard = async () => {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=10"
    );
    const pokemonList = response.data.results;

    const detailedPokemonList = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          img: response.data.sprites.front_default,
          id: pokemon.name,
        };
      })
    );

    const gameCards = [...detailedPokemonList, ...detailedPokemonList]
      .sort(() => Math.random() - Math.random())
      .map((card, index) => ({ ...card, key: index }));

    setPokemonList(gameCards);
  };

  const handleCardClick = (card) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(card.key)||
      matchedCards.includes(card.id)
    ) {
      return;
    }

    const newFlipped = [...flippedCards, card.key];
    setFlippedCards(newFlipped);
    setScore((prev) => prev + 1); 

    if (newFlipped.length === 2) {
      setTimeout(() => checkMatch(newFlipped), 1000);
    }
  };

  const checkMatch = ([firstKey, secondKey]) => {
    const firstCard = pokemonList.find((card) => card.key === firstKey);
    const secondCard = pokemonList.find((card) => card.key === secondKey);
    

    if (firstCard.id === secondCard.id) {
      setMatchedCards([...matchedCards, firstCard.id]);
 
    }

    setFlippedCards([]);
  };
 
  const resetGame = () => {
    setScore(0);
    setFlippedCards([]);
    setMatchedCards([]);
    getCard(); // โหลดการ์ดใหม่
  };
    

  return (
    <div className="container text-center mt-4">
      <h2>Pokemon Game</h2>
      <div className="mb-3">
        <h4>คะแนน: {score}</h4>
        <button className="btn btn-primary" onClick={resetGame}>
          รีเซ็ตเกม
        </button>
      </div>
      <div className="row justify-content-center">

        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.key}
            className={`col-2 m-2 p-3 card d-flex justify-content-center align-items-center ${matchedCards.includes(pokemon.id) && "invisible"}`}
            onClick={() => handleCardClick(pokemon)}
            style={{ cursor: "pointer", height: "150px" }}
            
          >
            {flippedCards.includes(pokemon.key)
           ? (
              <img src={pokemon.img} alt={pokemon.name} width={140} />
            ) : (
              <div className="bg-danger w-100 h-100"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokemondex;