import { CARD } from "../components/card/card.class";
import { CARD_OPTIONS } from "../resources/cards.resource";

export class DECK_BUILDER {
  public static buildDeck(size: number): Array<CARD> {
    // TODO generate a deck of cards
    // use CARD_OPTIONS for this task
    for (let i = CARD_OPTIONS.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [CARD_OPTIONS[i], CARD_OPTIONS[j]] = [CARD_OPTIONS[j], CARD_OPTIONS[i]]; // Swap elements
    }

    const Card_deck = CARD_OPTIONS.slice(0,size);

    console.log(Card_deck)

    return Card_deck
  }
}