/**
*Класс игрока
*/

class Player extends Phaser.Sprite {

        jump: Phaser.Sound;
		/**
		*Конструктор
		*
		*@param game игра Фейзер
		*@param x кооринаты
		*@param y коориднаты
		*/
        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'runner', 0);

            this.anchor.setTo(0.5, 0);
			
			/**
			*Создание анимации бега
			*увеличение мастаба
			*отключение сглаживания спрайта(необходимо для сохранения стиля pixeart)
			*/
            this.animations.add('walk', [0, 1, 2, 3, 4, 5], 10, true);
            this.animations.sprite.smoothed = false;
            this.animations.sprite.scale.setTo(3, 3);

			/**
			*Прыжок
			*
			*установка звука прыжка
			*активация физики объекта + сила гравитации
			*/
			
            this.jump = this.game.add.audio('jump');

            game.add.existing(this);
            game.physics.enable(this);

            this.body.gravity.y = 1000;

			/**
			*Управление
			*
			*Вверх - прыжок
			*Вниз - ускоренный спуск
			*/
            var upKey = game.input.keyboard.addKey(
                Phaser.Keyboard.UP);
            upKey.onDown.add(this.dojump, this);

            var downKey = game.input.keyboard.addKey(
                Phaser.Keyboard.DOWN);
            downKey.onDown.add(this.forcefall, this);
        }

        update() {
			/**
			*При ходьбе:
			*проигрывать анимацию движения
			*утвердить отсутствие горизонательной скорости
			*/
            this.animations.play('walk');
            this.body.velocity.x = 0;

        }

        dojump() {
            if (this.body.touching.down) {
                this.body.velocity.y = -550;
                this.jump.play();
            }
            
        }

        forcefall() {
            this.body.velocity.y = 400;
        }

}

export {
	Player as default,
}