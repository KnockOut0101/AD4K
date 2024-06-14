import { CHAMPION } from "../components/champion/champion.class";
import { PLAYER } from "../components/player/player.class";
import { DECK_BUILDER } from "./deck.builder";
import { STATE } from "./game.definitions";
import { CARD } from "../components/card/card.class";
import { COST, MODS, MOVES, TARGET, TYPE } from "../components/card/card.definitions"


export class GAME {
  public playersList: Array<PLAYER>;
  public deckSize: number = 0;
  public gameState: STATE = STATE.NONE;

  constructor(playerCount: number, deckSize: number) {
    this.playersList = [];
    this.deckSize = deckSize;

    for (let i = 0; i < playerCount; i++) {
      this.playersList.push(
        this.createPlayer('Player ' + (i + 1))
      );
    }
  }

  private createPlayer(name: string): PLAYER {
    const temp = new PLAYER();
    temp.name = name;
    temp.deck = DECK_BUILDER.buildDeck(this.deckSize);
    temp.champion = new CHAMPION();
    temp.hand = temp.deck.slice(0,5)
    temp.cardIndex = 5
    temp.champion.name = name + ' Champion';
    
    return temp;
  }

  private startGame() {
    
  }

  private executeRound() {
    if(this.gameState == STATE.EXECUTE){
        for(let i=0;i<2;i++){
          this.playersList[i].hand.push(this.playersList[i].deck[this.playersList[i].cardIndex])
        }
      }
    // TODO fill this out
  }

  private resetGame() {
    // TODO fill this out
  }

  private updatePlayerChoice(card:CARD,player:PLAYER) {

    if(player.state = STATE.WAIT)
      {
        if(card.type = TYPE.MOD)
        {
          // player.modSlot = player.deck.filter((deck: number) => deck == card.index)
        } 
      }

    // TODO fill this out
  }



  private plan() {
    // TODO fill this out
  }

  private whoWon() {
    // TODO fill this out
    if(this.playersList[0].champion.health == 0)
    {
      return this.playersList[1].name + 'WON'
    }
    if(this.playersList[1].champion.health == 0)
      {
        return this.playersList[0].name + 'WON'
      }

    return 'no one';
  }

  private declareWinner() {
    // TODO fill this out
  }

  private set state(newState: STATE) {
    this.gameState = newState;
  }

  get state() {
    return this.gameState;
  }

  get players() {
    return this.playersList;
  }

  public run() {
    switch(this.gameState) {
      case STATE.PLAN:
        // allow the players to make their plans
        this.plan();
        this.state = STATE.WAIT;
        break;
      case STATE.EXECUTE:
        // execute the card rules
        this.executeRound();
        this.state = STATE.RESULT;
        break;
      case STATE.NONE:
        // we assume the game needs to be started for now
        this.startGame();
        this.state = STATE.PLAN;
        break;
      case STATE.RESULT:
        let result = this.whoWon();
        if (result === 'no one') {
          this.state = STATE.PLAN;
        } else {
          this.declareWinner();
          this.state = STATE.EXIT;
        }
        break;
      case STATE.EXIT:
      default:
        break;
    }
  }
}