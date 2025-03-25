import { Component, OnInit } from '@angular/core';
import { configGame } from './constants';

export type Timeout = ReturnType<typeof setTimeout>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Mole Game';
  score = 0;
  loose = 0;
  gameField: number[] = [];

  gameTimerID!: Timeout;
  pauseTimerID!: Timeout;

  ngOnInit(): void {
    this.onStartNewGame();
  }

  onStartNewGame() {
    this.score = 0;
    this.loose = 0;
    this.gameField = new Array(configGame.FIELDS_COUNT).fill(0);
    this.startNewGameStep();
  }

  startNewGameStep() {
    this.gameField.fill(0);
    this.clearTimers();
    this.pauseTimerID = setTimeout(
      this.gameTurn.bind(this),
      this.getRandomInt(configGame.PAUSE[0], configGame.PAUSE[1])
    );
  }

  gameTurn() {
    this.showSymbol();
    this.startPause();
  }

  showSymbol() {
    const id = this.getRandomInt(0, configGame.FIELDS_COUNT);
    this.gameField[id] = 1;
  }

  startPause() {
    this.gameTimerID = setTimeout(
      this.startNewGameStep.bind(this),
      this.getRandomInt(
        configGame.TIMER_TO_SHOW[0],
        configGame.TIMER_TO_SHOW[1]
      )
    );
  }

  clearTimers() {
    clearTimeout(this.pauseTimerID);
    clearTimeout(this.gameTimerID);
  }

  onClick(event: MouseEvent) {
    const target = (event.target as Element).closest('.field');
    let id = +target!.id;

    if (this.gameField[id] == 1) {
      this.gameField[id] = 2;
      this.score++;
    } else {
      this.loose++;
    }
  }

  private getRandomInt(min: number, max: number): number { // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min) + min);
  }
}
