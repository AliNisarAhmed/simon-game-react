import React from 'react'

import { GameState } from '../enums/gameState';

interface ButtonProps {
  handleClick: any;
  color: string;
  activeButton: string,
  gameState: GameState;
}

const Button: React.SFC<ButtonProps> = ({ handleClick, color, activeButton, gameState}) => {


  return (
    <React.Fragment>
      <button
        disabled={(gameState === GameState.Off)}
        onClick={() => handleClick(color)}
        className={`btn btn--${color} ${activeButton === color ? 'active': ''}`}
        name={color}
      ></button>
    </React.Fragment>
  )
}

export default Button;
