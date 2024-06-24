import { Component, OnInit } from '@angular/core';
import { GAME } from './engine/game.class';
import { STATE } from './engine/game.definitions';
import { TYPE } from './components/card/card.definitions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'CardGame';
  public game: GAME;

  ngOnInit(): void {
    this.game = new GAME(2, 7);

    this.main();
  }

  get CARD_TYPE() {
    return TYPE;
  }

  public main() {
     
      this.game.run();
  }
}
