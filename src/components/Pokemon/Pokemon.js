import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePokemon } from '../../context/pokemonContext';
import './pokemon.css';
import Modal from '../UI/Modal/Modal';
import hintImage from '../../images/hint.png';
const Pokemon = ({ pokemon }) => {
  let location = useLocation();
  const [hint, setHint] = useState(false);
  const { lives, setLives } = usePokemon();

  const hintHandler = () => {
    setHint(true);
    // if (lives == 1) return;
    setLives(lives - 1);
  };
  return (
    <>
      {hint && (
        <Modal onClick={() => setHint(false)}>
          <h1>{pokemon.name}</h1>
        </Modal>
      )}

      <div className='pokemon'>
        <img
          className='pokemon__img'
          src={pokemon.sprites ? pokemon.sprites.front_default : '..'}
          alt=''
          style={{
            filter:
              location.pathname == '/easy'
                ? 'brightness(0)'
                : 'brightness(100)',
            transform: location.pathname == '/hard' ? 'rotate(150deg)' : 'none',
          }}
        />
      </div>
      <div className='pokemon__hint-text'>
        <h3>Need a hint?</h3>
        <img
          onClick={hintHandler}
          className='pokemon__hint-icon'
          src={hintImage}
        />
      </div>
    </>
  );
};

export default Pokemon;
