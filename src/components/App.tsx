import React from 'react';

import Button from './Button';

interface AppState {

}

class App extends React.Component<{}, AppState> {

  state: AppState = {

  }

  handleButtonClick = (e: any): void => {
    console.log(e.target.name);
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Button handleClick={this.handleButtonClick} color="green"/>
          <Button handleClick={this.handleButtonClick} color="red"/>
          <Button handleClick={this.handleButtonClick} color="blue"/>
          <Button handleClick={this.handleButtonClick} color="yellow"/>
          <div className="center"></div>
        </div>        
      </div>
    );
  }
}

export default App;
