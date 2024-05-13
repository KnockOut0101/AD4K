import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit 
{
  title = 'CardGame';
  player_1: string = 'Player 1';
  player_2: string = 'Player 2';

  player_1_health: number ;
  player_2_health: number ;
  player_1_stamina: number ;
  player_2_stamina: number ;
  player_1_energy: number ;
  player_2_energy: number ;

  player_1_move_card_number:number;
  player_2_move_card_number:number;

  player_1_mod_card_number:number;
  player_2_mod_card_number:number;

  player_1_hand: any[] = [];
  player_2_hand: any[] = [];


  move_deck: any[] = [
    {name:'punch', stamina_cost:5, damage:10},
    {name:'kick', stamina_cost:10, damage:15},
    {name:'stun', stamina_cost:5, damage:0},
    {name:'block', stamina_cost:5, damage:0},
    {name:'dodge', stamina_cost:10, damage:0},
    {name:'grapple', stamina_cost:15, damage:0},
    {name:'counter', stamina_cost:15, damage:0},
  ];

  mod_deck: any[] = [
    {}
  ]

  ngOnInit(): void 
  {

  }

}
