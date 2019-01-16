import React from 'react';

import Button from './Button';

import timeout from '../helperFunctions/promisedTimeOut';

import { GameState } from '../enums/gameState';
import deepEqual from '../helperFunctions/deepEqual';

interface AppState {
  sequence: string[];
  activeButton: string;
  gameState: GameState
  playerSequence: string[];
}

class App extends React.Component<{}, AppState> {

  state: AppState = {
    sequence: ['blue', 'red', 'green', 'yellow'],
    activeButton: '',
    gameState: GameState.Off,
    playerSequence: []
  }

  componentDidMount () {

  }

  handleButtonClick = async (color: string) => {
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
        this.runSequence();
      } else {  // TODO: the player has lost
        console.log('incorrect sequence');
        this.setState(() => ({playerSequence: []}))
        this.runSequence();
      }
    }
  }

  runSequence = async () => {
    await timeout(500);
    this.state.sequence.forEach(async (color, i) => {
      // if (i === 0) {
      //   this.pushButton(color);
      // } else if (i === arr.length - 1 ) {
      //   // await timeout(i * 1000);
      //   // this.setState(() => ({activeButton: color}), async () => {
      //   //   await timeout(1000);
      //   //   this.setState(() => ({activeButton: ''}));
      //   // });
      //   this.pushButton(color, i);
      // } else {
      //   // await timeout(i * 1000);
      //   // this.setState(() => ({activeButton: color})); 
      //   this.pushButton(color, i);
      // }
      
      await this.pushButton(color, i);  
    });
  }

  activateButton = (color: string) : void => {
    this.setState(() => ({activeButton: color}));
  }

  pause = () => {
    this.setState(() => ({activeButton: ''}));
  }

  pushButton = async (color, i = 1) => {
    await timeout(i * 1000);
    this.setState(() => ({activeButton: color}), async () => {
      this.setState(() => ({ activeButton: ''}));
      await timeout(i * 1000)
    })
    // console.log('button pushed');
    // this.activateButton(color);
    // await timeout(i * 1000);
    // this.pause();
    // console.log('button disabled')
  }

  changeGameState = () => {
    if (this.state.gameState === GameState.Off) {
      this.setState(() => ({gameState: GameState.Play}));
      this.startGame();
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
        </div>        
      </div>
    );
  }
}

export default App;
