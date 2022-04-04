import { useState, useEffect, useRef } from 'react';
import './pokemonList.css';
import Loader from '../UI/Loader/Loader';
const PokemonList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonInputValue, setPokemonInputValue] = useState('1');
  const [pokemonValue, setPokemonValue] = useState('1');
  const getPokemonHandler = e => {
    e.preventDefault();
    setPokemonValue(pokemonInputValue);
  };

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonValue}`)
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setPokemonList(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [pokemonValue]);

  if (error) {
    return <div>11</div>;
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <>
        <div className='pokemon-list'>
          <form onSubmit={getPokemonHandler} className='pokemon-list__form'>
            <input
              onChange={e => setPokemonInputValue(e.target.value)}
              type='text'
              placeholder='Search pokemon'
            />
          </form>
          <div className='pokemon-list__info'>
            <div className='pokemon-list__stats'>
              <p>#{pokemonList.id}</p>
              <h3>{pokemonList.name}</h3>
              <div className='pokemon-list__stats-card'>
                <div>
                  <p>Height</p>
                  <p>{pokemonList.height}</p>
                  <p>Weight</p>
                  <p>{pokemonList.weight}</p>
                </div>
                <div style={{ paddingLeft: '20px' }}>
                  <p>Height</p>
                  <p>2'04</p>
                  <p>Height</p>
                  <p>2'04</p>
                </div>
              </div>
            </div>
            <img
              className='pokemon-list__image'
              src={
                pokemonList.sprites
                  ? pokemonList.sprites.other.home.front_default
                  : ''
              }
            />
          </div>
        </div>
      </>
    );
  }
};

export default PokemonList;
