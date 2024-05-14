import { CARD } from "../card/card.class";
import { CHAMPION } from "../champion/champion.class";

export class PLAYER {
  public name = 'Player 1';
  public energy = 100;
  public deck: Array<CARD> = [];
  public champion: CHAMPION; 
  public hand: Array<CARD> = [];
}