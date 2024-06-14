import { CARD } from "../card/card.class";
import { CHAMPION } from "../champion/champion.class";
import { STATE } from "src/app/engine/game.definitions";

export class PLAYER {
  public name = 'Player 1';
  public energy = 100;
  public deck: Array<CARD> = [];
  public champion: CHAMPION; 
  public hand: Array<CARD> = [];
  public modSlot: number = 0;
  public moveSlot: number = 0;
  public cardIndex: number = 0;
  public state: STATE = STATE.WAIT;
}