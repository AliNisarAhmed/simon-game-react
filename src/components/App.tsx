import React from 'react';

import Button from './Button';
import AudioComponent from './AudioComponent';
import Center from './Center';

import timeout from '../helperFunctions/promisedTimeOut';

import { GameState } from '../enums/gameState';
import { Power } from '../enums/Power';
import deepEqual from '../helperFunctions/deepEqual';
import pickRandomColor from '../helperFunctions/pickRandomColor';

interface AppState {
  sequence: string[];
  activeButton: string;
  power: Power;
  gameState: GameState;
  playerSequence: string[];
  audioToPlay: string,
  count: number;
}

class App extends React.Component<{}, AppState> {

  state: AppState = {
    sequence: [],
    activeButton: '',
    power: Power.Off,
    gameState: GameState.Off,
    playerSequence: [],
    audioToPlay: '',
    count: 0,
  }

  componentDidMount () {

  }

  handleButtonClick = async (color: string) => {  // Handles user's click on a particular color
    this.playAudio(color);  // plays Audio associated with a particular color
    this.setState((prevState) => ({
      playerSequence: [...prevState.playerSequence, color]
    }), this.checkGameStatus);
  }

  checkGameStatus = async () => {  // check whether the user's sequence (playerSequence) matches with the main sequence.
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
    this.incrementCount();
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

  incrementCount = () => {
    this.setState((prevState) => ({ count: prevState.count + 1}))
  }

  // decrementCount = () => {
  //   this.setState((prevState) => ({ count: prevState.count - 1}))
  // }

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

  changePower = () => {
    if (this.state.power === Power.Off) {
      this.setState(() => ({power: Power.On}));
    } else {
      this.setState(() => ({power: Power.Off}));
    }
  }

  addColorToSequence = () => {
    this.setState((prevState) => ({sequence: [...prevState.sequence, pickRandomColor()]}));
  }

  startGame = async () => {
    this.addColorToSequence();
    this.runSequence();
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Button handleClick={this.handleButtonClick} color="green" activeButton={this.state.activeButton} power={this.state.power}/>
          <Button handleClick={this.handleButtonClick} color="red" activeButton={this.state.activeButton} power={this.state.power}/>
          <Button handleClick={this.handleButtonClick} color="blue" activeButton={this.state.activeButton} power={this.state.power}/>
          <Button handleClick={this.handleButtonClick} color="yellow" activeButton={this.state.activeButton} power={this.state.power}/>
          <Center 
            startGame={this.startGame} 
            changePower={this.changePower} 
            power={this.state.power} 
            count={this.state.count}
          />
          <AudioComponent audioToPlay={this.state.audioToPlay}></AudioComponent>
        </div>        
      </div>
    );
  }
}

export default App;
