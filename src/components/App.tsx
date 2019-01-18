import React from 'react';

import Button from './Button';
import AudioComponent from './AudioComponent';

import timeout from '../helperFunctions/promisedTimeOut';

import { GameState } from '../enums/gameState';
import deepEqual from '../helperFunctions/deepEqual';

interface AppState {
  sequence: string[];
  activeButton: string;
  gameState: GameState
  playerSequence: string[];
  audioToPlay: string,
}

class App extends React.Component<{}, AppState> {

  state: AppState = {
    sequence: ['blue', 'red', 'green', 'yellow', 'yellow'],
    activeButton: '',
    gameState: GameState.Off,
    playerSequence: [],
    audioToPlay: '',
  }

  componentDidMount () {

  }

  handleButtonClick = async (color: string) => {
    this.playAudio(color);
    this.setState((prevState) => ({
      playerSequence: [...prevState.playerSequence, color]
    }), this.checkGameStatus);
  }

  checkGameStatus = async () => {
    if (this.state.playerSequence.length === this.state.sequence.length) {  // meaning the player has touched equal colors
      if (deepEqual(this.state.playerSequence, this.state.sequence)) {  // checking if the player has won
        // TODO: Add Color
        this.setState((prevState) => ({
          sequence: [...prevState.sequence, 'blue'],
          playerSequence: [],
        }))
        // Run the sequence again
        console.log('correct Sequence');
        // this.runSequence();
      } else {  // TODO: the player has lost
        console.log('incorrect sequence');
        this.setState(() => ({playerSequence: []}))
        // this.runSequence();
      }
    }
  }

  runSequence = async () => {
    await timeout(500);
    for (let i = 0; i < this.state.sequence.length; i++) {
      await timeout(1000);
      console.log('activating button');
      this.pushButton(this.state.sequence[i]);
      this.playAudio(this.state.sequence[i]);
      await timeout(1000);
      console.log('deactivating button');
      this.pause();
    }
  }

  pause = () => {
    this.setState(() => ({activeButton: ''}));
  }

  pushButton = (color) => {
    this.setState(() => ({activeButton: color}))
  }

  playAudio = (color) => {
    this.setState(() => ({audioToPlay: color}), () => {
      this.setState(() => ({audioToPlay: ''}));
    });
  }

  changeGameState = () => {
    if (this.state.gameState === GameState.Off) {
      this.setState(() => ({gameState: GameState.Play}));
      // this.startGame();
    } else {
      this.setState(() => ({gameState: GameState.Off}));
    }
  }

  startGame = async () => {
    this.runSequence();
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Button handleClick={this.handleButtonClick} color="green" activeButton={this.state.activeButton} gameState={this.state.gameState}/>
          <Button handleClick={this.handleButtonClick} color="red" activeButton={this.state.activeButton} gameState={this.state.gameState}/>
          <Button handleClick={this.handleButtonClick} color="blue" activeButton={this.state.activeButton} gameState={this.state.gameState}/>
          <Button handleClick={this.handleButtonClick} color="yellow" activeButton={this.state.activeButton} gameState={this.state.gameState}/>
          <div className="center">
            <button onClick={() => this.runSequence()}>Click Me!</button>
            <button onClick={this.changeGameState}>{this.state.gameState === 1 ? 'Off' : 'On'}</button>
          </div>
          <AudioComponent audioToPlay={this.state.audioToPlay}></AudioComponent>
        </div>        
      </div>
    );
  }
}

export default App;
