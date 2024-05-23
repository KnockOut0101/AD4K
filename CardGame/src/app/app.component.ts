import { Component, OnInit } from '@angular/core';
import { PLAYER } from './Components/player/player.class';
import { CHAMPION } from './Components/champion/champion.class';
import { CARD } from './Components/card/card.class';
import { DECK_BUILDER } from './engine/deck.builder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit 
{
  public title = 'CardGame';
  public players: Array<PLAYER> = [];

  private decksize = 25;

  ngOnInit(): void 
  {
    for (let i = 0; i < 2; i++) {
      this.players.push(
        this.createPlayer('Player ' + (i + 1))
      );
    }
  }

  private createPlayer(name: string): PLAYER 
  {
    const temp = new PLAYER();
    temp.name = name;
    temp.deck = DECK_BUILDER.buildDeck(this.decksize);
    temp.champion = new CHAMPION();
    temp.champion.name = name + ' Champion';
    
    return temp;
  }

  public startGame() 
  {
    // TODO fill this out
  }

  public executeRound() 
  {
    // TODO fill this out
  }

  public resetGame() 
  {
    // TODO fill this out
  }

  public updatePlayerChoice() 
  {
    // TODO fill this out
  }
}
