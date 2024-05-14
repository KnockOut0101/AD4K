import { COST, MODS, MOVES, TARGET, TYPE } from "./card.definitions";

export class CARD {
  public name: string;
  public typeOption: MOVES | MODS;
  public costs: Record<Partial<COST>, number>;
  public damage: Record<Partial<COST>, number>;
  public effects: Record<string, () => void>; // TODO on how this should work
  public costTarget = TARGET.SELF;
  public damageTarget = TARGET.OPPONENT;
  public type = TYPE.MOVE;
}
