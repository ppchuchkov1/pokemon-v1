import { useState, useEffect } from 'react';
import { usePokemon } from '../../context/pokemonContext';
import Modal from '../UI/Modal/Modal';
import './answers.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loader from '../UI/Loader/Loader';

const Answers = ({ pokemon }) => {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [randomPokemons, setRadnomPokemons] = useState([]);
  const radnomOffset = Math.floor(Math.random() * 100 + 1);
  const answers = [pokemon.species, ...randomPokemons].sort(
    () => Math.random() - 0.5
  );

  const [rightAnswer, setRightAnswer] = useState(false);
  const { coins } = usePokemon();
  const { setCoins } = usePokemon();
  const { lives } = usePokemon();
  const { setLives } = usePokemon();
  let location = useLocation();
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=3&offset=${radnomOffset}`)
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setRadnomPokemons(result.results);
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

  const nextLevel = () => {
    if (coins >= 100) {
      navigate('../hard', { replace: true });
      setCoins(0);
      setLives(4);
      setRightAnswer(false);
    }
  };
  console.log(pokemon.name);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <>
        {rightAnswer && (
          <Modal>
            <h1>
              You Are Right {coins}/
              {location.pathname == '/easy' ? '100' : '200'}
            </h1>
            <p
              style={{
                display:
                  coins >= 100 && location.pathname == '/easy'
                    ? 'none'
                    : 'block',
                cursor: 'pointer',
              }}
              onClick={() => setRightAnswer(false)}
            >
              Next pokemon
            </p>
            {location.pathname == '/hard' && coins >= 200 && (
              <h1>You are copleted the game!!</h1>
            )}
            {coins >= 100 && location.pathname == '/easy' && (
              <p onClick={nextLevel}>Next Level</p>
            )}
          </Modal>
        )}
        {lives <= 0 && (
          <Modal>
            <h1>Game over</h1>
          </Modal>
        )}
        {coins == 200 && (
          <Modal>
            <h1>You completed the game</h1>
          </Modal>
        )}
        <div className='answers'>
          <ul className='answers__list'>
            {answers.map(answer => (
              <li
                key={answer.name}
                className='answers__button'
                onClick={() => {
                  if (pokemon.species.name === answer.name) {
                    setCoins(coins + 10);
                    setRightAnswer(true);
                  } else {
                    setLives(lives - 1);
                  }
                }}
              >
                {answer.name}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
};

export default Answers;
