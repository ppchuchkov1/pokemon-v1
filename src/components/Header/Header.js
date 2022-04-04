import React from 'react';
import logo from '../../images/logo-2.png';
import heart from '../../images/heart.png';
import coin from '../../images/coin.png';
import './header.css';
import { usePokemon } from '../../context/pokemonContext';
const Header = () => {
  const { lives } = usePokemon();
  const { coins } = usePokemon();

  return (
    <div className='navbar'>
      <img className='navbar__logo' src={logo} alt='' />

      <ul className='navbar__indicators'>
        <li className='navbar__indicator'>
          <span className='navbar__indicator-number'>{lives}</span>
          <img className='navbar__indicator-img' src={heart} alt='' />
        </li>
        <li className='navbar__indicator'>
          <span className='navbar__indicator-number'>{coins}</span>
          <img
            className='navbar__indicator-img'
            src={coin}
            width='50px'
            alt=''
          />
        </li>
      </ul>
    </div>
  );
};

export default Header;
