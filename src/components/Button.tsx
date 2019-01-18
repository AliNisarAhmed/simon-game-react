import React from 'react'

import { GameState } from '../enums/gameState';


const audioSources = {
  red: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
  green: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
  blue: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
  yellow: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
}

interface ButtonProps {
  handleClick: any;
  color: string;
  activeButton: string,
  gameState: GameState;
}

class Button extends React.Component<ButtonProps> {

  onButtonClick = () => {
    this.props.handleClick(this.props.color);
  }

  render () {
    const { handleClick, color, activeButton, gameState } = this.props;
    const audioSource = audioSources[color];
    return (
      <React.Fragment>
        <button
          disabled={(gameState === GameState.Off)}
          onClick={this.onButtonClick}
          className={`btn btn--${color} ${activeButton === color ? 'active': ''}`}
          name={color}
        ></button>
      </React.Fragment>
    );
  }
}

export default Button;
