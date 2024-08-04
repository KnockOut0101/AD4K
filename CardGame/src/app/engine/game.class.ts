import { CHAMPION } from '../components/champion/champion.class';
import { PLAYER } from '../components/player/player.class';
import { DECK_BUILDER } from './deck.builder';
import { STATE } from './game.definitions';
import { CARD } from '../components/card/card.class';
import {
  COST,
  MODS,
  MOVES,
  TARGET,
  TYPE,
} from '../components/card/card.definitions';
import { CARD_OPTIONS } from '../resources/cards.resource';

export class GAME {
  public playersList: Array<PLAYER>;
  public deckSize: number = 0;
  public gameState: STATE = STATE.NONE;
  public handSize: number = 5;
  public playercount : number = 2;
  public winner: boolean = false;
  public winning_statement: string = '';

  constructor(deckSize: number) {
    this.playersList = [];
    this.deckSize = deckSize;

    for (let i = 0; i < this.playercount; i++) {
      this.playersList.push(this.createPlayer('Player ' + (i + 1)));
    }
  }

  private createPlayer(name: string): PLAYER {
    const temp = new PLAYER();
    temp.name = name;
    temp.deck = DECK_BUILDER.buildDeck(this.deckSize);
    temp.champion = new CHAMPION();
    temp.champion.name = name + ' Champion';
    for (let i = 0; i < this.handSize; i++) {
      temp.hand.push(temp.deck.pop());
    }

    console.log('HAND', temp.hand);
    return temp;
  }

  private startGame() {
    //this.gameState=STATE.PLAN
  }

  private executeRound() {
    if (this.gameState != STATE.EXECUTE) {
      return;
    }

    for (let i = 0; i < 2; i++) {
      let currentplayer = this.playersList[i];
      
      if (i == 1) {
        let opponent = this.playersList[0]
        //STAMINA
        currentplayer.champion.stamina =
          currentplayer.champion.stamina -
          currentplayer.slots[0].costs[1];
        //HEALTH
        currentplayer.champion.health=
          currentplayer.champion.health +
          currentplayer.slots[0].damage[0]
        //HAND DEALING 
        for (let i = currentplayer.hand.length; i < this.handSize; i++) {
          currentplayer.hand.push(currentplayer.deck.pop());
        }
        //STATE CHANGE
        currentplayer.state = STATE.WAIT
        
          
      } else {
        let opponent = this.playersList[1]
        //STAMINA
        currentplayer.champion.stamina =
          currentplayer.champion.stamina -
          currentplayer.slots[0].costs[1];
        //HEALTH
        currentplayer.champion.health=
          currentplayer.champion.health +
          currentplayer.slots[0].damage[0]
        //HAND DEALING
        for (let i = currentplayer.hand.length; i < this.handSize; i++) {
          currentplayer.hand.push(currentplayer.deck.pop());
        }
        //STATE CHANGE
        currentplayer.state = STATE.WAIT
      }
    }

    // this should go in a draw phase/state
    for (let i = 0; i < 2; i++) {
      this.playersList[i].discard.push(this.playersList[i]?.slots[0]);
      //this.playersList[i].discard.push(this.playersList[i]?.slots[1]); // TBD
      this.playersList[i].slots = [null, null];
    }

    this.gameState = STATE.RESULT
    this.run() 
  }

  public resetGame() {
    console.log('resetGame');
    this.playersList = [];
    this.deckSize = this.deckSize;

    for (let i = 0; i < this.playercount; i++) {
      this.playersList.push(this.createPlayer('Player ' + (i + 1)));
    }
  }

  public updatePlayerChoice(card: CARD, handIndex: number, player: PLAYER) {
    console.log('updatePlayerChoice');

    if (player.state !== STATE.WAIT) {
      return;
    }

    if (player.slots[card.type] != null) {
      player.hand.push(player.slots[card.type]);
      player.slots[card.type] = null;
    }

    player.slots[card.type] = card;
    player.hand.splice(handIndex, 1);
  }

  public updatePlayerState(player: PLAYER) {
    console.log('updatePlayerState');
    player.state = STATE.READY;
    this.run();
  }

  private plan() {
    // TODO fill this out
    this.gameState = STATE.WAIT
    this.run()
  }

  private whoWon() {
    // TODO fill this out
    if (this.playersList[0].champion.health <= 0) {
      return this.playersList[1].name + 'WON';
    }
    if (this.playersList[1].champion.health <= 0) {
      return this.playersList[0].name + 'WON';
    }
    return 'no one';
  }

  private declareWinner(statement) {
    // TODO fill this out
    this.winner = true;
    this.winning_statement = statement
    this.playersList[1].state = STATE.READY;
    this.playersList[0].state = STATE.READY;
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
    switch (this.gameState) {
      case STATE.PLAN:
        // allow the players to make their plans
        this.plan();
        this.state = STATE.PLAN;
        break;
      case STATE.WAIT:
        console.log('CHECK CONTROL FLOW');
        if (
          this.playersList[0].state == STATE.READY &&
          this.playersList[1].state == STATE.READY
        ) {
          console.log('CHECK CONTROL FLOW 1');
          this.state = STATE.EXECUTE;
          this.run()
          // Need to discuss this furhter.
        } else {
          this.state = STATE.WAIT;
        }
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
          this.declareWinner(result);
          this.state = STATE.EXIT;
        }
        break;
      case STATE.EXIT:
      default:
        break;
    }
  }
}
