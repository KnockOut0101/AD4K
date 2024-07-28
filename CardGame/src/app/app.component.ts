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
  public playerstate: any = STATE.READY;

  ngOnInit(): void {
    this.game = new GAME(20);

    this.main();
  }

  get CARD_TYPE() {
    return TYPE;
  }

  get PLAYER_STATE() {
    return STATE;
  }

  public main() {
     
      this.game.run();
  }
}
