import { useState, useEffect } from 'react';
import Pokemon from '../Pokemon/Pokemon';
import Answers from '../Answers/Answers';
import { usePokemon } from '../../context/pokemonContext';
import './game.css';
import Loader from '../UI/Loader/Loader';

const Easy = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const radnomPokemon = Math.floor(Math.random() * 99 + 1);
  const { coins } = usePokemon();

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${radnomPokemon}`)
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setPokemon(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [coins]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <>
        <div className='easy'>
          <Pokemon pokemon={pokemon} />
          <Answers pokemon={pokemon} />
        </div>
      </>
    );
  }
};
export default Easy;
