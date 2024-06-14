import { COST, MODS, MOVES, TARGET, TYPE } from "./card.definitions";

export class CARD {
  public index = 0
  public name = "";
  public typeOption: MOVES | MODS = MOVES.PUNCH;
  public costs: Record<Partial<COST>, number> = {[COST.HEALTH]:100,[COST.STAMINA]:100,[COST.ENERGY]:100};
  public damage: Record<Partial<COST>, number> = {[COST.HEALTH]:100,[COST.STAMINA]:100,[COST.ENERGY]:100};
  public effects: Record<string, () => void> = {}; // TODO on how this should work
  public costTarget = TARGET.SELF;
  public damageTarget = TARGET.OPPONENT;
  public type = TYPE.MOVE;
}
