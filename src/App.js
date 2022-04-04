import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PokemonProvider } from './context/pokemonContext';
import Header from './components/Header/Header';
import Start from './components/Start/Start';
import Game from './components/Game/Game';
import PokemonList from './components/PokemonsList/PokemonList';
const App = () => {
  return (
    <>
      <PokemonProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/easy' element={<Game />} />
          <Route path='/hard' element={<Game />} />
          <Route path='/pokemons' element={<PokemonList />} />
        </Routes>
      </PokemonProvider>
    </>
  );
};

export default App;
