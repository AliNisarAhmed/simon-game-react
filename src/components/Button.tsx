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
  audio: any
  componentDidMount() {
    this.audio;
  }

  render () {
    const { handleClick, color, activeButton, gameState } = this.props;
    const audioSource = audioSources[color];
    return (
      <React.Fragment>
        <button
          disabled={(gameState === GameState.Off)}
          onClick={() => (handleClick(color), this.audio.play())}
          className={`btn btn--${color} ${activeButton === color ? 'active': ''}`}
          name={color}
        ></button>
        <audio src={audioSource} ref={el => this.audio = el}></audio>
      </React.Fragment>
    );
  }
}

export default Button;
