import React from 'react'

import { Power } from '../enums/Power';
import { GameState } from '../enums/gameState';


interface ButtonProps {
  handleClick: any;
  color: string;
  activeButton: string,
  power: Power;
  gameState: GameState;
  flashAll: boolean;
}

class Button extends React.Component<ButtonProps> {

  onButtonClick = () => {
    this.props.handleClick(this.props.color);
  }

  render () {
    const { handleClick, color, activeButton, power, gameState, flashAll } = this.props;
    return (
      <React.Fragment>
        <button
          disabled={( power === "Off" || gameState !== "AwaitingUserInput" )}
          onClick={this.onButtonClick}
          className={`btn btn--${color} ${activeButton === color || flashAll ? 'active': ''}`}
          name={color}
        ></button>
      </React.Fragment>
    );
  }
}

export default Button;
