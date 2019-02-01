import React from 'react';

import Button from './Button';
import AudioComponent from './AudioComponent';
import Center from './Center';

import timeout from '../helperFunctions/promisedTimeOut';

import { GameState } from '../sumTypes/gameState';
import { Power } from '../sumTypes/Power';
import { Strict } from '../sumTypes/strictMode';

import isSubsetArr from '../helperFunctions/isSubsetArr';
import pickRandomColor from '../helperFunctions/pickRandomColor';

import { Colors } from '../sumTypes/Colors';

interface AppState {
  sequence: Colors[];   // the main color sequence to be guessed by the player
  activeButton: string;  // the current button that is active and being played from the sequence.
  power: Power;       //'On' or 'Off'
  gameState: GameState;   // controls the state of the game after user has turned on the power
  playerSequence: Colors[];   // contains the colors clicked by the user
  audioToPlay: string,    // name of color, to be passed to audio component to play the appropriate audio
  count: number;   // number of colors in the sequence
  flashAll: boolean;   // if flashAll is true, all colors will flash at once.
  strict: Strict;  // boolean, strict mode on == true else false
  highestNormalScore: number;   // highest score by the player on non=strict mode
  highestStrictScore: number;   // highest score on strict mode.
}

const quickFlash = 100;
const winningFlash = 500;
const sequenceDelay = 800;
const mediumTimeout = 500;
const winningCondition = 20;
const sequenceReplay = 5000;

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
    strict: false,
    highestNormalScore: 0,
    highestStrictScore: 0,
  };

  componentDidMount () {
    let hns = localStorage.getItem('highestNormalScore');
    let hss = localStorage.getItem('highestStrictScore');
    if (hns) this.setState({highestNormalScore: Number(hns)});
    if (hss) this.setState({highestStrictScore: Number(hss)});
  }

  render() {
    return (
      <div className="App">
        <div className="score">
          <p>Your High Score - Normal mode: <span>{this.state.highestNormalScore}</span></p>
          <p>Your High score - Strict mode: <span>{this.state.highestStrictScore}</span></p>
        </div>
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
            toggleStrict={this.toggleStrict}
            strict={this.state.strict}
          />
          <AudioComponent audioToPlay={this.state.audioToPlay}></AudioComponent>
        </div>        
      </div>
    );
  }

  toggleStrict = () => {
    this.setState((prevState) => ({strict: !prevState.strict}));
  }

  handleButtonClick = async (color: Colors) => {  // Handles user's click on a particular color
    this.playAudio(color);  // plays Audio associated with a particular color
    this.setState((prevState) => ({
      playerSequence: [...prevState.playerSequence, color],
      gameState: "PlayerTurnUnderway"
    }), this.checkGameStatus);
  }

  updateLocalStorage = () => {
    if (this.state.strict) {
      localStorage.setItem('highestStrictScore', String(this.state.highestStrictScore));
      return;
    } else {
      localStorage.setItem('highestNormalScore', String(this.state.highestNormalScore));
    }
  }

  updateScore = () => {
    if (this.state.strict) {
      if (this.state.highestStrictScore < this.state.count) {
        this.setState(() => ({ highestStrictScore: this.state.count} ), this.updateLocalStorage)
      }
    } else {
      if (this.state.highestNormalScore < this.state.count) {
        this.setState(() => ({ highestNormalScore: this.state.count }), this.updateLocalStorage);
      }
    }
  }

  checkGameStatus = async () => {  // check whether the user's sequence (playerSequence) matches with the main sequence.
    if (!isSubsetArr(this.state.playerSequence, this.state.sequence)) {
      // The player has not guessed correctly
      if (this.state.strict) {
        // game is in strict mode
        await this.flash(quickFlash);
        await timeout(mediumTimeout);
        this.resetGame();
      } else {
        await this.flash(quickFlash);
        this.resetPlayerSequence();
        this.runSequence();
      }

    } else {  // the player has guessed correctly so far
      // player has guesseed correctly, we must now check if he has guessed the whole sequence
      if (this.state.playerSequence.length === this.state.sequence.length) {
        // the player has guessed the whole sequence correctly, we must add one color to the sequence and rest playerSequence.
        if (this.state.sequence.length === winningCondition) { // if the sequence length is 20, player has won the game
          this.updateScore();
          await this.flash(winningFlash, "Win");
          this.resetGame();
          return;
        }

        this.addColorToSequence();
        this.incrementCount();
        this.resetPlayerSequence();
        this.updateScore();
        this.runSequence();
      }
      // the player has guessed correctly, but he has not guessed the whole sequence yet, the game continues.
    }
  }

  resetPlayerSequence = () => {
    this.setState({ playerSequence: [] });
  }

  flash = async (delay: number, status: GameState = "PlayerIsWrong") => {
    this.setState({ flashAll: true, gameState: status});
    await timeout(delay);
    this.setState({flashAll : false});
    await timeout(delay);
    this.setState({flashAll: true});
    await timeout(delay);
    this.setState({flashAll: false});
    await timeout(delay);
    this.setState({flashAll: true});
    await timeout(delay);
    this.setState({flashAll: false});
  }

  runSequence = async () => {
    await timeout(mediumTimeout);
    this.setState({ gameState: "PlayingSequence"});    
    for (let i = 0; i < this.state.sequence.length; i++) {
      if (this.state.power !== "Off") {
        await timeout(sequenceDelay);
        this.pushButton(this.state.sequence[i]);
        this.playAudio(this.state.sequence[i]);
        await timeout(sequenceDelay);
        this.pause();
      } else {
        return;
      }
    }
    if (this.state.power !== "Off") {
      this.setState({ gameState: "AwaitingUserInput" });
      if (!this.state.strict) {  // game does not repeat sequence for strict mode
        await timeout(sequenceReplay);  
        // game checks if the user has not yet clickd any color && we are still awaiting input
        // if so, the game repeats the sequence, in normal mode only
        if (this.state.playerSequence.length === 0 && this.state.gameState === "AwaitingUserInput") {
          this.runSequence();
        }
      }
    }
  }

  incrementCount = () => {
    this.setState((prevState) => ({ count: prevState.count + 1}))
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

  changePower = () => {
    if (this.state.power === "Off") {
      this.setState(() => ({power: "On", gameState: "AwaitingGameStart" }));
    } else {
      this.turnOff();
    }
  }

  addColorToSequence = () => {
    this.setState((prevState) => ({sequence: [...prevState.sequence, pickRandomColor()]}));
  }

  startGame = async () => {
    await this.flash(quickFlash);
    this.addColorToSequence();
    this.incrementCount();    
    this.runSequence();
  }

  resetGame = () => {
    this.setState({
      sequence: [],
      activeButton: '',
      power: "On",
      gameState: "AwaitingGameStart", 
      playerSequence: [],
      audioToPlay: '',
      count: 0,
      flashAll: false,
      strict: false,
    });
  }

  turnOff = () => {
    this.setState({
      sequence: [],
      activeButton: '',
      power: "Off",
      gameState: "Off", 
      playerSequence: [],
      audioToPlay: '',
      count: 0,
      flashAll: false,
      strict: false,
    });
  }

}

export default App;
