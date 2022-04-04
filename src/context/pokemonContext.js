import React, { createContext, useContext, useState } from 'react';
const PokemonContext = createContext();
export const PokemonProvider = ({ children }) => {
  const [lives, setLives] = useState(3);
  const [coins, setCoins] = useState(0);

  const value = { lives, coins, setLives, setCoins };
  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  return useContext(PokemonContext);
};
