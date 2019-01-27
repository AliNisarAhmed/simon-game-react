import React from 'react';

import Button from './Button';
import AudioComponent from './AudioComponent';
import Center from './Center';

import timeout from '../helperFunctions/promisedTimeOut';

import { GameState } from '../enums/gameState';
import { Power } from '../enums/Power';
import isSubsetArr from '../helperFunctions/isSubsetArr';
import pickRandomColor from '../helperFunctions/pickRandomColor';

import { Colors } from '../enums/Colors';

interface AppState {
  sequence: Colors[];
  activeButton: string;
  power: Power;
  gameState: GameState;
  playerSequence: Colors[];
  audioToPlay: string,
  count: number;
  flashAll: boolean;
}

// const initialState = 

class App extends React.Component<{}, AppState> {

  state: AppState = {
    sequence: [],
    activeButton: '',
    power: "Off",
    gameState: "Off", 
    playerSequence: [],
    audioToPlay: '',
    count: 0,
    flashAll: false,
  };

  componentDidMount () {

  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Button handleClick={this.handleButtonClick} color="green" activeButton={this.state.activeButton} power={this.state.power} gameState={this.state.gameState} flashAll={this.state.flashAll}/>
          <Button handleClick={this.handleButtonClick} color="red" activeButton={this.state.activeButton} power={this.state.power} gameState={this.state.gameState} flashAll={this.state.flashAll}/>
          <Button handleClick={this.handleButtonClick} color="blue" activeButton={this.state.activeButton} power={this.state.power} gameState={this.state.gameState} flashAll={this.state.flashAll}/>
          <Button handleClick={this.handleButtonClick} color="yellow" activeButton={this.state.activeButton} power={this.state.power} gameState={this.state.gameState} flashAll={this.state.flashAll}/>
          <Center 
            startGame={this.startGame} 
            changePower={this.changePower} 
            power={this.state.power} 
            count={this.state.count}
            gameState={this.state.gameState}
          />
          <AudioComponent audioToPlay={this.state.audioToPlay}></AudioComponent>
        </div>        
      </div>
    );
  }

  handleButtonClick = async (color: Colors) => {  // Handles user's click on a particular color
    this.playAudio(color);  // plays Audio associated with a particular color
    this.setState((prevState) => ({
      playerSequence: [...prevState.playerSequence, color]
    }), this.checkGameStatus);
  }

  checkGameStatus = async () => {  // check whether the user's sequence (playerSequence) matches with the main sequence.
    if (!isSubsetArr(this.state.playerSequence, this.state.sequence)) {
      // The player has not guessed correctly
      this.flash();
      this.resetPlayerSequence();
      this.runSequence();
    } else {  // the player has guessed correctly so far
      // player has guesseed correctly, we must now check if he has guessed the whole sequence
      if (this.state.playerSequence.length === this.state.sequence.length) {
        // the player has guessed the whole sequence correctly, we must add one color to the sequence and rest playerSequence.
        this.addColorToSequence();
        this.resetPlayerSequence();
        this.incrementCount();
        this.runSequence();
      }
      // the player has guessed correctly, but he has not guessed the whole sequence yet, the game continues.
    }
  }

  resetPlayerSequence = () => {
    this.setState({ playerSequence: [] });
  }

  flash = async () => {
    this.setState({ flashAll: true});
    await timeout(100);
    this.setState({flashAll : false});
    await timeout(100);
    this.setState({flashAll: true});
    await timeout(100);
    this.setState({flashAll: false});
  }

  runSequence = async () => {
    this.setState({ gameState: "PlayingSequence"});    
    await timeout(500);
    for (let i = 0; i < this.state.sequence.length; i++) {
      if (this.state.power !== "Off" && this.state.gameState === "PlayingSequence" ) {
        await timeout(800);
        console.log('activating button');
        this.pushButton(this.state.sequence[i]);
        this.playAudio(this.state.sequence[i]);
        await timeout(800);
        console.log('deactivating button');
        this.pause();
      } else {
        break;
      }
    }
    this.setState({ gameState: "AwaitingUserInput" });
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
    if (this.state.power === "Off") {
      this.setState(() => ({power: "On", gameState: "AwaitingGameStart" }));
    } else {
      this.setState(() => ({power: "Off" }));
      this.resetGame();
    }
  }

  addColorToSequence = () => {
    this.setState((prevState) => ({sequence: [...prevState.sequence, pickRandomColor()]}));
  }

  startGame = async () => {
    this.flash();
    this.addColorToSequence();
    this.incrementCount();    
    this.runSequence();
  }

  resetGame = () => {
    this.setState({
      sequence: [],
      activeButton: '',
      power: "Off",
      gameState: "Off", 
      playerSequence: [],
      audioToPlay: '',
      count: 0,
      flashAll: false,
    });
  }

}

export default App;
