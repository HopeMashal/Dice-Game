import React from 'react';
import './App.css';
import Player from './components/player';
import Audio from './components/audio';

class App extends React.Component {
  state={ 
          Fplayer:'Player 1',
          FplayerScore:0,
          FplayerCurrentScore:0,
          FplayerActive:'active',
          FplayerWinner:'',
          Splayer:'Player 2',
          SplayerScore:0,
          SplayerCurrentScore:0,
          SplayerActive:'',
          SplayerWinner:'',
          Fdicesrc:'./components/images/diceFaces/dice-1.png',
          FdiceDisplay:'none',
          Sdicesrc:'./components/images/diceFaces/dice-1.png',
          SdiceDisplay:'none',

          activePlayer:0,
          gamePlaying:true,

          winningScore:100
        }

    btnRoll=()=>{
      if(this.state.gamePlaying){
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        this.setState({FdiceDisplay:'block',SdiceDisplay:'block',Fdicesrc:`./components/images/diceFaces/dice-${dice1}.png`,Sdicesrc:`./components/images/diceFaces/dice-${dice2}.png`})
        if(dice1===6 && dice2===6){
          if(this.state.activePlayer===0){
            this.setState({FplayerCurrentScore:0})
          }
          else if(this.state.activePlayer===1){
            this.setState({SplayerCurrentScore:0})
          }
          this.nextPlayer();
        }
        else if(dice1 !==6 && dice2 !==6){
          if(this.state.activePlayer===0){
            this.setState({FplayerCurrentScore:this.state.FplayerCurrentScore+dice1+dice2})
          }
          else if(this.state.activePlayer===1){
            this.setState({SplayerCurrentScore:this.state.SplayerCurrentScore+dice1+dice2})
          }
        }
        else {
          this.nextPlayer();
        }
      }
    }
    btnHold=()=>{
      if(this.state.gamePlaying){
        if(this.state.activePlayer===0){
          this.setState({FplayerScore:this.state.FplayerScore+this.state.FplayerCurrentScore})
          if(this.state.FplayerScore+this.state.FplayerCurrentScore>=this.state.winningScore){
            this.setState({
              Fplayer:'Winner!!!',
              FdiceDisplay:'none',
              SdiceDisplay:'none',
              FplayerWinner:'winner',
              FplayerActive:'',
              gamePlaying:false
            })
          }
          else this.nextPlayer();
        }
        else if(this.state.activePlayer===1){
          this.setState({SplayerScore:this.state.SplayerScore+this.state.SplayerCurrentScore})
          if(this.state.SplayerScore+this.state.SplayerCurrentScore>=this.state.winningScore){
            this.setState({
              Splayer:'Winner!!!',
              FdiceDisplay:'none',
              SdiceDisplay:'none',
              SplayerWinner:'winner',
              SplayerActive:'',
              gamePlaying:false
            })
          }
          else this.nextPlayer();
        }
      }
    }
    btnNew=()=>{
      this.setState({
          Fplayer:'Player 1',
          FplayerScore:0,
          FplayerCurrentScore:0,
          FplayerActive:'active',
          FplayerWinner:'',
          Splayer:'Player 2',
          SplayerScore:0,
          SplayerCurrentScore:0,
          SplayerActive:'',
          SplayerWinner:'',
          FdiceDisplay:'none',
          SdiceDisplay:'none',
          activePlayer:0, 
          gamePlaying:true,
          winningScore:100
      })
    }
    nextPlayer=()=>{
      if(this.state.activePlayer===0){
        this.setState({activePlayer:1,FplayerActive:'',SplayerActive:'active'})
      }
      else if(this.state.activePlayer===1){
        this.setState({activePlayer:0,FplayerActive:'active',SplayerActive:''})
      }
      this.setState({
        FplayerCurrentScore:0,
        SplayerCurrentScore:0,
        FdiceDisplay:'none',
        SdiceDisplay:'none'
      })
    }

  render(){
    return (
      <div className="wrapper clearfix">
        <Player 
          player={this.state.Fplayer} 
          score={this.state.FplayerScore} 
          currentscore={this.state.FplayerCurrentScore}
          active={this.state.FplayerActive}
          winner={this.state.FplayerWinner}
        />
        <Player 
          player={this.state.Splayer}
          score={this.state.SplayerScore} 
          currentscore={this.state.SplayerCurrentScore}
          active={this.state.SplayerActive}
          winner={this.state.SplayerWinner}
        />
        <div className="btn-audio"><Audio/></div>
        <button className="btn-new" onClick={this.btnNew}><ion-icon name="add-circle-outline"></ion-icon>New game</button>
        <button className="btn-roll" onClick={this.btnRoll}><ion-icon name="sync-outline"></ion-icon>Roll dice</button>
        <button className="btn-hold" onClick={this.btnHold}><ion-icon name="download-outline"></ion-icon>Hold</button>
        <input type="text" id="winningScore" placeholder="Final score" value={this.state.winningScore} onChange={e=>{this.setState({winningScore:e.target.value})}}/>
        <img style={{display:this.state.FdiceDisplay}} src={require(`${this.state.Fdicesrc}`).default} alt="Dice1" className="dice" id="dice1"/>
        <img style={{display:this.state.SdiceDisplay}} src={require(`${this.state.Sdicesrc}`).default} alt="Dice2" className="dice" id="dice2"/> 
      </div>
    );
  }
}

export default App;
