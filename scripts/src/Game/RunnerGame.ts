/**
* Название модуля
*
* @runnerGame
*/

/**
*Импорт модулей Игока и Террейна
*/

import Player from "./Player";
import Terrain from "./Terrain";


/**
*Класс игры
*/
class RunnerGame extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        death: Phaser.Sound;
        player: Player;
        tiles: Terrain;
        counterLabel: Phaser.Text;
        counter: number;
		counterHighest: number;
		
		/**
		*Инициализация
		*
		*Установить фон, игрока, добавить Террейн
		*Установить звуки
		*Установить счетчик counter
		*Включить физику для игрока и террейна
		*/
        create() {
            this.physics.startSystem(Phaser.Physics.ARCADE);

            this.background = this.add.sprite(0, 0, 'background');

            this.player = new Player(this.game, 180, 290);

            this.tiles = new Terrain(this.game);
            this.death = this.game.add.audio('error');
			
			if(typeof this.counterHighest === 'undefined') this.counterHighest = 0;
			
            this.counter = 0;
            this.counterLabel = this.game.add.text(50, 20, "0",
                { font: "40px Courier", family: "Arial", fill: "#ffffff" });   

            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
            this.game.physics.enable(this.tiles, Phaser.Physics.ARCADE);
        }

		/**
		*Обновление (каждый кадр)
		*
		*Смерть игрока в случаях:
		*касание нижнего края экрана
		*клавиша R
		*большоесмещение влево (столкновение с препятствием)
		*
		*Выход в меню по ESC
		*увеличение счетчика counter
		*вывод содержимого counter
		*
		*Установка столкновения между ироком и Террейном
		*установка движения при касании в collisionHandler
		*/
        update() {

            if (this.player.y > this.game.height
                || this.game.input.keyboard.isDown(Phaser.Keyboard.R)
                || this.player.body.x < 140) {
				if(this.counter > this.counterHighest) this.counterHighest = this.counter;
				this.death.play();
                this.game.state.restart(true, false);
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
				if(this.counter > this.counterHighest) this.counterHighest = this.counter;
                this.game.state.start('MainMenu', true, false, this.counterHighest);
            }

            this.counter += 10;
            this.counterLabel.text = this.counter.toString();

            this.game.physics.arcade.collide(this.tiles.result, this.player,
                                            this.collisionHandler);
        }

		/**
		*Движение при касании игрока и платформы
		*
		*@param platform платформа
		*@param player игрок
		*
		*не дает платформам уносить за собой игрока
		*/
        collisionHandler(platform : Terrain, player : Player) {
			platform.body.x -= player.body.x - player.body.prev.x;
        }

}

export {
	RunnerGame as default,
}