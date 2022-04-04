import { useState } from 'react';
import './start.css';
import { Link } from 'react-router-dom';
import Modal from '../UI/Modal/Modal';
import { usePokemon } from '../../context/pokemonContext';
import heart from '../../images/heart.png';
import coinImage from '../../images/coin.png';
const Start = () => {
  const [howToPlay, setHowToPlay] = useState(false);
  const [settings, setSettings] = useState(false);
  const { lives, setLives, coins, setCoins } = usePokemon();
  return (
    <>
      {howToPlay && (
        <Modal onClick={() => setHowToPlay(false)}>
          <ol>
            <li className='howToPlay-options'>
              Try to guess who's that pokemon
            </li>
            <li className='howToPlay-options'>In every wrong answer -1 live</li>
            <li className='howToPlay-options'>
              In every right answer +10 coins
            </li>
            <li className='howToPlay-options'>Need 100/100 for Level 2</li>
            <li className='howToPlay-options'>
              Need 200/200 in Level 2 to finish the game
            </li>
          </ol>
          <p className=''>
            If you had a difficulty check the console for the right answer
          </p>
        </Modal>
      )}
      {settings && (
        <Modal onClick={() => setSettings(false)}>
          <div style={{ fontSize: '25px' }}>
            <p>Game Settings</p>
            <span>+</span>
            <img
              src={heart}
              width='40px'
              onClick={() => setLives(lives + 1)}
              style={{ paddingRight: '20px' }}
            />
            <span>+</span>
            <img
              src={coinImage}
              width='40px'
              onClick={() => setCoins(coins + 10)}
            />
          </div>
        </Modal>
      )}
      <div className='start'>
        <ul className='start__options'>
          <Link to='/easy'>
            <li className='start__option'>Start</li>
          </Link>
          <Link to='/pokemons'>
            <li className='start__option'>Pokemons</li>
          </Link>

          <li onClick={() => setHowToPlay(true)} className='start__option'>
            How to play
          </li>

          <li onClick={() => setSettings(true)} className='start__option'>
            Settings
          </li>
        </ul>
        <p className='start__copyright'>
          ©1995-2000.Nintendo/Creatures/GAME FREAK
          <br />
          Voice Compression Technology Licensed By Factor 5
        </p>
      </div>
    </>
  );
};

export default Start;
