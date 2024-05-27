import { CHAMPION } from "../components/champion/champion.class";
import { PLAYER } from "../components/player/player.class";
import { DECK_BUILDER } from "./deck.builder";
import { STATE } from "./game.definitions";

export class GAME {
  private playersList: Array<PLAYER>;
  private deckSize: number = 0;

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
    temp.champion.name = name + ' Champion';
    
    return temp;
  }

  private startGame() {
    // TODO fill this out
  }

  private executeRound() {
    // TODO fill this out
  }

  private resetGame() {
    // TODO fill this out
  }

  private updatePlayerChoice() {
    // TODO fill this out
  }

  private plan() {
    // TODO fill this out
  }

  private whoWon() {
    // TODO fill this out
    return 'noone';
  }

  private declareWinner() {
    // TODO fill this out
  }

  private set state(newState: STATE) {
    this.gameState = newState;
  }

  get players() {
    return this.playersList;
  }

  public run() {
    switch(this.gameState) {
      case STATE.PLAN:
        // allow the players to make their plans
        this.plan();
        this.state = STATE.EXECUTE;
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
        if (result === 'noone') {
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