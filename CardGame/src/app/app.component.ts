import { Component, OnInit } from '@angular/core';
import { GAME } from './engine/game.class';
import { STATE } from './engine/game.definitions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'CardGame';
  public game: GAME;

  ngOnInit(): void {
    this.game = new GAME(2, 25);

    this.main();
  }

  public main() {
     
      this.game.run();
  }
}
