/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

/**
*Импорт модулей состоний игры (запуск, загрузка, меню, сама игра)
*/

import Boot from './Game/Boot';
import Preloader from "./Game/Preloader";
import MainMenu from "./Game/MainMenu";
import RunnerGame from "./Game/RunnerGame";

/**
*Класс игры. В нем определяются состояния и запускается загрузка
*/

class Game extends Phaser.Game {
	constructor() {
		super(800, 600, Phaser.AUTO, 'content', null);
		
		this.state.add('Boot', Boot, false);
		this.state.add('Preloader', Preloader, false);
		this.state.add('MainMenu', MainMenu, false);
		this.state.add('RunnerGame', RunnerGame, false);
		
		this.state.start('Boot');
	}
}

/**
*Пуск
*/

new Game();